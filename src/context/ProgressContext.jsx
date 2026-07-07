import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { learnableCount } from '../data/fullVocab.js'
import { useToast, randomEncouragement } from './ToastContext.jsx'

/**
 * Context quản lý tiến độ học của người dùng.
 * Toàn bộ dữ liệu lưu ở localStorage (chưa cần backend cho bản MVP).
 */

const STORAGE_KEY = 'hanzi-genz-progress'
const POINTS_PER_CHARACTER = 10

/** Trả về ngày hôm nay dạng 'YYYY-MM-DD' theo giờ địa phương. */
function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Khoảng cách ngày giữa hai chuỗi 'YYYY-MM-DD'. */
function dayDiff(aKey, bKey) {
  const a = new Date(aKey + 'T00:00:00')
  const b = new Date(bKey + 'T00:00:00')
  return Math.round((b - a) / 86400000)
}

const defaultState = {
  points: 0,
  learnedIds: [], // danh sách chữ Hán đã đánh dấu "đã học"
  streak: 0,
  lastActiveDate: null,
  quizBest: {}, // { [lessonId]: điểm cao nhất }
}

/** Danh sách huy hiệu và điều kiện đạt được. */
export const BADGES = [
  { id: 'first-step', emoji: '🌱', name: 'Bước đầu tiên', desc: 'Học chữ Hán đầu tiên', check: (s) => s.learnedIds.length >= 1 },
  { id: 'ten-chars', emoji: '⭐', name: 'Chăm chỉ', desc: 'Học đủ 10 chữ', check: (s) => s.learnedIds.length >= 10 },
  { id: 'streak-3', emoji: '🔥', name: 'Nóng máy', desc: 'Chuỗi 3 ngày liên tiếp', check: (s) => s.streak >= 3 },
  { id: 'streak-7', emoji: '🚀', name: 'Bùng nổ', desc: 'Chuỗi 7 ngày liên tiếp', check: (s) => s.streak >= 7 },
  { id: 'points-200', emoji: '💎', name: 'Thợ săn điểm', desc: 'Đạt 200 điểm', check: (s) => s.points >= 200 },
  { id: 'quiz-master', emoji: '🏆', name: 'Cao thủ', desc: 'Đạt điểm tuyệt đối một bài quiz', check: (s) => Object.values(s.quizBest).some((v) => v === 100) },
]

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return { ...defaultState }
  }
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)
  const { showToast } = useToast()

  // Lưu lại mỗi khi state đổi.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  /** Cập nhật streak dựa trên ngày hoạt động gần nhất. */
  function touchStreak(prev) {
    const today = todayKey()
    if (prev.lastActiveDate === today) return prev // đã tính hôm nay
    let streak = 1
    if (prev.lastActiveDate) {
      const diff = dayDiff(prev.lastActiveDate, today)
      if (diff === 1) streak = prev.streak + 1 // liên tiếp
      else if (diff <= 0) streak = prev.streak || 1 // phòng lệch múi giờ
      else streak = 1 // đứt chuỗi
    }
    return { ...prev, streak, lastActiveDate: today }
  }

  /** Đánh dấu một chữ là đã học (cộng điểm nếu là lần đầu). */
  function markLearned(hanzi) {
    const isNew = !state.learnedIds.includes(hanzi)
    setState((prev) => {
      let next = touchStreak(prev)
      if (next.learnedIds.includes(hanzi)) return next
      return {
        ...next,
        learnedIds: [...next.learnedIds, hanzi],
        points: next.points + POINTS_PER_CHARACTER,
      }
    })
    // Phản hồi động viên khi học chữ mới.
    if (isNew) {
      showToast(`+${POINTS_PER_CHARACTER} điểm! ${randomEncouragement()}`, { emoji: '💎' })
    }
  }

  /** Bỏ đánh dấu đã học (trừ lại điểm). */
  function unmarkLearned(hanzi) {
    setState((prev) => {
      if (!prev.learnedIds.includes(hanzi)) return prev
      return {
        ...prev,
        learnedIds: prev.learnedIds.filter((h) => h !== hanzi),
        points: Math.max(0, prev.points - POINTS_PER_CHARACTER),
      }
    })
  }

  /** Ghi kết quả quiz (điểm 0-100) cho một bài học, cộng điểm thưởng. */
  function recordQuiz(lessonId, scorePercent, bonusPoints) {
    setState((prev) => {
      const next = touchStreak(prev)
      const best = Math.max(next.quizBest[lessonId] || 0, scorePercent)
      return {
        ...next,
        quizBest: { ...next.quizBest, [lessonId]: best },
        points: next.points + (bonusPoints || 0),
      }
    })
  }

  function resetProgress() {
    setState({ ...defaultState })
  }

  const earnedBadges = useMemo(() => BADGES.filter((b) => b.check(state)), [state])

  // Phát hiện huy hiệu vừa mở khoá để chúc mừng (bỏ qua lần tải đầu tiên).
  const prevBadgeIds = useRef(null)
  useEffect(() => {
    const currentIds = earnedBadges.map((b) => b.id)
    if (prevBadgeIds.current === null) {
      prevBadgeIds.current = currentIds // lần đầu: chỉ ghi nhớ, không báo
      return
    }
    const fresh = earnedBadges.filter((b) => !prevBadgeIds.current.includes(b.id))
    fresh.forEach((b) => {
      showToast(`Mở khoá huy hiệu: ${b.name}!`, { emoji: b.emoji, type: 'badge', duration: 3500 })
    })
    prevBadgeIds.current = currentIds
  }, [earnedBadges, showToast])

  const value = useMemo(
    () => ({
      ...state,
      totalCharacters: learnableCount,
      earnedBadges,
      isLearned: (hanzi) => state.learnedIds.includes(hanzi),
      markLearned,
      unmarkLearned,
      recordQuiz,
      resetProgress,
    }),
    [state, earnedBadges],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

/** Hook truy cập tiến độ học. */
export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress phải được dùng bên trong <ProgressProvider>')
  return ctx
}
