import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLessonById, getAllCharacters } from '../data/hskData.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import Confetti from '../components/Confetti.jsx'

/** Xáo trộn mảng (thuật toán Fisher–Yates). */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Tạo bộ câu hỏi: cho chữ Hán, chọn nghĩa đúng trong 4 phương án. */
function buildQuestions(lesson) {
  const pool = getAllCharacters()
  return shuffle(lesson.characters).map((char) => {
    const wrongs = shuffle(pool.filter((c) => c.hanzi !== char.hanzi))
      .slice(0, 3)
      .map((c) => c.meaning)
    const options = shuffle([char.meaning, ...wrongs])
    return { char, options, correct: char.meaning }
  })
}

/** Trang quiz trắc nghiệm cho một bài học. */
export default function QuizPage() {
  const { lessonId } = useParams()
  const lesson = getLessonById(lessonId)
  const { recordQuiz } = useProgress()

  const [questions] = useState(() => (lesson ? buildQuestions(lesson) : []))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [recorded, setRecorded] = useState(false)

  const scorePercent = useMemo(
    () => (questions.length ? Math.round((correctCount / questions.length) * 100) : 0),
    [correctCount, questions.length],
  )

  if (!lesson) {
    return (
      <div className="card text-center">
        <p className="text-slate-600">Không tìm thấy bài học 😅</p>
        <Link to="/lessons" className="btn-primary mt-4">← Về bài học</Link>
      </div>
    )
  }

  const q = questions[current]

  function choose(option) {
    if (selected != null) return // đã chọn rồi
    setSelected(option)
    if (option === q.correct) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
    } else {
      // Kết thúc: ghi điểm (thưởng 5 điểm mỗi câu đúng).
      if (!recorded) {
        recordQuiz(lesson.id, scorePercent, correctCount * 5)
        setRecorded(true)
      }
      setFinished(true)
    }
  }

  function restart() {
    window.location.reload() // đơn giản: tải lại để tạo bộ câu hỏi mới
  }

  // Màn hình kết quả
  if (finished) {
    const passed = scorePercent >= 60
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Confetti fire={passed} />
        <div className="card w-full max-w-md animate-pop-in">
          <div className="text-6xl">{scorePercent === 100 ? '🏆' : passed ? '🎉' : '💪'}</div>
          <h1 className="mt-2 text-2xl font-black text-slate-800">
            {scorePercent === 100
              ? 'Tuyệt đối! Cao thủ!'
              : passed
                ? 'Làm tốt lắm!'
                : 'Cố thêm chút nữa nhé!'}
          </h1>
          <div className="mt-3 text-5xl font-black text-brand-600">{scorePercent}%</div>
          <p className="mt-1 text-slate-500">
            Đúng {correctCount}/{questions.length} câu · +{correctCount * 5} điểm 💎
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <button onClick={restart} className="btn-primary">🔁 Làm lại</button>
            <Link to={`/lesson/${lesson.id}`} className="btn-ghost">📖 Ôn lại bài học</Link>
            <Link to="/lessons" className="text-sm font-bold text-slate-400 hover:text-brand-600">
              ← Về danh sách bài học
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Màn hình câu hỏi
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to={`/lesson/${lesson.id}`} className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Thoát
        </Link>
        <span className="text-sm font-bold text-brand-600">
          Câu {current + 1}/{questions.length}
        </span>
      </div>

      {/* Thanh tiến độ quiz */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-genz transition-all duration-300"
          style={{ width: `${((current + (selected ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="card flex flex-col items-center gap-3 text-center">
        <p className="text-sm font-bold text-slate-400">Chữ này nghĩa là gì?</p>
        <div className="font-hanzi text-7xl font-black text-brand-600">{q.char.hanzi}</div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-500">{q.char.pinyin}</span>
          {isSpeechSupported() && (
            <button
              onClick={() => speakChinese(q.char.hanzi)}
              className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-600 hover:scale-110 active:scale-95"
              aria-label="Nghe phát âm"
            >
              🔊
            </button>
          )}
        </div>
      </div>

      {/* Các phương án */}
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
