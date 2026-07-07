import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { dialogues, getDialogueById } from '../data/dialogueData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useToast } from '../context/ToastContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import Confetti from '../components/Confetti.jsx'

/**
 * Hội thoại nhập vai kiểu chat: NPC nhắn -> chọn câu đáp đúng.
 * Chọn sai chỉ nhận gợi ý hài hước, chọn đúng đi tiếp.
 * Kết thúc: chấm % trả lời đúng ngay lần đầu + thưởng điểm.
 */
export default function ChatPage() {
  const [params, setParams] = useSearchParams()
  const scenarioId = params.get('s')
  const scenario = scenarioId ? getDialogueById(scenarioId) : null

  if (!scenario) return <ScenarioPicker onPick={(id) => setParams({ s: id })} />
  return <ChatRoom key={scenario.id} scenario={scenario} onExit={() => setParams({})} />
}

/** Màn hình chọn tình huống. */
function ScenarioPicker({ onPick }) {
  return (
    <div className="flex flex-col gap-5">
      <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
        ← Luyện tập
      </Link>
      <div>
        <h1 className="text-2xl font-black text-slate-800">💬 Hội thoại nhập vai</h1>
        <p className="text-slate-500">
          Chat như thật, chọn câu đáp đúng — chọn sai thì... tấu hài nhận gợi ý 😂
        </p>
      </div>
      <div className="grid gap-3">
        {dialogues.map((d) => (
          <button
            key={d.id}
            onClick={() => onPick(d.id)}
            className="card group flex items-center gap-4 text-left transition hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl">
              {d.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-slate-800">{d.title}</h3>
              <p className="text-sm text-slate-500">{d.desc}</p>
            </div>
            <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** Phòng chat của một kịch bản. */
function ChatRoom({ scenario, onExit }) {
  const { showToast } = useToast()
  const { recordQuiz } = useProgress()
  const [stepIdx, setStepIdx] = useState(0)
  const [messages, setMessages] = useState(() => [{ from: 'npc', ...scenario.steps[0].npc }])
  const [wrongPicks, setWrongPicks] = useState([]) // các lựa chọn đã sai ở bước hiện tại
  const [firstTryFails, setFirstTryFails] = useState(0)
  const [done, setDone] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const bottomRef = useRef(null)

  const step = scenario.steps[stepIdx]
  const finished = done

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, finished])

  function pick(choice, idx) {
    if (finished) return
    if (!choice.ok) {
      if (wrongPicks.length === 0) setFirstTryFails((n) => n + 1) // chỉ tính sai lần đầu của bước
      setWrongPicks((w) => [...w, idx])
      showToast(choice.why || 'Chưa đúng, thử câu khác nhé!', { emoji: '🤭', type: 'info', duration: 4200 })
      return
    }
    // Đúng: thêm bong bóng của mình + NPC nói bước kế.
    const next = stepIdx + 1
    setMessages((m) => [...m, { from: 'me', ...choice }])
    setWrongPicks([])
    if (next < scenario.steps.length) {
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'npc', ...scenario.steps[next].npc }])
      }, 450)
      setStepIdx(next)
    } else {
      setDone(true)
      if (!recorded) {
        const total = scenario.steps.length
        const percent = Math.round(((total - firstTryFails) / total) * 100)
        recordQuiz(`chat-${scenario.id}`, percent, (total - firstTryFails) * 5)
        setRecorded(true)
      }
    }
  }

  const total = scenario.steps.length
  const percent = Math.round(((total - firstTryFails) / total) * 100)

  return (
    <div className="flex flex-col gap-4">
      <Confetti fire={finished && percent >= 60} />
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Chọn tình huống khác
        </button>
        <span className="badge-chip bg-brand-100 text-brand-700">
          {scenario.emoji} {Math.min(stepIdx + 1, total)}/{total}
        </span>
      </div>

      {/* Khung chat */}
      <div className="card flex max-h-[26rem] flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
        <div className="text-center text-xs font-bold text-slate-400">
          {scenario.npcAvatar} {scenario.npcName}
        </div>
        {messages.map((m, i) =>
          m.from === 'npc' ? (
            <div key={i} className="flex items-end gap-2 self-start animate-pop-in">
              <span className="text-2xl">{scenario.npcAvatar}</span>
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-hanzi font-bold text-slate-800">{m.t}</span>
                  {isSpeechSupported() && (
                    <button
                      onClick={() => speakChinese(m.t)}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-xs"
                      aria-label="Nghe"
                    >
                      🔊
                    </button>
                  )}
                </div>
                <div className="text-xs text-brand-600">{m.p}</div>
                <div className="text-xs text-slate-500">{m.v}</div>
              </div>
            </div>
          ) : (
            <div key={i} className="max-w-[75%] self-end rounded-2xl rounded-br-sm bg-gradient-genz p-3 text-white shadow animate-pop-in">
              <div className="font-hanzi font-bold">{m.t}</div>
              <div className="text-xs text-white/80">{m.p}</div>
            </div>
          ),
        )}
        {finished && (
          <div className="mt-1 self-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700 animate-pop-in">
            🎉 Hoàn thành hội thoại! Đúng ngay lần đầu: {percent}% (+{(total - firstTryFails) * 5} 💎)
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Khu chọn câu đáp */}
      {!finished ? (
        <div className="flex flex-col gap-2">
          <p className="text-center text-xs font-bold text-slate-400">Chọn câu đáp của bạn 👇</p>
          {step.choices.map((c, idx) => {
            const wrong = wrongPicks.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => pick(c, idx)}
                disabled={wrong}
                className={`rounded-2xl px-4 py-3 text-left transition ${
                  wrong
                    ? 'bg-rose-50 text-slate-300 line-through ring-1 ring-rose-100'
                    : 'bg-white ring-1 ring-slate-100 hover:scale-[1.01] hover:bg-brand-50 active:scale-95'
                }`}
              >
                <div className="font-hanzi font-bold text-slate-800">{c.t}</div>
                <div className="text-xs text-brand-600">{c.p}</div>
                <div className="text-xs text-slate-500">{c.v}</div>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button onClick={onExit} className="btn-primary">💬 Chơi tình huống khác</button>
          <Link to="/practice" className="btn-ghost">← Về Luyện tập</Link>
        </div>
      )}
    </div>
  )
}
