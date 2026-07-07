import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fullVocab } from '../data/fullVocab.js'
import { getWordEmoji } from '../data/wordEmojis.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

/** Độ hiếm thẻ theo cấp HSK - học càng cao thẻ càng xịn. */
const RARITY = {
  1: { label: 'Thường', cls: 'ring-slate-200 bg-white', text: 'text-slate-500' },
  2: { label: 'Hiếm', cls: 'ring-sky-300 bg-sky-50', text: 'text-sky-600' },
  3: { label: 'Sử thi', cls: 'ring-purple-400 bg-gradient-to-br from-purple-50 to-pink-50', text: 'text-purple-600' },
}

const COLLECTIBLE = fullVocab.filter((w) => w.level <= 3)

/** Bộ sưu tập thẻ từ vựng: từ đã học biến thành thẻ bài có độ hiếm. */
export default function CollectionPage() {
  const { learnedIds } = useProgress()
  const [level, setLevel] = useState(0)
  const learned = new Set(learnedIds)

  const shown = COLLECTIBLE.filter((w) => !level || w.level === level)
  const ownedCount = COLLECTIBLE.filter((w) => learned.has(w.hanzi)).length

  return (
    <div className="flex flex-col gap-5">
      <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
        ← Luyện tập
      </Link>

      <div>
        <h1 className="text-2xl font-black text-slate-800">🃏 Bộ sưu tập thẻ chữ</h1>
        <p className="text-slate-500">
          Mỗi từ học xong hoá thành một tấm thẻ. Sưu tập đủ {COLLECTIBLE.length} thẻ HSK 1-3 nào!
        </p>
      </div>

      {/* Tổng quan */}
      <div className="card flex items-center gap-4">
        <div className="text-4xl">🎴</div>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-700">Đã sưu tập</span>
            <span className="text-brand-600">{ownedCount}/{COLLECTIBLE.length}</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-genz transition-all duration-500"
              style={{ width: `${(ownedCount / COLLECTIBLE.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lọc cấp */}
      <div className="flex flex-wrap gap-2">
        {[0, 1, 2, 3].map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
              level === l
                ? 'bg-gradient-genz text-white shadow'
                : 'bg-white text-slate-500 ring-1 ring-slate-100 hover:bg-slate-50'
            }`}
          >
            {l === 0 ? '✨ Tất cả' : `HSK ${l} · ${RARITY[l].label}`}
          </button>
        ))}
      </div>

      {/* Lưới thẻ */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {shown.map((w) => {
          const owned = learned.has(w.hanzi)
          const rarity = RARITY[w.level]
          const emoji = getWordEmoji(w.hanzi)
          return owned ? (
            <button
              key={w.hanzi}
              onClick={() => isSpeechSupported() && speakChinese(w.hanzi)}
              title={`${w.pinyin} · ${w.vietnamese || w.english}`}
              className={`flex flex-col items-center gap-0.5 rounded-2xl p-2.5 ring-2 transition hover:scale-105 active:scale-95 ${rarity.cls}`}
            >
              <span className="font-hanzi text-2xl font-bold text-slate-800">{w.hanzi}</span>
              {emoji && <span className="text-lg leading-none">{emoji}</span>}
              <span className={`text-[9px] font-black uppercase ${rarity.text}`}>{rarity.label}</span>
            </button>
          ) : (
            <div
              key={w.hanzi}
              title="Chưa mở khoá - học từ này để nhận thẻ!"
              className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-slate-100 p-2.5 opacity-60"
            >
              <span className="text-2xl text-slate-300">❓</span>
              <span className="text-[9px] font-bold text-slate-400">HSK {w.level}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
