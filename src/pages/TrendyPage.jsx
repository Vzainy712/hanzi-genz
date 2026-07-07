import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trendySentences } from '../data/trendySentences.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

const FILTERS = [
  { key: 'all', label: '✨ Tất cả' },
  { key: 'trend', label: '🔥 Trending/Meme' },
  { key: 'lyric', label: '🎵 Lyrics' },
  { key: 'daily', label: '💬 Câu cửa miệng' },
]

const TYPE_BADGES = {
  lyric: { label: '🎵 Lyrics', cls: 'bg-pink-100 text-pink-700' },
  trend: { label: '🔥 Trending', cls: 'bg-orange-100 text-orange-700' },
  daily: { label: '💬 Câu cửa miệng', cls: 'bg-cyan-100 text-cyan-700' },
}

/** Trang tổng hợp câu trending, meme mạng Trung và lời bài hát nổi tiếng. */
export default function TrendyPage() {
  const [filter, setFilter] = useState('all')
  const shown = trendySentences.filter((s) => filter === 'all' || s.type === filter)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Luyện tập
        </Link>
        <Link to="/sentence-game" className="btn-ghost text-sm">🧱 Chơi Xếp câu</Link>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-800">🎤 Câu trending & Lyrics</h1>
        <p className="text-slate-500">
          Học tiếng Trung qua meme, câu cửa miệng và lời bài hát đình đám — nhớ lâu hơn giáo trình khô khan!
        </p>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
              filter === f.key
                ? 'bg-gradient-genz text-white shadow'
                : 'bg-white text-slate-500 ring-1 ring-slate-100 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Danh sách câu */}
      <div className="flex flex-col gap-3">
        {shown.map((s) => {
          const badge = TYPE_BADGES[s.type]
          return (
            <div key={s.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`badge-chip ${badge.cls}`}>{badge.label}</span>
                    <span className="badge-chip bg-slate-100 text-slate-500">HSK {s.level}</span>
                  </div>
                  <div className="mt-2 font-hanzi text-2xl font-bold text-slate-800">{s.hanzi}</div>
                  <div className="text-sm font-semibold text-brand-600">{s.pinyin}</div>
                  <div className="mt-1 font-semibold text-slate-700">{s.vi}</div>
                  <div className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    💡 {s.note}
                  </div>
                </div>
                {isSpeechSupported() && (
                  <button
                    onClick={() => speakChinese(s.hanzi)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:scale-110 active:scale-95"
                    aria-label={`Nghe câu ${s.hanzi}`}
                  >
                    🔊
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
