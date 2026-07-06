import { Link, useParams } from 'react-router-dom'
import { getGrammarById } from '../data/grammarData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

/** Trang chi tiết một điểm ngữ pháp: công thức, giải thích, mẹo và câu ví dụ. */
export default function GrammarDetailPage() {
  const { grammarId } = useParams()
  const g = getGrammarById(grammarId)

  if (!g) {
    return (
      <div className="card text-center">
        <p className="text-slate-600">Không tìm thấy điểm ngữ pháp này 😅</p>
        <Link to="/grammar" className="btn-primary mt-4">← Về ngữ pháp</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <Link to="/grammar" className="text-sm font-bold text-slate-400 hover:text-brand-600">
        ← Ngữ pháp
      </Link>

      {/* Tiêu đề + công thức */}
      <div className="rounded-3xl bg-gradient-cool p-6 text-white shadow-lg">
        <div className="text-4xl">{g.emoji}</div>
        <h1 className="mt-2 text-2xl font-black">{g.title}</h1>
        <div className="mt-3 inline-block rounded-xl bg-white/20 px-4 py-2 font-hanzi text-lg font-bold">
          {g.pattern}
        </div>
      </div>

      {/* Giải thích */}
      <div className="card">
        <h2 className="mb-2 font-extrabold text-slate-800">💡 Cách dùng</h2>
        <p className="leading-relaxed text-slate-600">{g.explanation}</p>
      </div>

      {/* Mẹo ghi nhớ */}
      <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
        <div className="flex items-start gap-2">
          <span className="text-xl">📌</span>
          <div>
            <div className="text-sm font-bold text-amber-700">Mẹo ghi nhớ</div>
            <p className="text-sm text-amber-800">{g.tip}</p>
          </div>
        </div>
      </div>

      {/* Câu ví dụ */}
      <div>
        <h2 className="mb-2 font-extrabold text-slate-800">📝 Câu ví dụ</h2>
        <div className="flex flex-col gap-3">
          {g.examples.map((ex, i) => (
            <div
              key={i}
              className="card flex items-center justify-between gap-3 py-4 animate-pop-in"
            >
              <div className="min-w-0">
                <div className="font-hanzi text-xl font-bold text-slate-800">{ex.hanzi}</div>
                <div className="text-sm font-semibold text-brand-600">{ex.pinyin}</div>
                <div className="text-sm text-slate-500">{ex.meaning}</div>
              </div>
              {isSpeechSupported() && (
                <button
                  onClick={() => speakChinese(ex.hanzi)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:scale-110 active:scale-95"
                  aria-label={`Nghe câu ${ex.hanzi}`}
                >
                  🔊
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
