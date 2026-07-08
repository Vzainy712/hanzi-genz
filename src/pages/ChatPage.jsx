import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { dialogues, getDialogueById } from '../data/dialogueData.js'
import { branchDialogues, getBranchDialogueById } from '../data/dialogueBranchData.js'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'
import { useToast } from '../context/ToastContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import Confetti from '../components/Confetti.jsx'

/**
 * Hội thoại nhập vai kiểu chat - 2 chế độ:
 * - 🌿 Tự nhiên (phân nhánh): mọi lựa chọn đều đi tiếp, NPC phản hồi khác nhau
 *   theo từng câu bạn chọn; cuối buổi chấm "EQ giao tiếp".
 * - 🎯 Luyện cú pháp: chọn câu đúng, câu sai nhận gợi ý hài.
 * Chế độ "immersion": chỉ hiện chữ Hán + pinyin + audio; vietsub LÀM MỜ.
 */
export default function ChatPage() {
  const [params, setParams] = useSearchParams()
  const scenarioId = params.get('s')
  const scenario = scenarioId ? getBranchDialogueById(scenarioId) || getDialogueById(scenarioId) : null

  if (!scenario) return <ScenarioPicker onPick={(id) => setParams({ s: id })} />
  return scenario.branching ? (
    <BranchChatRoom key={scenario.id} scenario={scenario} onExit={() => setParams({})} />
  ) : (
    <ChatRoom key={scenario.id} scenario={scenario} onExit={() => setParams({})} />
  )
}

/** Dòng vietsub bị làm mờ - bấm để hiện/ẩn từng dòng, hoặc bật toàn cục. */
function ViText({ text, show, className = '' }) {
  const [revealed, setRevealed] = useState(false)
  const visible = show || revealed
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        setRevealed((v) => !v)
      }}
      title={visible ? 'Bấm để ẩn lại' : 'Bấm để xem nghĩa'}
      className={`cursor-pointer transition-all duration-200 ${
        visible ? '' : 'select-none blur-[5px] opacity-60 hover:opacity-90'
      } ${className}`}
    >
      {text}
    </span>
  )
}

