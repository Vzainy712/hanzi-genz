import { Link } from 'react-router-dom'
import { radicalsData } from '../data/radicalsData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

/** Trang học bộ thủ (部首): mỗi bộ kèm nghĩa, mẹo và các chữ chứa bộ đó. */
export default function RadicalsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Luyện tập
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-800">🧩 Bộ thủ (部首)</h1>
        <p className="text-slate-500">
          Bộ thủ là "mảnh ghép gốc" của chữ Hán. Nhớ bộ thủ → đoán nghĩa & nhớ chữ nhanh hơn nhiều.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {radicalsData.map((r) => (
          <div key={r.radical} className="card flex flex-col gap-3">
            {/* Đầu thẻ: bộ thủ + tên + nghĩa */}
            <div className="flex items-center gap-3">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-pink-100 font-hanzi text-4xl font-bold text-brand-600">
                {r.radical}
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-slate-800">
                  {r.name} <span className="font-hanzi text-slate-400">{r.radical}</span>
                </div>
                <div className="text-sm text-slate-500">{r.meaning}</div>
              </div>
            </div>

            {/* Mẹo nhận biết */}
            <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {r.note}</p>

            {/* Chữ ví dụ chứa bộ thủ */}
            <div>
              <div className="mb-1 text-xs font-bold text-slate-400">Chữ chứa bộ này:</div>
              <div className="flex flex-wrap gap-2">
                {r.examples.map((ex) => (
                  <button
                    key={ex.hanzi}
                    onClick={() => isSpeechSupported() && speakChinese(ex.hanzi)}
                    className="flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 text-sm ring-1 ring-slate-100 transition hover:bg-brand-50 active:scale-95"
                    title={`${ex.pinyin} - ${ex.meaning}`}
                  >
                    <span className="font-hanzi text-lg font-bold text-slate-800">{ex.hanzi}</span>
                    <span className="text-xs text-slate-400">{ex.pinyin}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
