import { useState } from 'react'
import StrokeAnimation from './StrokeAnimation.jsx'
import { toneColors, toneNames } from '../data/hskData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useProgress } from '../context/ProgressContext.jsx'

/**
 * Thẻ chi tiết một chữ Hán: chữ lớn, bộ thủ, pinyin + thanh điệu,
 * phát âm, hoạt hình nét, câu ví dụ và nút đánh dấu đã học.
 *
 * @param {Object} props
 * @param {import('../data/hskData.js').CharacterEntry} props.char
 */
export default function CharacterCard({ char }) {
  const [showStrokes, setShowStrokes] = useState(false)
  const { isLearned, markLearned, unmarkLearned } = useProgress()
  const learned = isLearned(char.hanzi)
  const toneColor = toneColors[char.tone] ?? toneColors[0]

  return (
    <div className="card animate-pop-in flex flex-col gap-5">
      {/* Phần đầu: chữ Hán lớn + pinyin + phát âm */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="font-hanzi text-8xl font-bold leading-none"
          style={{ color: toneColor }}
        >
          {char.hanzi}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold" style={{ color: toneColor }}>
            {char.pinyin}
          </span>
          {isSpeechSupported() && (
            <button
              onClick={() => speakChinese(char.hanzi)}
              className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:scale-110 hover:bg-brand-200 active:scale-95"
              title="Nghe phát âm"
              aria-label={`Nghe phát âm chữ ${char.hanzi}`}
            >
              🔊
            </button>
          )}
        </div>

        <span
          className="badge-chip text-white"
          style={{ backgroundColor: toneColor }}
          title={toneNames[char.tone]}
        >
          {toneNames[char.tone]}
        </span>

        <p className="text-lg font-semibold text-slate-700">{char.meaning}</p>
      </div>

      {/* Bộ thủ + số nét */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-accent-pink/10 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-accent-pink">
            Bộ thủ (部首)
          </div>
          <div className="mt-1 font-hanzi text-3xl font-bold text-accent-pink">{char.radical}</div>
          <div className="mt-1 text-sm font-semibold text-slate-600">{char.radicalName}</div>
          <div className="text-xs text-slate-500">{char.radicalMeaning}</div>
        </div>
        <div className="rounded-2xl bg-brand-500/10 p-4 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-brand-600">Số nét</div>
          <div className="mt-1 text-3xl font-bold text-brand-600">{char.strokeCount}</div>
          <div className="mt-1 text-xs text-slate-500">nét viết</div>
        </div>
      </div>

      {/* Nút mở hoạt hình nét chữ */}
      <button className="btn-ghost self-center" onClick={() => setShowStrokes((v) => !v)}>
        {showStrokes ? '🙈 Ẩn thứ tự nét' : '✏️ Xem thứ tự nét (笔顺)'}
      </button>
      {showStrokes && (
        <div className="flex justify-center">
          <StrokeAnimation character={char.hanzi} />
        </div>
      )}

      {/* Câu ví dụ */}
      <div>
        <div className="mb-2 text-sm font-bold text-slate-500">📝 Ví dụ thường gặp</div>
        <div className="flex flex-col gap-2">
          {char.examples.map((ex, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3"
            >
              <div>
                <div className="font-hanzi text-xl font-bold text-slate-800">{ex.hanzi}</div>
                <div className="text-sm text-brand-600">{ex.pinyin}</div>
                <div className="text-sm text-slate-500">{ex.meaning}</div>
              </div>
              {isSpeechSupported() && (
                <button
                  onClick={() => speakChinese(ex.hanzi)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand-600 ring-1 ring-brand-100 transition hover:scale-110 active:scale-95"
                  aria-label={`Nghe ${ex.hanzi}`}
                >
                  🔊
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Nút đánh dấu đã học */}
      <button
        onClick={() => (learned ? unmarkLearned(char.hanzi) : markLearned(char.hanzi))}
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
