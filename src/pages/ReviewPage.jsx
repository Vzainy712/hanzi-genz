import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fullVocab } from '../data/fullVocab.js'
import { getAllCharacters, toneColors } from '../data/hskData.js'
import { getMnemonic } from '../data/mnemonics.js'
import { getWordEmoji } from '../data/wordEmojis.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Confetti from '../components/Confetti.jsx'

// Tra cứu thông tin từ: ưu tiên kho đầy đủ, rơi về dữ liệu biên soạn.
const infoMap = new Map()
for (const c of getAllCharacters()) infoMap.set(c.hanzi, { hanzi: c.hanzi, pinyin: c.pinyin, meaning: c.meaning, tone: c.tone })
for (const w of fullVocab) infoMap.set(w.hanzi, { hanzi: w.hanzi, pinyin: w.pinyin, meaning: w.vietnamese || w.english, tone: w.tone })

/**
 * Trang ôn tập ngắt quãng (SRS): mỗi ngày ôn đúng những từ sắp quên.
 * Nhớ -> hẹn ôn thưa dần (1→2→4→7→15→30 ngày). Quên -> ôn lại ngày mai.
 */
export default function ReviewPage() {
  const { dueWords, reviewWord } = useProgress()
  // Chốt danh sách phiên ôn ngay khi vào trang (không đổi khi state cập nhật).
  const [queue] = useState(() => [...dueWords])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [stats, setStats] = useState({ ok: 0, fail: 0 })

  const current = queue[index]
  const info = useMemo(() => (current ? infoMap.get(current) : null), [current])

  function answer(remembered) {
    reviewWord(current, remembered)
    setStats((s) => ({ ok: s.ok + (remembered ? 1 : 0), fail: s.fail + (remembered ? 0 : 1) }))
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  // Không có gì để ôn
  if (queue.length === 0) {
    return (
      <div className="card mx-auto max-w-md text-center">
        <div className="text-6xl">🧠✨</div>
        <h1 className="mt-2 text-2xl font-black text-slate-800">Trí nhớ đang ổn áp!</h1>
        <p className="mt-1 text-slate-500">
          Hôm nay không có từ nào đến hạn ôn. Học thêm từ mới hoặc quay lại vào ngày mai nhé!
        </p>
        <Link to="/lessons" className="btn-primary mt-4">📚 Học từ mới</Link>
      </div>
    )
  }

  // Xong phiên ôn
  if (index >= queue.length) {
    const perfect = stats.fail === 0
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Confetti fire={perfect} />
        <div className="card w-full max-w-md animate-pop-in">
          <div className="text-6xl">{perfect ? '🏆' : '💪'}</div>
          <h1 className="mt-2 text-2xl font-black text-slate-800">
            {perfect ? 'Nhớ sạch không sót từ nào!' : 'Xong phiên ôn hôm nay!'}
          </h1>
          <p className="mt-2 text-slate-500">
            😎 Nhớ {stats.ok} · 😅 Quên {stats.fail} — từ quên sẽ quay lại vào ngày mai.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Link to="/" className="btn-primary">🏠 Về trang chủ</Link>
            <Link to="/lessons" className="btn-ghost">📚 Học từ mới</Link>
          </div>
        </div>
      </div>
    )
  }

  const toneColor = toneColors[info?.tone] ?? toneColors[0]
  const mnemonic = getMnemonic(current)
  const emoji = getWordEmoji(current)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-sm font-bold text-slate-400 hover:text-brand-600">← Thoát</Link>
        <span className="badge-chip bg-brand-100 text-brand-700">
          🧠 {index + 1}/{queue.length} · 😎 {stats.ok} · 😅 {stats.fail}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-genz transition-all"
          style={{ width: `${(index / queue.length) * 100}%` }}
        />
      </div>

      {/* Thẻ ôn: mặt trước chỉ có chữ, lật ra nghĩa */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="card flex min-h-[18rem] w-full flex-col items-center justify-center gap-3 text-center transition hover:shadow-xl"
      >
        {!flipped ? (
          <>
            <div className="font-hanzi text-7xl font-black" style={{ color: toneColor }}>
              {current}
            </div>
            <span className="text-sm font-bold text-slate-400">Còn nhớ nghĩa không? Bấm để lật 👆</span>
          </>
        ) : (
          <div className="animate-pop-in">
            {emoji && <div className="text-5xl">{emoji}</div>}
            <div className="mt-1 text-2xl font-extrabold" style={{ color: toneColor }}>{info?.pinyin}</div>
            <div className="mt-1 text-lg font-semibold text-slate-700">{info?.meaning}</div>
            {mnemonic && <p className="mx-auto mt-2 max-w-xs text-sm italic text-accent-pink">🧠 {mnemonic.tip}</p>}
          </div>
        )}
      </button>

      {isSpeechSupported() && (
        <button onClick={() => speakChinese(current)} className="btn-ghost self-center text-sm">
          🔊 Nghe phát âm
        </button>
      )}

      {flipped ? (
        <div className="grid grid-cols-2 gap-3 animate-pop-in">
          <button
            onClick={() => answer(false)}
            className="rounded-2xl bg-rose-100 py-4 font-black text-rose-600 transition hover:scale-105 active:scale-95"
          >
            😅 Quên rồi (ôn lại mai)
          </button>
          <button
            onClick={() => answer(true)}
            className="rounded-2xl bg-emerald-500 py-4 font-black text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 active:scale-95"
          >
            😎 Vẫn nhớ (+3)
          </button>
        </div>
      ) : (
        <p className="text-center text-sm text-slate-400">Nhớ nghĩa trong đầu rồi hãy lật nhé!</p>
      )}
    </div>
  )
}
