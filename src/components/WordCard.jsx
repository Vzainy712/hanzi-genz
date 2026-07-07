import { useState } from 'react'
import StrokeAnimation from './StrokeAnimation.jsx'
import { toneColors, toneNames } from '../data/hskData.js'
import { getMnemonic } from '../data/mnemonics.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useProgress } from '../context/ProgressContext.jsx'

/**
 * Thẻ từ vựng (hỗ trợ từ 1 hoặc nhiều chữ Hán) cho bài học từ vựng chuẩn HSK.
 * Hiển thị: từ lớn tô màu thanh điệu, pinyin + audio, nghĩa Việt (kèm Anh để đối chiếu),
 * bộ thủ, mẹo nhớ GenZ (nếu có), hoạt hình nét từng chữ và nút đánh dấu đã học.
 *
 * @param {Object} props
 * @param {{hanzi:string,pinyin:string,english:string,vietnamese:string|null,radical:string,level:number,tone:number}} props.word
 */
export default function WordCard({ word }) {
  const [showStrokes, setShowStrokes] = useState(false)
  const { isLearned, markLearned, unmarkLearned } = useProgress()
  const learned = isLearned(word.hanzi)
  const toneColor = toneColors[word.tone] ?? toneColors[0]
  // Mẹo nhớ chỉ có cho chữ đơn (hoặc chữ đầu của từ nếu trùng).
  const mnemonic = getMnemonic(word.hanzi)
  const chars = [...word.hanzi].filter((ch) => /\p{Script=Han}/u.test(ch))

  return (
    <div className="card animate-pop-in flex flex-col gap-5">
      {/* Từ lớn + pinyin + audio */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className={`font-hanzi font-bold leading-none ${
            word.hanzi.length <= 1 ? 'text-8xl' : word.hanzi.length <= 3 ? 'text-6xl' : 'text-5xl'
          }`}
          style={{ color: toneColor }}
        >
          {word.hanzi}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold" style={{ color: toneColor }}>
            {word.pinyin}
          </span>
          {isSpeechSupported() && (
            <button
              onClick={() => speakChinese(word.hanzi)}
              className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:scale-110 hover:bg-brand-200 active:scale-95"
              aria-label={`Nghe phát âm ${word.hanzi}`}
            >
              🔊
            </button>
          )}
        </div>

        <span
          className="badge-chip text-white"
          style={{ backgroundColor: toneColor }}
          title={toneNames[word.tone]}
        >
          {toneNames[word.tone] || 'Thanh điệu'}
        </span>

        {/* Nghĩa Việt (chính) + Anh (đối chiếu) */}
        {word.vietnamese ? (
          <>
            <p className="text-lg font-semibold text-slate-700">{word.vietnamese}</p>
            <p className="text-sm text-slate-400">🇬🇧 {word.english}</p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-slate-700">🇬🇧 {word.english}</p>
            <span className="badge-chip bg-amber-100 text-amber-700">
              Bản dịch tiếng Việt đang cập nhật
            </span>
          </>
        )}
      </div>

      {/* Bộ thủ + cấp độ */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-accent-pink/10 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-accent-pink">Bộ thủ (部首)</div>
          <div className="mt-1 font-hanzi text-3xl font-bold text-accent-pink">{word.radical || '—'}</div>
        </div>
        <div className="rounded-2xl bg-brand-500/10 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-brand-600">Cấp độ</div>
          <div className="mt-1 text-3xl font-bold text-brand-600">HSK {word.level}</div>
        </div>
      </div>

      {/* Mẹo nhớ GenZ (nếu có) */}
      {mnemonic && (
        <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-pink-50 p-4 ring-1 ring-brand-100">
          <div className="flex items-center gap-2 text-sm font-black text-brand-600">🧠 Mẹo nhớ GenZ</div>
          <p className="mt-1 text-sm font-semibold text-slate-700">{mnemonic.tip}</p>
          <p className="mt-1 text-sm italic text-accent-pink">“{mnemonic.vibe}”</p>
        </div>
      )}

      {/* Hoạt hình nét chữ (từng ký tự) */}
      <button className="btn-ghost self-center" onClick={() => setShowStrokes((v) => !v)}>
        {showStrokes ? '🙈 Ẩn thứ tự nét' : `✏️ Xem thứ tự nét (${chars.length} chữ)`}
      </button>
      {showStrokes && (
        <div className="flex flex-wrap justify-center gap-4">
          {chars.map((ch, i) => (
            <StrokeAnimation key={ch + i} character={ch} size={chars.length > 1 ? 160 : 220} />
          ))}
        </div>
      )}

      {/* Đánh dấu đã học */}
      <button
        onClick={() => (learned ? unmarkLearned(word.hanzi) : markLearned(word.hanzi))}
        className={
          learned
            ? 'inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 active:scale-95'
            : 'btn-primary'
        }
      >
        {learned ? '✅ Đã học (bấm để bỏ)' : '➕ Đánh dấu đã học (+10 điểm)'}
      </button>
    </div>
  )
}
