import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLessonById } from '../data/hskData.js'
import CharacterCard from '../components/CharacterCard.jsx'
import { useProgress } from '../context/ProgressContext.jsx'

/** Trang chi tiết một bài học - lướt qua từng chữ Hán. */
export default function LessonDetailPage() {
  const { lessonId } = useParams()
  const lesson = getLessonById(lessonId)
  const [index, setIndex] = useState(0)
  const { learnedIds } = useProgress()

  if (!lesson) {
    return (
      <div className="card text-center">
        <p className="text-slate-600">Không tìm thấy bài học này 😅</p>
        <Link to="/lessons" className="btn-primary mt-4">
          ← Về danh sách bài học
        </Link>
      </div>
    )
  }

  const chars = lesson.characters
  const current = chars[index]
  const doneCount = chars.filter((c) => learnedIds.includes(c.hanzi)).length

  return (
    <div className="flex flex-col gap-5">
      {/* Đầu trang */}
      <div className="flex items-center justify-between gap-3">
        <Link to="/lessons" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Bài học
        </Link>
        <Link to={`/quiz/${lesson.id}`} className="btn-ghost text-sm">
          🎯 Làm Quiz
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-2 text-sm font-bold text-brand-600">
          <span>{lesson.levelLabel}</span>·<span>{doneCount}/{chars.length} đã học</span>
        </div>
        <h1 className="text-2xl font-black text-slate-800">
          {lesson.emoji} {lesson.title}
        </h1>
        <p className="text-slate-500">{lesson.description}</p>
      </div>

      {/* Thanh chấm tiến độ trong bài */}
      <div className="flex flex-wrap gap-2">
        {chars.map((c, i) => {
          const learned = learnedIds.includes(c.hanzi)
          const active = i === index
          return (
            <button
              key={c.hanzi}
              onClick={() => setIndex(i)}
              className={`font-hanzi grid h-10 w-10 place-items-center rounded-xl text-lg font-bold transition ${
                active
                  ? 'scale-110 bg-gradient-genz text-white shadow-lg'
                  : learned
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white text-slate-600 ring-1 ring-slate-100 hover:bg-slate-50'
              }`}
              title={c.pinyin}
            >
              {c.hanzi}
            </button>
          )
        })}
      </div>

      {/* Thẻ chữ hiện tại */}
      <CharacterCard key={current.hanzi} char={current} />

      {/* Điều hướng trước/sau */}
      <div className="flex items-center justify-between gap-3 pb-2">
        <button
          className="btn-ghost disabled:opacity-40"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          ← Chữ trước
        </button>
        <span className="text-sm font-bold text-slate-400">
          {index + 1} / {chars.length}
        </span>
        {index < chars.length - 1 ? (
          <button className="btn-primary" onClick={() => setIndex((i) => i + 1)}>
            Chữ tiếp →
          </button>
        ) : (
          <Link to={`/quiz/${lesson.id}`} className="btn-primary">
            Làm Quiz 🎯
          </Link>
        )}
      </div>
    </div>
  )
}
