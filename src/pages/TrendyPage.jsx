import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trendySentences } from '../data/trendySentences.js'
import { mediaSentences } from '../data/mediaData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

/** Gộp 2 kho: câu trending gốc + thoại phim/MV/Douyin (chuẩn hoá cùng dạng hiển thị). */
const ALL_ITEMS = [
  ...trendySentences.map((s) => ({ ...s, displayNote: s.note })),
  ...mediaSentences.map((s) => ({ ...s, displayNote: `${s.source} — ${s.note}` })),
]

const FILTERS = [
  { key: 'all', label: '✨ Tất cả' },
  { key: 'douyin', label: '📱 Douyin' },
  { key: 'movie', label: '🎬 Phim' },
  { key: 'music', label: '🎵 Nhạc/MV' },
  { key: 'trend', label: '🔥 Meme' },
  { key: 'daily', label: '💬 Cửa miệng' },
]

const TYPE_BADGES = {
  lyric: { label: '🎵 Lyrics', cls: 'bg-pink-100 text-pink-700' },
  mv: { label: '🎵 MV', cls: 'bg-pink-100 text-pink-700' },
  movie: { label: '🎬 Phim', cls: 'bg-indigo-100 text-indigo-700' },
  douyin: { label: '📱 Douyin', cls: 'bg-slate-800 text-white' },
  trend: { label: '🔥 Trending', cls: 'bg-orange-100 text-orange-700' },
  daily: { label: '💬 Câu cửa miệng', cls: 'bg-cyan-100 text-cyan-700' },
}

/** Khớp item với bộ lọc đang chọn. */
function matchFilter(item, filter) {
  if (filter === 'all') return true
  if (filter === 'music') return item.type === 'lyric' || item.type === 'mv'
  return item.type === filter
}

/** Trang giải trí: trend Douyin, thoại phim, lời nhạc, meme - chill mà vẫn ôn bài. */
export default function TrendyPage() {
  const [filter, setFilter] = useState('all')
  const shown = ALL_ITEMS.filter((s) => matchFilter(s, filter))

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Luyện tập
        </Link>
        <Link to="/sentence-game" className="btn-ghost text-sm">🧱 Chơi Xếp câu</Link>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-800">🎤 Góc giải trí tiếng Trung</h1>
        <p className="text-slate-500">
          Trend Douyin, thoại phim, lời nhạc hot — thư giãn sau giờ học mà vẫn ôn được bài! 🍿
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

      <div className="text-sm font-bold text-slate-400">{shown.length} nội dung</div>

      {/* Danh sách */}
      <div className="flex flex-col gap-3">
        {shown.map((s) => {
          const badge = TYPE_BADGES[s.type] || TYPE_BADGES.trend
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
                    💡 {s.displayNote}
                  </div>
                  {s.grammarId && (
                    <Link
                      to={`/grammar/${s.grammarId}`}
                      className="mt-2 inline-block text-xs font-bold text-brand-600 hover:underline"
                    >
                      📖 Học ngữ pháp trong câu này →
                    </Link>
                  )}
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
