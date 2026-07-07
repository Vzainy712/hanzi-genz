import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVocabLessonById } from '../data/vocabLessons.js'
import { fullVocab } from '../data/fullVocab.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import Confetti from '../components/Confetti.jsx'

const BOSS_BY_LEVEL = { 1: { emoji: '👹', name: 'Tiểu Quỷ HSK 1' }, 2: { emoji: '🐲', name: 'Giao Long HSK 2' }, 3: { emoji: '🐉', name: 'Chân Long HSK 3' } }
const QUESTION_COUNT = 8
const MAX_HEARTS = 3

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const meaningOf = (w) => w.vietnamese || w.english

/**
 * Đấu Boss cuối chương: mỗi câu đúng trừ 1 máu Boss, sai mất 1 tim.
 * Hạ Boss trước khi hết tim -> +50 điểm + huy hiệu Diệt Boss.
 */
export default function BossPage() {
  const { lessonId } = useParams()
  const lesson = getVocabLessonById(lessonId)
  const { recordQuiz } = useProgress()

  const questions = useMemo(() => {
    if (!lesson) return []
    const pool = fullVocab.filter((w) => w.level === lesson.level)
    return shuffle(lesson.words)
      .slice(0, QUESTION_COUNT)
      .map((word) => {
        const wrongs = shuffle(pool.filter((w) => w.hanzi !== word.hanzi && meaningOf(w) !== meaningOf(word)))
          .slice(0, 3)
          .map(meaningOf)
        return { word, options: shuffle([meaningOf(word), ...wrongs]), correct: meaningOf(word) }
      })
  }, [lesson])

  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [bossHP, setBossHP] = useState(questions.length)
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [outcome, setOutcome] = useState(null) // 'win' | 'lose'
  const [hitAnim, setHitAnim] = useState(false)
  const [recorded, setRecorded] = useState(false)

  if (!lesson) {
    return (
      <div className="card text-center">
        <p className="text-slate-600">Không tìm thấy chương này 😅</p>
        <Link to="/lessons" className="btn-primary mt-4">← Về bài học</Link>
      </div>
    )
  }

  const boss = BOSS_BY_LEVEL[lesson.level] || BOSS_BY_LEVEL[1]
  const q = questions[idx]

  function choose(opt) {
    if (selected != null || outcome) return
    setSelected(opt)
    if (opt === q.correct) {
      const hp = bossHP - 1
      setBossHP(hp)
      setHitAnim(true)
      setTimeout(() => setHitAnim(false), 400)
      if (hp <= 0) return finish('win')
    } else {
      const h = hearts - 1
      setHearts(h)
      if (h <= 0) return finish('lose')
    }
  }

  function finish(result) {
    setOutcome(result)
    if (result === 'win' && !recorded) {
      recordQuiz(`boss-${lesson.id}`, 100, 50)
      setRecorded(true)
    }
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx((i) => i + 1)
      setSelected(null)
    } else if (bossHP > 0) {
      // Hết câu mà Boss còn máu -> chưa hạ được.
      finish('lose')
    }
  }

  if (outcome) {
    const win = outcome === 'win'
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Confetti fire={win} />
        <div className="card w-full max-w-md animate-pop-in">
          <div className={`text-7xl ${win ? '' : 'grayscale'}`}>{win ? '🏆' : boss.emoji}</div>
          <h1 className="mt-2 text-2xl font-black text-slate-800">
            {win ? `Đã hạ gục ${boss.name}!` : `${boss.name} vẫn còn đó...`}
          </h1>
          <p className="mt-2 text-slate-500">
            {win ? '+50 điểm 💎 · Huy hiệu ⚔️ Diệt Boss đã mở khoá!' : 'Ôn lại từ vựng trong chương rồi phục thù nhé!'}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <button onClick={() => window.location.reload()} className="btn-primary">
              {win ? '🔁 Đấu lại cho vui' : '⚔️ Phục thù ngay'}
            </button>
            <Link to={`/vocab/${lesson.id}`} className="btn-ghost">📖 Ôn lại chương</Link>
            <Link to="/lessons" className="text-sm font-bold text-slate-400 hover:text-brand-600">← Về bài học</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link to={`/vocab/${lesson.id}`} className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Rút lui
        </Link>
        <span className="text-sm font-bold text-slate-500">
          {'❤️'.repeat(hearts)}{'🖤'.repeat(MAX_HEARTS - hearts)}
        </span>
      </div>

      {/* Boss + thanh máu */}
      <div className="card flex items-center gap-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className={`text-6xl transition ${hitAnim ? 'animate-wiggle scale-90' : ''}`}>{boss.emoji}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-black">{boss.name}</span>
            <span className="text-sm font-bold text-rose-300">{bossHP}/{questions.length} HP</span>
          </div>
          <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-500"
              style={{ width: `${(bossHP / questions.length) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-white/60">Trả lời đúng để tấn công! Sai là mất tim đó ⚔️</p>
        </div>
      </div>

      {/* Câu hỏi */}
      <div className="card flex flex-col items-center gap-2 text-center">
        <p className="text-sm font-bold text-slate-400">Câu {idx + 1}/{questions.length} — Từ này nghĩa là gì?</p>
        <div className={`font-hanzi font-black text-brand-600 ${q.word.hanzi.length <= 2 ? 'text-6xl' : 'text-4xl'}`}>
          {q.word.hanzi}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">{q.word.pinyin}</span>
          {isSpeechSupported() && (
            <button
              onClick={() => speakChinese(q.word.hanzi)}
              className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-brand-600 hover:scale-110 active:scale-95"
              aria-label="Nghe"
            >
              🔊
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        {q.options.map((opt) => {
          let cls = 'bg-white ring-1 ring-slate-100 hover:bg-slate-50'
          if (selected != null) {
            if (opt === q.correct) cls = 'bg-emerald-500 text-white ring-2 ring-emerald-500'
            else if (opt === selected) cls = 'bg-rose-500 text-white ring-2 ring-rose-500'
            else cls = 'bg-white text-slate-400 ring-1 ring-slate-100 opacity-60'
          }
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              disabled={selected != null}
              className={`rounded-2xl px-5 py-3.5 text-left font-bold transition ${cls}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {selected != null && !outcome && (
        <button onClick={next} className="btn-primary self-end animate-pop-in">Chiêu tiếp →</button>
      )}
    </div>
  )
}
