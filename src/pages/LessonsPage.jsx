import { Link } from 'react-router-dom'
import { hskData } from '../data/hskData.js'
import { vocabLessonGroups, VOCAB_LEVEL_COLORS } from '../data/vocabLessons.js'
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

      {/* Giáo trình từ vựng chuẩn HSK (đầy đủ, sinh từ kho 595 từ HSK 1-3) */}
      <section className="rounded-3xl bg-gradient-to-br from-brand-50 to-pink-50 p-5 ring-1 ring-brand-100">
        <h2 className="text-lg font-extrabold text-slate-800">🎓 Giáo trình từ vựng chuẩn HSK</h2>
        <p className="text-sm text-slate-500">
          Trọn bộ từ vựng thật theo giáo trình — HSK 1-3 đã có nghĩa tiếng Việt đầy đủ, kèm câu trending mỗi bài.
        </p>
        <div className="mt-4 flex flex-col gap-5">
          {vocabLessonGroups.map((group) => {
            const allWords = group.lessons.flatMap((l) => l.words)
            const done = allWords.filter((w) => learnedIds.includes(w.hanzi)).length
            return (
              <div key={group.level}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-full bg-gradient-to-r ${VOCAB_LEVEL_COLORS[group.level]} px-3 py-1 text-sm font-black text-white`}
                  >
                    HSK {group.level}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {group.lessons.length} bài · {done}/{allWords.length} từ đã học
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.lessons.map((lesson) => {
                    const lessonDone = lesson.words.filter((w) => learnedIds.includes(w.hanzi)).length
                    const complete = lessonDone === lesson.words.length
                    const best = quizBest[lesson.id]
                    return (
                      <Link
                        key={lesson.id}
                        to={`/vocab/${lesson.id}`}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition hover:scale-105 ${
                          complete
                            ? 'bg-emerald-100 text-emerald-700'
                            : lessonDone > 0
                              ? 'bg-white text-brand-600 ring-1 ring-brand-200'
                              : 'bg-white text-slate-600 ring-1 ring-slate-100'
                        }`}
                        title={`${lessonDone}/${lesson.words.length} từ${best != null ? ` · Quiz ${best}%` : ''}`}
                      >
                        <span>{lesson.emoji}</span>
                        <span>Bộ {lesson.index}</span>
                        {complete && <span>✅</span>}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div>
        <h2 className="text-lg font-extrabold text-slate-800">💎 Bài học chọn lọc</h2>
        <p className="text-sm text-slate-500">
          Các bài theo chủ đề, biên soạn kỹ với mẹo nhớ GenZ và ví dụ chi tiết.
        </p>
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
              const percent = Math.round((done / total) * 100)
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
                      <span
                        className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${
                          complete ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-50 text-brand-600'
                        }`}
                      >
                        {percent}%
                      </span>
                    </div>
                    <p className="truncate text-sm text-slate-500">{lesson.description}</p>
                    {/* Thanh tiến độ - đồng bộ với giáo trình chuẩn */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${level.color} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-xs font-bold">
                      <span className="text-brand-600">{done}/{total} chữ</span>
                      {best != null && <span className="text-emerald-600">Quiz: {best}%</span>}
                      <span className="text-accent-pink">🧠 Mẹo nhớ GenZ</span>
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
