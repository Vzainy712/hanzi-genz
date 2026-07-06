import { Link } from 'react-router-dom'
import { grammarData } from '../data/grammarData.js'

/** Trang danh sách các điểm ngữ pháp / mẫu câu, nhóm theo cấp độ. */
export default function GrammarPage() {
  const levels = [...new Set(grammarData.map((g) => g.level))].sort()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">🔤 Ngữ pháp & Câu</h1>
        <p className="text-slate-500">Nắm cú pháp cơ bản để tự đặt câu tiếng Trung.</p>
      </div>

      {levels.map((level) => (
        <section key={level}>
          <div className="mb-3">
            <span className="rounded-full bg-gradient-cool px-3 py-1 text-sm font-black text-white">
              HSK {level}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {grammarData
              .filter((g) => g.level === level)
              .map((g) => (
                <Link
                  key={g.id}
                  to={`/grammar/${g.id}`}
                  className="card group flex items-center gap-4 transition hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl">
                    {g.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-extrabold text-slate-800">{g.title}</h3>
                    <code className="mt-1 inline-block rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-brand-600">
                      {g.pattern}
                    </code>
                  </div>
                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">
                    →
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
