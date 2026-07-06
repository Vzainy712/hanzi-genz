import { useMemo, useState } from 'react'
import { tones, initials, finals } from '../data/pinyinData.js'
import { getAllCharacters } from '../data/hskData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useToast, randomEncouragement } from '../context/ToastContext.jsx'

/** Trang luyện phát âm: 4 thanh điệu, thanh mẫu/vận mẫu và trò chơi đoán thanh. */
export default function PronunciationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">🗣️ Phát âm</h1>
        <p className="text-slate-500">Làm chủ 4 thanh điệu - chìa khoá nói tiếng Trung chuẩn.</p>
      </div>

      <ToneCards />
      <ToneTrainer />
      <SoundReference />
    </div>
  )
}

/** Thẻ minh hoạ 4 thanh điệu + thanh nhẹ, bấm để nghe. */
function ToneCards() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-extrabold text-slate-800">Bốn thanh điệu</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {tones.map((t) => (
          <div key={t.tone} className="card flex items-center gap-4">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl font-black text-white"
              style={{ backgroundColor: t.color }}
            >
              {t.mark}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-extrabold text-slate-800">{t.name}</div>
              <p className="text-sm text-slate-500">{t.contour}</p>
              <div className="mt-1 text-sm">
                <span className="font-hanzi text-lg font-bold" style={{ color: t.color }}>
                  {t.example}
                </span>{' '}
                <span className="font-semibold text-slate-600">{t.examplePinyin}</span>{' '}
                <span className="text-slate-400">· {t.exampleMeaning}</span>
              </div>
            </div>
            {isSpeechSupported() && (
              <button
                onClick={() => speakChinese(t.example)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:scale-110 active:scale-95"
                aria-label={`Nghe ${t.examplePinyin}`}
              >
                🔊
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/** Trò chơi: nghe một chữ rồi đoán thanh điệu (1-4). */
function ToneTrainer() {
  const { showToast } = useToast()
  // Chỉ lấy các chữ có thanh 1-4 (bỏ thanh nhẹ cho dễ).
  const pool = useMemo(() => getAllCharacters().filter((c) => c.tone >= 1 && c.tone <= 4), [])
  const [current, setCurrent] = useState(() => pickRandom(pool))
  const [answered, setAnswered] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
  }

  function guess(tone) {
    if (answered != null) return
    const isCorrect = tone === current.tone
    setAnswered(tone)
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
    if (isCorrect) showToast(`Chính xác! ${randomEncouragement()}`, { emoji: '🎯' })
    else showToast(`Chưa đúng - là thanh ${current.tone} nhé!`, { emoji: '💡', type: 'info' })
  }

  function nextRound() {
    setCurrent(pickRandom(pool))
    setAnswered(null)
  }

  if (!isSpeechSupported()) {
    return (
      <section className="card text-center text-slate-500">
        Trình duyệt của bạn chưa hỗ trợ phát âm nên chưa chơi được trò luyện thanh điệu 😅
      </section>
    )
  }

  return (
    <section className="card bg-gradient-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-slate-800">🎧 Luyện nghe thanh điệu</h2>
        <span className="badge-chip bg-brand-100 text-brand-700">
          {score.correct}/{score.total}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Bấm loa để nghe, rồi đoán xem đó là thanh mấy.
      </p>

      <div className="mt-4 flex flex-col items-center gap-4">
        <button
          onClick={() => speakChinese(current.hanzi)}
          className="grid h-24 w-24 place-items-center rounded-full bg-gradient-genz text-4xl text-white shadow-lg transition hover:scale-105 active:scale-95"
          aria-label="Nghe chữ"
        >
          🔊
        </button>

        {/* Nếu đã trả lời thì hé lộ chữ + pinyin */}
        {answered != null && (
          <div className="text-center animate-pop-in">
            <div className="font-hanzi text-4xl font-black text-brand-600">{current.hanzi}</div>
            <div className="font-semibold text-slate-600">{current.pinyin} · {current.meaning}</div>
          </div>
        )}

        <div className="grid w-full grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((tone) => {
            const t = tones.find((x) => x.tone === tone)
            let cls = 'text-white hover:scale-105'
            if (answered != null) {
              if (tone === current.tone) cls = 'ring-4 ring-emerald-300 text-white'
              else if (tone === answered) cls = 'opacity-40 text-white'
              else cls = 'opacity-40 text-white'
            }
            return (
              <button
                key={tone}
                onClick={() => guess(tone)}
                disabled={answered != null}
                className={`rounded-2xl py-4 text-center font-black shadow transition ${cls}`}
                style={{ backgroundColor: t.color }}
              >
                <div className="text-2xl">{t.mark}</div>
                <div className="text-xs">Thanh {tone}</div>
              </button>
            )
          })}
        </div>

        {answered != null && (
          <button onClick={nextRound} className="btn-primary animate-pop-in">
            Chữ tiếp theo →
          </button>
        )}
      </div>
    </section>
  )
}

/** Bảng tham khảo thanh mẫu (phụ âm) và vận mẫu (nguyên âm). */
function SoundReference() {
  return (
    <section>
      <h2 className="mb-3 text-lg font-extrabold text-slate-800">Âm khó cho người Việt</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h3 className="mb-2 font-extrabold text-brand-600">Thanh mẫu (phụ âm đầu)</h3>
          <ul className="flex flex-col gap-2">
            {initials.map((s) => (
              <SoundRow key={s.pinyin} sound={s} />
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="mb-2 font-extrabold text-accent-pink">Vận mẫu (nguyên âm)</h3>
          <ul className="flex flex-col gap-2">
            {finals.map((s) => (
              <SoundRow key={s.pinyin} sound={s} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function SoundRow({ sound }) {
  const hanzi = sound.example.split(' ')[0]
  return (
    <li className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
      <div className="min-w-0">
        <span className="font-mono text-lg font-bold text-slate-800">{sound.pinyin}</span>
        <span className="ml-2 text-sm text-slate-500">{sound.note}</span>
      </div>
      {isSpeechSupported() && (
        <button
          onClick={() => speakChinese(hanzi)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand-600 ring-1 ring-slate-100 transition hover:scale-110 active:scale-95"
          aria-label={`Nghe ${sound.example}`}
        >
          🔊
        </button>
      )}
    </li>
  )
}
