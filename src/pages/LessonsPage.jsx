import { Link } from 'react-router-dom'
import { vocabLessonGroups, VOCAB_LEVEL_COLORS } from '../data/vocabLessons.js'
import { useProgress } from '../context/ProgressContext.jsx'

/**
 * Trang Bài học - giáo trình HỢP NHẤT theo chủ đề:
 * toàn bộ 595 từ HSK 1-3 chia thành các bài chủ đề thực dụng,
 * mỗi bài có hình minh hoạ, mẹo nhớ, quiz và Boss cuối chương.
 */
export default function LessonsPage() {
  const { learnedIds, quizBest } = useProgress()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">📚 Bài học theo chủ đề</h1>
        <p className="text-slate-500">
          Trọn bộ từ vựng chuẩn HSK 1-3 chia theo chủ đề thực dụng — học xong chủ đề thì thách đấu Boss ⚔️
        </p>
      </div>

      {vocabLessonGroups.map((group) => {
        const allWords = group.lessons.flatMap((l) => l.words)
        const levelDone = allWords.filter((w) => learnedIds.includes(w.hanzi)).length
        return (
          <section key={group.level}>
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`rounded-full bg-gradient-to-r ${VOCAB_LEVEL_COLORS[group.level]} px-3 py-1 text-sm font-black text-white`}
              >
                HSK {group.level}
              </span>
              <span className="text-sm text-slate-400">
                {group.lessons.length} chủ đề · {levelDone}/{allWords.length} từ
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {group.lessons.map((lesson) => {
                const done = lesson.words.filter((w) => learnedIds.includes(w.hanzi)).length
                const total = lesson.words.length
                const complete = done === total
                const percent = Math.round((done / total) * 100)
                const best = quizBest[lesson.id]
                const bossWon = (quizBest[`boss-${lesson.id}`] || 0) >= 100
                return (
                  <Link
                    key={lesson.id}
                    to={`/vocab/${lesson.id}`}
                    className="card group flex items-center gap-4 transition hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl">
                      {lesson.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-extrabold text-slate-800">{lesson.title}</h3>
                        {bossWon ? <span title="Đã hạ Boss">⚔️</span> : complete && <span title="Đã học hết">✅</span>}
                        <span
                          className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${
                            complete ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-50 text-brand-600'
                          }`}
                        >
                          {percent}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${VOCAB_LEVEL_COLORS[group.level]} transition-all duration-500`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-xs font-bold">
                        <span className="text-brand-600">{done}/{total} từ</span>
                        {best != null && <span className="text-emerald-600">Quiz: {best}%</span>}
                        {complete && !bossWon && <span className="text-rose-500">⚔️ Boss đang chờ!</span>}
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
        )
      })}
    </div>
  )
}
