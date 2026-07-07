import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { trendySentences } from '../data/trendySentences.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useToast, randomEncouragement } from '../context/ToastContext.jsx'
import Confetti from '../components/Confetti.jsx'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const ROUNDS = 6

/**
 * Trò chơi Xếp câu: nghe/đọc nghĩa tiếng Việt, chạm các mảnh từ
 * để ghép thành câu tiếng Trung đúng thứ tự.
 */
export default function SentenceGamePage() {
  const { showToast } = useToast()
  // Chỉ dùng câu có >= 3 mảnh cho có độ khó.
  const [rounds] = useState(() =>
    shuffle(trendySentences.filter((s) => s.chunks.length >= 3)).slice(0, ROUNDS),
  )
  const [roundIdx, setRoundIdx] = useState(0)
  const [picked, setPicked] = useState([]) // các chỉ số mảnh đã chọn (theo mảng shuffled)
  const [result, setResult] = useState(null) // null | 'correct' | 'wrong'
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const sentence = rounds[roundIdx]
  // Xáo mảnh một lần cho mỗi vòng.
  const shuffled = useMemo(
    () => (sentence ? shuffle(sentence.chunks.map((c, i) => ({ text: c, key: i }))) : []),
    [sentence],
  )

  if (!sentence) {
    return (
      <div className="card text-center text-slate-500">
        Chưa có câu nào để chơi 😅
        <Link to="/practice" className="btn-primary mt-4">← Về Luyện tập</Link>
      </div>
    )
  }

  const target = sentence.chunks.join('')
  const built = picked.map((k) => shuffled.find((c) => c.key === k)?.text || '').join('')

  function pick(key) {
    if (result || picked.includes(key)) return
    const nextPicked = [...picked, key]
    setPicked(nextPicked)
    // Đủ số mảnh -> chấm luôn.
    if (nextPicked.length === sentence.chunks.length) {
      const answer = nextPicked.map((k) => shuffled.find((c) => c.key === k)?.text || '').join('')
      if (answer === target) {
        setResult('correct')
        setScore((s) => s + 1)
        showToast(`Chuẩn luôn! ${randomEncouragement()}`, { emoji: '🧱' })
        if (isSpeechSupported()) speakChinese(sentence.hanzi)
      } else {
        setResult('wrong')
        showToast('Chưa đúng thứ tự, xem đáp án nhé!', { emoji: '💡', type: 'info' })
      }
    }
  }

  function unpick(key) {
    if (result) return
    setPicked((p) => p.filter((k) => k !== key))
  }

  function nextRound() {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx((i) => i + 1)
      setPicked([])
      setResult(null)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    const passed = score >= Math.ceil(rounds.length * 0.6)
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Confetti fire={passed} />
        <div className="card w-full max-w-md animate-pop-in">
          <div className="text-6xl">{score === rounds.length ? '🏆' : passed ? '🎉' : '💪'}</div>
          <h1 className="mt-2 text-2xl font-black text-slate-800">
            {score === rounds.length ? 'Thợ xếp câu chuyên nghiệp!' : passed ? 'Khéo tay phết!' : 'Chơi lại cho quen nhé!'}
          </h1>
          <div className="mt-3 text-5xl font-black text-brand-600">{score}/{rounds.length}</div>
          <div className="mt-5 flex flex-col gap-2">
            <button onClick={() => window.location.reload()} className="btn-primary">🔁 Chơi lại</button>
            <Link to="/trending" className="btn-ghost">🎤 Xem lại các câu</Link>
            <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
              ← Về Luyện tập
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Thoát
        </Link>
        <span className="text-sm font-bold text-brand-600">
          Câu {roundIdx + 1}/{rounds.length} · Đúng {score}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-genz transition-all duration-300"
          style={{ width: `${((roundIdx + (result ? 1 : 0)) / rounds.length) * 100}%` }}
        />
      </div>

      {/* Đề bài: nghĩa tiếng Việt */}
      <div className="card text-center">
        <p className="text-sm font-bold text-slate-400">🧱 Xếp các mảnh thành câu tiếng Trung:</p>
        <p className="mt-2 text-lg font-extrabold text-slate-800">“{sentence.vi}”</p>
        <p className="mt-1 text-xs text-slate-400">{sentence.pinyin}</p>
      </div>

      {/* Khu vực câu đang ghép */}
      <div
        className={`flex min-h-16 flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 transition ${
          result === 'correct'
            ? 'border-emerald-300 bg-emerald-50'
            : result === 'wrong'
              ? 'border-rose-300 bg-rose-50'
              : 'border-brand-200 bg-white'
        }`}
      >
        {picked.length === 0 && (
          <span className="text-sm text-slate-300">Chạm các mảnh bên dưới để ghép câu…</span>
        )}
        {picked.map((k) => (
          <button
            key={k}
            onClick={() => unpick(k)}
            className="font-hanzi rounded-xl bg-gradient-genz px-3 py-2 text-lg font-bold text-white shadow animate-pop-in"
            title="Bấm để bỏ ra"
          >
            {shuffled.find((c) => c.key === k)?.text}
          </button>
        ))}
      </div>

      {/* Các mảnh để chọn */}
      <div className="flex flex-wrap justify-center gap-2">
        {shuffled.map((c) => {
          const used = picked.includes(c.key)
          return (
            <button
              key={c.key}
              onClick={() => pick(c.key)}
              disabled={used || result != null}
              className={`font-hanzi rounded-xl px-4 py-2.5 text-lg font-bold transition ${
                used
                  ? 'bg-slate-100 text-slate-300'
                  : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:scale-105 hover:bg-brand-50 active:scale-95'
              }`}
            >
              {c.text}
            </button>
          )
        })}
      </div>

      {/* Kết quả vòng */}
      {result && (
        <div className="card animate-pop-in text-center">
          <div className="font-hanzi text-2xl font-bold text-slate-800">{sentence.hanzi}</div>
          <div className="text-sm font-semibold text-brand-600">{sentence.pinyin}</div>
          <div className="mt-1 text-xs italic text-slate-400">{sentence.note}</div>
          <div className="mt-3 flex justify-center gap-2">
            {isSpeechSupported() && (
              <button onClick={() => speakChinese(sentence.hanzi)} className="btn-ghost text-sm">
                🔊 Nghe lại
              </button>
            )}
            <button onClick={nextRound} className="btn-primary">
              {roundIdx < rounds.length - 1 ? 'Câu tiếp →' : 'Xem kết quả 🎉'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