/** Màn hình chọn tình huống - 2 nhóm: phân nhánh tự nhiên & luyện cú pháp. */
function ScenarioPicker({ onPick }) {
  return (
    <div className="flex flex-col gap-5">
      <Link to="/practice" className="text-sm font-bold text-slate-400 hover:text-brand-600">
        ← Luyện tập
      </Link>
      <div>
        <h1 className="text-2xl font-black text-slate-800">💬 Hội thoại nhập vai</h1>
        <p className="text-slate-500">
          Chế độ "immersion": vietsub che mờ để luyện nhớ mặt chữ + nghe. Bấm dòng mờ khi cần 😉
        </p>
      </div>

      <div>
        <h2 className="mb-2 flex items-center gap-2 font-extrabold text-slate-800">
          🌿 Hội thoại tự nhiên
          <span className="badge-chip bg-emerald-100 text-emerald-700">NPC phản hồi theo câu bạn chọn</span>
        </h2>
        <p className="mb-3 text-xs text-slate-400">
          Không có đúng/sai — chọn kiểu gì chuyện trò cũng tiếp diễn, cuối buổi chấm "EQ giao tiếp".
        </p>
        <div className="grid gap-3">
          {branchDialogues.map((d) => (
            <ScenarioCard key={d.id} d={d} onPick={onPick} meta={`~${Object.keys(d.nodes).length * 3} câu thoại · phân nhánh`} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 flex items-center gap-2 font-extrabold text-slate-800">
          🎯 Luyện cú pháp
          <span className="badge-chip bg-brand-100 text-brand-700">chọn câu đúng</span>
        </h2>
        <div className="grid gap-3">
          {dialogues.map((d) => (
            <ScenarioCard key={d.id} d={d} onPick={onPick} meta={`${d.steps.length} lượt thoại`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ScenarioCard({ d, onPick, meta }) {
  return (
    <button
      onClick={() => onPick(d.id)}
      className="card group flex items-center gap-4 text-left transition hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl">{d.emoji}</div>
      <div className="min-w-0 flex-1">
        <h3 className="font-extrabold text-slate-800">{d.title}</h3>
        <p className="text-sm text-slate-500">{d.desc}</p>
        <span className="mt-1 inline-block text-xs font-bold text-brand-500">{meta}</span>
      </div>
      <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">→</span>
    </button>
  )
}

/** Bong bóng chat dùng chung (immersion: vietsub mờ). */
function Bubble({ m, avatar, showVi }) {
  return m.from === 'npc' ? (
    <div className="flex items-end gap-2 self-start animate-pop-in">
      <span className="text-2xl">{avatar}</span>
      <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-hanzi text-lg font-bold text-slate-800">{m.t}</span>
          {isSpeechSupported() && (
            <button
              onClick={() => speakChinese(m.t)}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-xs text-brand-600 transition hover:scale-110 active:scale-95"
              aria-label="Nghe lại"
            >
              🔊
            </button>
          )}
        </div>
        <div className="text-xs font-semibold text-brand-600">{m.p}</div>
        <div className="mt-0.5 text-xs text-slate-500">
          <ViText text={m.v} show={showVi} />
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-[78%] self-end rounded-2xl rounded-br-sm bg-gradient-genz p-3 text-white shadow animate-pop-in">
      <div className="flex items-center gap-2">
        <span className="font-hanzi text-lg font-bold">{m.t}</span>
        {isSpeechSupported() && (
          <button
            onClick={() => speakChinese(m.t)}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-xs transition hover:scale-110 active:scale-95"
            aria-label="Nghe lại"
          >
            🔊
          </button>
        )}
      </div>
      <div className="text-xs text-white/85">{m.p}</div>
    </div>
  )
}

/** Phòng chat PHÂN NHÁNH: NPC phản hồi riêng theo từng lựa chọn. */
function BranchChatRoom({ scenario, onExit }) {
  const { recordQuiz } = useProgress()
  const [nodeId, setNodeId] = useState(scenario.start)
  const [messages, setMessages] = useState(() => [{ from: 'npc', ...scenario.nodes[scenario.start].npc }])
  const [tones, setTones] = useState([]) // smooth/ok/awkward theo từng lượt chọn
  const [busy, setBusy] = useState(false) // đang chờ NPC "gõ phím"
  const [done, setDone] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const [showVi, setShowVi] = useState(false)
  const bottomRef = useRef(null)

  const node = scenario.nodes[nodeId]

  // Điểm EQ giao tiếp: smooth = 2, ok = 1, awkward = 0.
  const eq = useMemo(() => {
    if (tones.length === 0) return 100
    const score = tones.reduce((s, t) => s + (t === 'smooth' ? 2 : t === 'ok' ? 1 : 0), 0)
    return Math.round((score / (tones.length * 2)) * 100)
  }, [tones])

  useEffect(() => {
    if (isSpeechSupported()) speakChinese(scenario.nodes[scenario.start].npc.t)
  }, [scenario])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, done])

  // Ghi kết quả khi kết thúc.
  useEffect(() => {
    if (done && !recorded) {
      const smooth = tones.filter((t) => t === 'smooth').length
      const ok = tones.filter((t) => t === 'ok').length
      recordQuiz(`chat-${scenario.id}`, eq, smooth * 5 + ok * 2)
      setRecorded(true)
    }
  }, [done, recorded, tones, eq, scenario.id, recordQuiz])

  function pick(choice) {
    if (busy || done) return
    setBusy(true)
    setTones((t) => [...t, choice.tone])
    setMessages((m) => [...m, { from: 'me', t: choice.t, p: choice.p, v: choice.v }])
    // NPC phản hồi RIÊNG cho lựa chọn này...
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'npc', ...choice.reply }])
      if (isSpeechSupported()) speakChinese(choice.reply.t)
      const nextNode = scenario.nodes[choice.next]
      if (!nextNode) {
        setDone(true)
        return
      }
      // ...rồi nói tiếp câu của bước kế (hoặc câu chào kết).
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'npc', ...nextNode.npc }])
        if (isSpeechSupported()) speakChinese(nextNode.npc.t)
        if (nextNode.end) {
          setDone(true)
        } else {
          setNodeId(choice.next)
          setBusy(false)
        }
      }, 1100)
    }, 450)
  }

  const rank = eq >= 85 ? { emoji: '🏆', title: 'Thánh giao tiếp!' } : eq >= 60 ? { emoji: '😎', title: 'Ổn áp phết!' } : { emoji: '🧂', title: 'Hơi mặn nhưng vui!' }

  return (
    <div className="flex flex-col gap-4">
      <Confetti fire={done && eq >= 60} />
      <div className="flex items-center justify-between gap-2">
        <button onClick={onExit} className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Tình huống khác
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVi((v) => !v)}
            className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
              showVi ? 'bg-gradient-genz text-white shadow' : 'bg-white text-slate-500 ring-1 ring-slate-200'
            }`}
          >
            {showVi ? '👁️ Vietsub: BẬT' : '🙈 Vietsub: ẨN'}
          </button>
          <span className="badge-chip bg-emerald-100 text-emerald-700">🌿 {scenario.emoji} Lượt {tones.length + (done ? 0 : 1)}</span>
        </div>
      </div>

      <div className="card flex max-h-[26rem] flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
        <div className="text-center text-xs font-bold text-slate-400">
          {scenario.npcAvatar} {scenario.npcName} · hội thoại tự nhiên - chọn gì cũng đi tiếp!
        </div>
        {messages.map((m, i) => (
          <Bubble key={i} m={m} avatar={scenario.npcAvatar} showVi={showVi} />
        ))}
        {done && (
          <div className="mt-1 self-center rounded-2xl bg-white px-5 py-3 text-center shadow animate-pop-in">
            <div className="text-3xl">{rank.emoji}</div>
            <div className="font-black text-slate-800">{rank.title}</div>
            <div className="text-sm font-bold text-brand-600">EQ giao tiếp: {eq}%</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!done ? (
        <div className="flex flex-col gap-2">
          <p className="text-center text-xs font-bold text-slate-400">
            {busy ? `${scenario.npcAvatar} đang gõ phím…` : 'Đọc chữ + nghe 🔊 rồi chọn câu trả lời của BẠN 👇'}
          </p>
          {!busy &&
            node.choices.map((c, idx) => (
              <button
                key={idx}
                onClick={() => pick(c)}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left ring-1 ring-slate-100 transition hover:scale-[1.01] hover:bg-brand-50 active:scale-95"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-hanzi text-lg font-bold text-slate-800">{c.t}</div>
                  <div className="text-xs font-semibold text-brand-600">{c.p}</div>
                  <div className="text-xs text-slate-400">
                    <ViText text={c.v} show={showVi} />
                  </div>
                </div>
                {isSpeechSupported() && (
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      speakChinese(c.t)
                    }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm text-slate-600 transition hover:scale-110 hover:bg-brand-100 hover:text-brand-600 active:scale-95"
                    aria-label={`Nghe ${c.t}`}
                  >
                    🔊
                  </span>
                )}
              </button>
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button onClick={() => window.location.reload()} className="btn-primary">
            🔁 Chơi lại - thử nhánh khác xem sao!
          </button>
          <button onClick={onExit} className="btn-ghost">💬 Tình huống khác</button>
        </div>
      )}
    </div>
  )
}

/** Phòng chat của một kịch bản. */
function ChatRoom({ scenario, onExit }) {
  const { showToast } = useToast()
  const { recordQuiz } = useProgress()
  const [stepIdx, setStepIdx] = useState(0)
  const [messages, setMessages] = useState(() => [{ from: 'npc', ...scenario.steps[0].npc }])
  const [wrongPicks, setWrongPicks] = useState([])
  const [firstTryFails, setFirstTryFails] = useState(0)
  const [done, setDone] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const [showVi, setShowVi] = useState(false) // công tắc vietsub toàn cục (mặc định ẨN)
  const bottomRef = useRef(null)

  const step = scenario.steps[stepIdx]
  const finished = done

  // Tự đọc câu mở đầu của NPC (sau cú bấm chọn kịch bản nên trình duyệt cho phép).
  useEffect(() => {
    if (isSpeechSupported()) speakChinese(scenario.steps[0].npc.t)
  }, [scenario])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, finished])

  function pick(choice, idx) {
    if (finished) return
    if (!choice.ok) {
      if (wrongPicks.length === 0) setFirstTryFails((n) => n + 1)
      setWrongPicks((w) => [...w, idx])
      showToast(choice.why || 'Chưa đúng, thử câu khác nhé!', { emoji: '🤭', type: 'info', duration: 4500 })
      return
    }
    const next = stepIdx + 1
    setMessages((m) => [...m, { from: 'me', ...choice }])
    setWrongPicks([])
    if (next < scenario.steps.length) {
      // NPC nhắn câu kế + tự phát âm để luyện nghe.
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'npc', ...scenario.steps[next].npc }])
        if (isSpeechSupported()) speakChinese(scenario.steps[next].npc.t)
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
      <div className="flex items-center justify-between gap-2">
        <button onClick={onExit} className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Tình huống khác
        </button>
        <div className="flex items-center gap-2">
          {/* Công tắc vietsub toàn cục */}
          <button
            onClick={() => setShowVi((v) => !v)}
            className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
              showVi ? 'bg-gradient-genz text-white shadow' : 'bg-white text-slate-500 ring-1 ring-slate-200'
            }`}
            title="Bật/tắt toàn bộ vietsub"
          >
            {showVi ? '👁️ Vietsub: BẬT' : '🙈 Vietsub: ẨN'}
          </button>
          <span className="badge-chip bg-brand-100 text-brand-700">
            {scenario.emoji} {Math.min(stepIdx + 1, total)}/{total}
          </span>
        </div>
      </div>

      {/* Khung chat */}
      <div className="card flex max-h-[26rem] flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
        <div className="text-center text-xs font-bold text-slate-400">
          {scenario.npcAvatar} {scenario.npcName} · bấm dòng mờ để xem nghĩa
        </div>
        {messages.map((m, i) =>
          m.from === 'npc' ? (
            <div key={i} className="flex items-end gap-2 self-start animate-pop-in">
              <span className="text-2xl">{scenario.npcAvatar}</span>
              <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-hanzi text-lg font-bold text-slate-800">{m.t}</span>
                  {isSpeechSupported() && (
                    <button
                      onClick={() => speakChinese(m.t)}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-xs text-brand-600 transition hover:scale-110 active:scale-95"
                      aria-label="Nghe lại"
                    >
                      🔊
                    </button>
                  )}
                </div>
                <div className="text-xs font-semibold text-brand-600">{m.p}</div>
                <div className="mt-0.5 text-xs text-slate-500">
                  <ViText text={m.v} show={showVi} />
                </div>
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="max-w-[78%] self-end rounded-2xl rounded-br-sm bg-gradient-genz p-3 text-white shadow animate-pop-in"
            >
              <div className="flex items-center gap-2">
                <span className="font-hanzi text-lg font-bold">{m.t}</span>
                {isSpeechSupported() && (
                  <button
                    onClick={() => speakChinese(m.t)}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-xs transition hover:scale-110 active:scale-95"
                    aria-label="Nghe lại"
                  >
                    🔊
                  </button>
                )}
              </div>
              <div className="text-xs text-white/85">{m.p}</div>
            </div>
          ),
        )}
        {finished && (
          <div className="mt-1 self-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700 animate-pop-in">
            🎉 Hoàn thành! Đúng ngay lần đầu: {percent}% (+{(total - firstTryFails) * 5} 💎)
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Khu chọn câu đáp: chỉ chữ Hán + pinyin + nút nghe; vietsub mờ */}
      {!finished ? (
        <div className="flex flex-col gap-2">
          <p className="text-center text-xs font-bold text-slate-400">
            Đọc chữ + nghe 🔊 rồi chọn câu đáp của bạn 👇
          </p>
          {step.choices.map((c, idx) => {
            const wrong = wrongPicks.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => pick(c, idx)}
                disabled={wrong}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  wrong
                    ? 'bg-rose-50 text-slate-300 ring-1 ring-rose-100'
                    : 'bg-white ring-1 ring-slate-100 hover:scale-[1.01] hover:bg-brand-50 active:scale-95'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className={`font-hanzi text-lg font-bold ${wrong ? 'line-through' : 'text-slate-800'}`}>
                    {c.t}
                  </div>
                  <div className={`text-xs font-semibold ${wrong ? '' : 'text-brand-600'}`}>{c.p}</div>
                  <div className="text-xs text-slate-400">
                    <ViText text={c.v} show={showVi} />
                  </div>
                </div>
                {isSpeechSupported() && !wrong && (
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      speakChinese(c.t)
                    }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-sm text-slate-600 transition hover:scale-110 hover:bg-brand-100 hover:text-brand-600 active:scale-95"
                    aria-label={`Nghe ${c.t}`}
                  >
                    🔊
                  </span>
                )}
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
