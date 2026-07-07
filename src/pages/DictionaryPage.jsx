import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchVocab, totalVocabCount, translatedCount, countByLevel } from '../data/fullVocab.js'
import { toneColors } from '../data/hskData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

const PAGE_SIZE = 30

/** Trang tra cứu từ điển HSK đầy đủ (nhập từ dữ liệu mở). */
export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState(0) // 0 = tất cả
  const [page, setPage] = useState(0)

  const results = useMemo(() => searchVocab({ query, level }), [query, level])
  const pageCount = Math.ceil(results.length / PAGE_SIZE) || 1
  const safePage = Math.min(page, pageCount - 1)
  const shown = results.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  function updateQuery(v) {
    setQuery(v)
    setPage(0)
  }
  function updateLevel(l) {
    setLevel(l)
    setPage(0)
  }

  const viPercent = Math.round((translatedCount / totalVocabCount) * 100)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Luyện tập
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-black text-slate-800">📖 Từ điển HSK</h1>
        <p className="text-slate-500">
          Trọn bộ <b>{totalVocabCount.toLocaleString('vi')}</b> từ HSK 1-6. Đã có nghĩa tiếng Việt:{' '}
          <b className="text-brand-600">{translatedCount.toLocaleString('vi')}</b> từ ({viPercent}%) — số còn lại
          hiện nghĩa tiếng Anh, đang bổ sung dần.
        </p>
      </div>

      {/* Ô tìm kiếm */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="Tìm theo chữ Hán, pinyin, nghĩa Việt hoặc Anh…"
          className="w-full rounded-2xl border-0 bg-white px-4 py-3 pl-11 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 outline-none focus:ring-2 focus:ring-brand-300"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
      </div>

      {/* Lọc theo cấp */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={level === 0} onClick={() => updateLevel(0)}>
          Tất cả ({totalVocabCount})
        </FilterChip>
        {[1, 2, 3, 4, 5, 6].map((l) => (
          <FilterChip key={l} active={level === l} onClick={() => updateLevel(l)}>
            HSK {l} ({countByLevel[l] || 0})
          </FilterChip>
        ))}
      </div>

      {/* Số kết quả */}
      <div className="text-sm font-bold text-slate-400">
        {results.length.toLocaleString('vi')} từ khớp
        {results.length > PAGE_SIZE && ` · trang ${safePage + 1}/${pageCount}`}
      </div>

      {/* Danh sách từ */}
      <div className="flex flex-col gap-2">
        {shown.length === 0 && (
          <div className="card text-center text-slate-500">Không tìm thấy từ nào 😅</div>
        )}
        {shown.map((w) => (
          <VocabRow key={w.hanzi + w.level} word={w} />
        ))}
      </div>

      {/* Phân trang */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between gap-3 pb-2">
          <button
            className="btn-ghost disabled:opacity-40"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
          >
            ← Trước
          </button>
          <span className="text-sm font-bold text-slate-400">
            {safePage + 1} / {pageCount}
          </span>
          <button
            className="btn-ghost disabled:opacity-40"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage(safePage + 1)}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
        active ? 'bg-gradient-genz text-white shadow' : 'bg-white text-slate-500 ring-1 ring-slate-100 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

function VocabRow({ word }) {
  const toneColor = toneColors[word.tone] ?? toneColors[0]
  return (
    <div className="card flex items-center gap-3 py-3">
      <div className="font-hanzi text-3xl font-bold leading-none" style={{ color: toneColor }}>
        {word.hanzi}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-brand-600">{word.pinyin}</span>
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-black text-slate-500">
            HSK {word.level}
          </span>
        </div>
        {word.vietnamese ? (
          <div className="text-sm font-semibold text-slate-700">{word.vietnamese}</div>
        ) : (
          <div className="text-sm font-semibold text-slate-400 italic">
            (đang cập nhật bản dịch tiếng Việt)
          </div>
        )}
        <div className="truncate text-xs text-slate-400">{word.english}</div>
      </div>
      {isSpeechSupported() && (
        <button
          onClick={() => speakChinese(word.hanzi)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:scale-110 active:scale-95"
          aria-label={`Nghe ${word.hanzi}`}
        >
          🔊
        </button>
      )}
    </div>
  )
}
