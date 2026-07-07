import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCharacters, toneColors } from '../data/hskData.js'
import { getMnemonic } from '../data/mnemonics.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useProgress } from '../context/ProgressContext.jsx'

/** Xáo trộn mảng. */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Flashcard nhớ mặt chữ: xem chữ → tự nhớ nghĩa → lật thẻ kiểm tra →
 * tự đánh giá "Đã nhớ / Chưa nhớ". Chữ chưa nhớ được đưa lại cuối chồng.
 */
export default function FlashcardPage() {
  const { markLearned } = useProgress()
  const [deck, setDeck] = useState(() => shuffle(getAllCharacters()))
  const [flipped, setFlipped] = useState(false)
  const [stats, setStats] = useState({ known: 0, reviewed: 0 })
  const total = useMemo(() => getAllCharacters().length, [])

  const current = deck[0]
  const done = deck.length === 0

  function handle(remembered) {
    if (remembered) {
      markLearned(current.hanzi) // cộng điểm + toast động viên
      setStats((s) => ({ known: s.known + 1, reviewed: s.reviewed + 1 }))
      setDeck((d) => d.slice(1)) // bỏ khỏi chồng
    } else {
      setStats((s) => ({ ...s, reviewed: s.reviewed + 1 }))
      // Đưa chữ xuống cuối để ôn lại sau.
      setDeck((d) => [...d.slice(1), d[0]])
    }
    setFlipped(false)
  }

  function restart() {
    setDeck(shuffle(getAllCharacters()))
    setStats({ known: 0, reviewed: 0 })
    setFlipped(false)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="card w-full max-w-md animate-pop-in">
          <div className="text-6xl">🎊</div>
          <h1 className="mt-2 text-2xl font-black text-slate-800">Xong cả chồng thẻ!</h1>
          <p className="mt-1 text-slate-500">
            Bạn đã lướt qua toàn bộ {total} chữ. Não nạp đầy chữ Hán rồi 🧠
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <button onClick={restart} className="btn-primary">🔁 Chơi lại</button>
            <Link to="/practice" className="btn-ghost">← Về Luyện tập</Link>
          </div>
        </div>
      </div>
    )
  }

  const progress = Math.round(((total - deck.length) / total) * 100)
  const toneColor = toneColors[current.tone] ?? toneColors[0]
  const mnemonic = getMnemonic(current.hanzi)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Luyện tập
        </Link>
        <span className="badge-chip bg-brand-100 text-brand-700">
          Còn {deck.length} · Đã nhớ {stats.known}
        </span>
      </div>

      {/* Thanh tiến độ */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-genz transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Thẻ lật */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="card flex min-h-[20rem] w-full flex-col items-center justify-center gap-3 text-center transition hover:shadow-xl"
      >
        {!flipped ? (
          <>
            <div className="font-hanzi text-8xl font-black" style={{ color: toneColor }}>
              {current.hanzi}
            </div>
            <span className="text-sm font-bold text-slate-400">Bấm để lật xem nghĩa 👆</span>
          </>
        ) : (
          <div className="animate-pop-in">
            <div className="text-2xl font-extrabold" style={{ color: toneColor }}>
              {current.pinyin}
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-700">{current.meaning}</div>
            {mnemonic && (
              <p className="mx-auto mt-3 max-w-xs text-sm italic text-accent-pink">
                🧠 {mnemonic.tip}
              </p>
            )}
            <div className="mt-2 text-xs font-bold text-slate-400">
              HSK {current.level} · {current.lessonTitle}
            </div>
          </div>
        )}
      </button>

      {/* Nút nghe */}
      {isSpeechSupported() && (
        <button
          onClick={() => speakChinese(current.hanzi)}
          className="btn-ghost self-center text-sm"
        >
          🔊 Nghe phát âm
        </button>
      )}

      {/* Tự đánh giá - chỉ hiện sau khi lật */}
      {flipped ? (
        <div className="grid grid-cols-2 gap-3 animate-pop-in">
          <button
            onClick={() => handle(false)}
            className="rounded-2xl bg-rose-100 py-4 font-black text-rose-600 transition hover:scale-105 active:scale-95"
          >
            😅 Chưa nhớ
          </button>
          <button
            onClick={() => handle(true)}
            className="rounded-2xl bg-emerald-500 py-4 font-black text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 active:scale-95"
          >
            😎 Đã nhớ (+10)
          </button>
        </div>
      ) : (
        <p className="text-center text-sm text-slate-400">
          Thử nhớ nghĩa trong đầu trước khi lật nhé!
        </p>
      )}
    </div>
  )
}
