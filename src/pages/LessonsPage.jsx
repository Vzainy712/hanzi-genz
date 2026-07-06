import { Link } from 'react-router-dom'
import { hskData } from '../data/hskData.js'
import { useProgress } from '../context/ProgressContext.jsx'

/** Trang danh sách bài học theo từng cấp độ HSK. */
export default function LessonsPage() {
  const { learnedIds, quizBest } = useProgress()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">📚 Bài học</h1>
        <p className="text-slate-500">Chọn một bài để bắt đầu học chữ Hán.</p>
      </div>

      {hskData.map((level) => (
        <section key={level.level}>
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`rounded-full bg-gradient-to-r ${level.color} px-3 py-1 text-sm font-black text-white`}
            >
              {level.label}
            </span>
            <span className="text-sm text-slate-400">{level.lessons.length} bài học</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {level.lessons.map((lesson) => {
              const done = lesson.characters.filter((c) => learnedIds.includes(c.hanzi)).length
              const total = lesson.characters.length
              const complete = done === total
              const best = quizBest[lesson.id]
              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className="card group flex items-center gap-4 transition hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl">
                    {lesson.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-extrabold text-slate-800">{lesson.title}</h3>
                      {complete && <span title="Đã hoàn thành">✅</span>}
                    </div>
                    <p className="truncate text-sm text-slate-500">{lesson.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs font-bold">
                      <span className="text-brand-600">{done}/{total} chữ</span>
                      {best != null && <span className="text-emerald-600">Quiz: {best}%</span>}
                    </div>
                  </div>
                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">
                    →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
