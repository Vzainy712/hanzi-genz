import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { learnableCount } from '../data/fullVocab.js'
import { useToast, randomEncouragement } from './ToastContext.jsx'

/**
 * Context quản lý tiến độ học: điểm, streak, huy hiệu,
 * SRS (ôn tập ngắt quãng) và nhiệm vụ hằng ngày.
 * Toàn bộ lưu ở localStorage.
 */

const STORAGE_KEY = 'hanzi-genz-progress'
const POINTS_PER_CHARACTER = 10

/** Khoảng cách ôn (ngày) theo "hộp" SRS 1-6: học lại càng nhớ, hộp càng cao, càng lâu phải ôn. */
const SRS_INTERVALS = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 15, 6: 30 }

/** Định nghĩa nhiệm vụ hằng ngày. */
export const DAILY_QUESTS = [
  { id: 'new', emoji: '📖', label: 'Học 3 từ mới', target: 3, field: 'newWords', reward: 20 },
  { id: 'review', emoji: '🧠', label: 'Ôn 5 từ (SRS)', target: 5, field: 'reviews', reward: 15 },
  { id: 'quiz', emoji: '🎯', label: 'Thắng 1 quiz (≥60%)', target: 1, field: 'quizWins', reward: 15 },
]

function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Ngày hôm nay + n ngày, dạng YYYY-MM-DD. */
function addDays(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return todayKey(d)
}

function dayDiff(aKey, bKey) {
  const a = new Date(aKey + 'T00:00:00')
  const b = new Date(bKey + 'T00:00:00')
  return Math.round((b - a) / 86400000)
}

const defaultState = {
  points: 0,
  learnedIds: [],
  streak: 0,
  lastActiveDate: null,
  quizBest: {},
  srs: {}, // { [hanzi]: { b: hộp 1-6, d: ngày đến hạn ôn } }
  totalReviews: 0,
  quests: { date: null, newWords: 0, reviews: 0, quizWins: 0, claimed: [] },
}

