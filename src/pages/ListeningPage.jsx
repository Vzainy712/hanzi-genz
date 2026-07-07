import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { grammarData } from '../data/grammarData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useToast, randomEncouragement } from '../context/ToastContext.jsx'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Gom tất cả câu ví dụ từ dữ liệu ngữ pháp làm ngân hàng câu nghe. */
function getSentencePool() {
  return grammarData.flatMap((g) => g.examples)
}

/** Tạo bộ câu hỏi nghe: nghe câu → chọn nghĩa đúng trong 4 phương án. */
function buildQuestions() {
  const pool = getSentencePool()
  return shuffle(pool)
    .slice(0, 8)
    .map((sentence) => {
      const wrongs = shuffle(pool.filter((s) => s.meaning !== sentence.meaning))
        .slice(0, 3)
        .map((s) => s.meaning)
      return { sentence, options: shuffle([sentence.meaning, ...wrongs]), correct: sentence.meaning }
    })
}

/** Trang luyện nghe câu: nghe audio rồi chọn nghĩa tiếng Việt đúng. */
export default function ListeningPage() {
  const { showToast } = useToast()
  const [questions] = useState(() => buildQuestions())
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const scorePercent = useMemo(
    () => (questions.length ? Math.round((correctCount / questions.length) * 100) : 0),
    [correctCount, questions.length],
  )

  if (!isSpeechSupported()) {
    return (
      <div className="card text-center text-slate-500">
        <p>Trình duyệt của bạn chưa hỗ trợ phát âm nên chưa luyện nghe được 😅</p>
        <Link to="/practice" className="btn-primary mt-4">← Về Luyện tập</Link>
      </div>
    )
  }

  const q = questions[current]

  function choose(option) {
    if (selected != null) return
    setSelected(option)
    const ok = option === q.correct
    if (ok) {
      setCorrectCount((c) => c + 1)
      showToast(`Nghe chuẩn! ${randomEncouragement()}`, { emoji: '👂' })
    } else {
      showToast('Chưa đúng, nghe lại lần nữa nhé!', { emoji: '💡', type: 'info' })
    }
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    const passed = scorePercent >= 60
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="card w-full max-w-md animate-pop-in">
          <div className="text-6xl">{passed ? '🎧' : '💪'}</div>
          <h1 className="mt-2 text-2xl font-black text-slate-800">
            {passed ? 'Đôi tai thính lắm!' : 'Luyện thêm chút nhé!'}
          </h1>
          <div className="mt-3 text-5xl font-black text-brand-600">{scorePercent}%</div>
          <p className="mt-1 text-slate-500">Đúng {correctCount}/{questions.length} câu</p>
          <div className="mt-5 flex flex-col gap-2">
            <button onClick={() => window.location.reload()} className="btn-primary">🔁 Nghe bộ mới</button>
            <Link to="/practice" className="btn-ghost">← Về Luyện tập</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Luyện tập
        </Link>
        <span className="text-sm font-bold text-brand-600">Câu {current + 1}/{questions.length}</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-genz transition-all duration-300"
          style={{ width: `${((current + (selected ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Khu vực nghe */}
      <div className="card flex flex-col items-center gap-3 text-center">
        <p className="text-sm font-bold text-slate-400">Nghe câu và chọn nghĩa đúng</p>
        <button
          onClick={() => speakChinese(q.sentence.hanzi)}
          className="grid h-24 w-24 place-items-center rounded-full bg-gradient-genz text-4xl text-white shadow-lg transition hover:scale-105 active:scale-95"
          aria-label="Nghe câu"
        >
          🔊
        </button>
        <button
          onClick={() => speakChinese(q.sentence.hanzi)}
          className="text-sm font-bold text-brand-500 hover:underline"
        >
          Nghe lại 🔁
        </button>

        {/* Chỉ hé lộ chữ + pinyin sau khi trả lời */}
        {selected != null && (
          <div className="animate-pop-in">
            <div className="font-hanzi text-2xl font-bold text-slate-800">{q.sentence.hanzi}</div>
            <div className="text-sm text-brand-600">{q.sentence.pinyin}</div>
          </div>
        )}
      </div>

      {/* Phương án */}
      <div className="grid gap-3">
        {q.options.map((opt) => {
          let cls = 'bg-white ring-1 ring-slate-100 hover:bg-slate-50'
          if (selected != null) {
            if (opt === q.correct) cls = 'bg-emerald-500 text-white ring-2 ring-emerald-500'
            else if (opt === selected) cls = 'bg-rose-500 text-white ring-2 ring-rose-500'
            else cls = 'bg-white text-slate-400 ring-1 ring-slate-100 opacity-60'
          }
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              disabled={selected != null}
              className={`rounded-2xl px-5 py-4 text-left font-bold transition ${cls}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {selected != null && (
        <button onClick={next} className="btn-primary self-end animate-pop-in">
          {current < questions.length - 1 ? 'Câu tiếp →' : 'Xem kết quả 🎉'}
        </button>
      )}
    </div>
  )
}