export const BADGES = [
  { id: 'first-step', emoji: '🌱', name: 'Bước đầu tiên', desc: 'Học chữ Hán đầu tiên', check: (s) => s.learnedIds.length >= 1 },
  { id: 'ten-chars', emoji: '⭐', name: 'Chăm chỉ', desc: 'Học đủ 10 chữ', check: (s) => s.learnedIds.length >= 10 },
  { id: 'fifty-chars', emoji: '📚', name: 'Mọt chữ Hán', desc: 'Học đủ 50 từ', check: (s) => s.learnedIds.length >= 50 },
  { id: 'streak-3', emoji: '🔥', name: 'Nóng máy', desc: 'Chuỗi 3 ngày liên tiếp', check: (s) => s.streak >= 3 },
  { id: 'streak-7', emoji: '🚀', name: 'Bùng nổ', desc: 'Chuỗi 7 ngày liên tiếp', check: (s) => s.streak >= 7 },
  { id: 'points-200', emoji: '💎', name: 'Thợ săn điểm', desc: 'Đạt 200 điểm', check: (s) => s.points >= 200 },
  { id: 'quiz-master', emoji: '🏆', name: 'Cao thủ', desc: 'Đạt điểm tuyệt đối một bài quiz', check: (s) => Object.values(s.quizBest).some((v) => v === 100) },
  { id: 'review-50', emoji: '🧠', name: 'Bộ nhớ thép', desc: 'Ôn tập 50 lượt SRS', check: (s) => (s.totalReviews || 0) >= 50 },
  { id: 'boss-slayer', emoji: '⚔️', name: 'Diệt Boss', desc: 'Hạ gục một Boss chương', check: (s) => Object.keys(s.quizBest).some((k) => k.startsWith('boss-') && s.quizBest[k] >= 100) },
]

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    const parsed = JSON.parse(raw)
    return { ...defaultState, ...parsed, quests: { ...defaultState.quests, ...(parsed.quests || {}) } }
  } catch {
    return { ...defaultState }
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)
  const { showToast } = useToast()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  /** Cập nhật streak theo ngày hoạt động. */
  function touchStreak(prev) {
    const today = todayKey()
    if (prev.lastActiveDate === today) return prev
    let streak = 1
    if (prev.lastActiveDate) {
      const diff = dayDiff(prev.lastActiveDate, today)
      if (diff === 1) streak = prev.streak + 1
      else if (diff <= 0) streak = prev.streak || 1
      else streak = 1
    }
    return { ...prev, streak, lastActiveDate: today }
  }

  /** Sang ngày mới thì reset bộ đếm nhiệm vụ. */
  function ensureQuests(prev) {
    const today = todayKey()
    if (prev.quests.date === today) return prev
    return { ...prev, quests: { date: today, newWords: 0, reviews: 0, quizWins: 0, claimed: [] } }
  }

  /** Đánh dấu đã học: cộng điểm, đưa vào SRS, tính nhiệm vụ. */
  function markLearned(hanzi) {
    const isNew = !state.learnedIds.includes(hanzi)
    setState((prev) => {
      let next = ensureQuests(touchStreak(prev))
      if (next.learnedIds.includes(hanzi)) return next
      return {
        ...next,
        learnedIds: [...next.learnedIds, hanzi],
        points: next.points + POINTS_PER_CHARACTER,
        srs: { ...next.srs, [hanzi]: { b: 1, d: addDays(1) } },
        quests: { ...next.quests, newWords: next.quests.newWords + 1 },
      }
    })
    if (isNew) showToast(`+${POINTS_PER_CHARACTER} điểm! ${randomEncouragement()}`, { emoji: '💎' })
  }

  function unmarkLearned(hanzi) {
    setState((prev) => {
      if (!prev.learnedIds.includes(hanzi)) return prev
      const srs = { ...prev.srs }
      delete srs[hanzi]
      return {
        ...prev,
        learnedIds: prev.learnedIds.filter((h) => h !== hanzi),
        points: Math.max(0, prev.points - POINTS_PER_CHARACTER),
        srs,
      }
    })
  }

  /** Ghi một lượt ôn SRS: nhớ -> lên hộp (ôn thưa dần), quên -> về hộp 1 (ôn lại mai). */
  function reviewWord(hanzi, remembered) {
    setState((prev) => {
      const next = ensureQuests(touchStreak(prev))
      const cur = next.srs[hanzi] || { b: 1 }
      const box = remembered ? Math.min(cur.b + 1, 6) : 1
      return {
        ...next,
        srs: { ...next.srs, [hanzi]: { b: box, d: addDays(SRS_INTERVALS[box]) } },
        totalReviews: (next.totalReviews || 0) + 1,
        points: next.points + (remembered ? 3 : 1),
        quests: { ...next.quests, reviews: next.quests.reviews + 1 },
      }
    })
  }

  /** Ghi kết quả quiz (điểm 0-100), thưởng điểm, tính nhiệm vụ. */
  function recordQuiz(lessonId, scorePercent, bonusPoints) {
    setState((prev) => {
      const next = ensureQuests(touchStreak(prev))
      const best = Math.max(next.quizBest[lessonId] || 0, scorePercent)
      return {
        ...next,
        quizBest: { ...next.quizBest, [lessonId]: best },
        points: next.points + (bonusPoints || 0),
        quests: { ...next.quests, quizWins: next.quests.quizWins + (scorePercent >= 60 ? 1 : 0) },
      }
    })
  }

  /** Nhận thưởng một nhiệm vụ đã hoàn thành. */
  function claimQuest(questId) {
    const quest = DAILY_QUESTS.find((q) => q.id === questId)
    if (!quest) return
    setState((prev) => {
      const next = ensureQuests(prev)
      if (next.quests.claimed.includes(questId)) return next
      if (next.quests[quest.field] < quest.target) return next
      return {
        ...next,
        points: next.points + quest.reward,
        quests: { ...next.quests, claimed: [...next.quests.claimed, questId] },
      }
    })
    showToast(`Nhiệm vụ hoàn thành! +${quest.reward} điểm 💎`, { emoji: quest.emoji, type: 'badge' })
  }

  function resetProgress() {
    setState({ ...defaultState })
  }

  const earnedBadges = useMemo(() => BADGES.filter((b) => b.check(state)), [state])

  // Chúc mừng huy hiệu mới (bỏ qua lần tải đầu).
  const prevBadgeIds = useRef(null)
  useEffect(() => {
    const currentIds = earnedBadges.map((b) => b.id)
    if (prevBadgeIds.current === null) {
      prevBadgeIds.current = currentIds
      return
    }
    earnedBadges
      .filter((b) => !prevBadgeIds.current.includes(b.id))
      .forEach((b) => showToast(`Mở khoá huy hiệu: ${b.name}!`, { emoji: b.emoji, type: 'badge', duration: 3500 }))
    prevBadgeIds.current = currentIds
  }, [earnedBadges, showToast])

  /** Danh sách từ đến hạn ôn hôm nay (từ đã học chưa có lịch cũng tính là đến hạn). */
  const dueWords = useMemo(() => {
    const today = todayKey()
    return state.learnedIds.filter((h) => {
      const entry = state.srs[h]
      return !entry || entry.d <= today
    })
  }, [state.learnedIds, state.srs])

  /** Bộ đếm nhiệm vụ hôm nay (nếu là ngày mới thì coi như 0 hết). */
  const questsToday = useMemo(() => {
    return state.quests.date === todayKey()
      ? state.quests
      : { date: todayKey(), newWords: 0, reviews: 0, quizWins: 0, claimed: [] }
  }, [state.quests])

  const value = useMemo(
    () => ({
      ...state,
      totalCharacters: learnableCount,
      earnedBadges,
      dueWords,
      questsToday,
      isLearned: (hanzi) => state.learnedIds.includes(hanzi),
      markLearned,
      unmarkLearned,
      reviewWord,
      recordQuiz,
      claimQuest,
      resetProgress,
    }),
    [state, earnedBadges, dueWords, questsToday],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

/** Hook truy cập tiến độ học. */
export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress phải được dùng bên trong <ProgressProvider>')
  return ctx
}
