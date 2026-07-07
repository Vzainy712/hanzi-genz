import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVocabLessonById } from '../data/vocabLessons.js'
import WordCard from '../components/WordCard.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { speakChinese, isSpeechSupported } from '../utils/speech.js'

const TYPE_BADGES = {
  lyric: { label: '🎵 Lyrics', cls: 'bg-pink-100 text-pink-700' },
  trend: { label: '🔥 Trending', cls: 'bg-orange-100 text-orange-700' },
  daily: { label: '💬 Câu cửa miệng', cls: 'bg-cyan-100 text-cyan-700' },
}

/** Trang chi tiết một bài học từ vựng chuẩn HSK (sinh tự động từ kho đầy đủ). */
export default function VocabLessonDetailPage() {
  const { lessonId } = useParams()
  const lesson = getVocabLessonById(lessonId)
  const [index, setIndex] = useState(0)
  const { learnedIds } = useProgress()

  if (!lesson) {
    return (
      <div className="card text-center">
        <p className="text-slate-600">Không tìm thấy bài học này 😅</p>
        <Link to="/lessons" className="btn-primary mt-4">← Về danh sách bài học</Link>
      </div>
    )
  }

  const words = lesson.words
  const current = words[index]
  const doneCount = words.filter((w) => learnedIds.includes(w.hanzi)).length

  return (
    <div className="flex flex-col gap-5">
      {/* Đầu trang */}
      <div className="flex items-center justify-between gap-3">
        <Link to="/lessons" className="text-sm font-bold text-slate-400 hover:text-brand-600">
          ← Bài học
        </Link>
        <Link to={`/vocab-quiz/${lesson.id}`} className="btn-ghost text-sm">
          🎯 Làm Quiz
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-2 text-sm font-bold text-brand-600">
          <span>HSK {lesson.level}</span>·
          <span>Bài {lesson.index}/{lesson.totalInLevel}</span>·
          <span>{doneCount}/{words.length} đã học</span>
        </div>
        <h1 className="text-2xl font-black text-slate-800">
          {lesson.emoji} HSK {lesson.level} · {lesson.title}
        </h1>
      </div>

      {/* Chấm tiến độ từng từ trong bài */}
      <div className="flex flex-wrap gap-2">
        {words.map((w, i) => {
          const learned = learnedIds.includes(w.hanzi)
          const active = i === index
          return (
            <button
              key={w.hanzi}
              onClick={() => setIndex(i)}
              className={`font-hanzi grid min-w-10 place-items-center rounded-xl px-2 py-1.5 text-base font-bold transition ${
                active
                  ? 'scale-110 bg-gradient-genz text-white shadow-lg'
                  : learned
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white text-slate-600 ring-1 ring-slate-100 hover:bg-slate-50'
              }`}
              title={w.pinyin}
            >
              {w.hanzi}
            </button>
          )
        })}
      </div>

      {/* Thẻ từ hiện tại */}
      <WordCard key={current.hanzi} word={current} />

      {/* Điều hướng trước/sau trong bài */}
      <div className="flex items-center justify-between gap-3">
        <button
          className="btn-ghost disabled:opacity-40"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          ← Từ trước
        </button>
        <span className="text-sm font-bold text-slate-400">{index + 1} / {words.length}</span>
        {index < words.length - 1 ? (
          <button className="btn-primary" onClick={() => setIndex((i) => i + 1)}>
            Từ tiếp →
          </button>
        ) : (
          <Link to={`/vocab-quiz/${lesson.id}`} className="btn-primary">
            Làm Quiz 🎯
          </Link>
        )}
      </div>

      {/* Học hết chủ đề -> mở khoá Boss */}
      {doneCount === words.length && (
        <Link
          to={`/boss/${lesson.id}`}
          className="flex items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 font-black text-white shadow-xl transition hover:scale-[1.02] active:scale-95 animate-pop-in"
        >
          ⚔️ Thách đấu Boss chương này!
        </Link>
      )}

      {/* Câu trending liên quan - học từ trong ngữ cảnh thật */}
      {lesson.sentences.length > 0 && (
        <section className="rounded-3xl bg-gradient-to-br from-slate-50 to-brand-50 p-5 ring-1 ring-brand-100">
          <h2 className="font-extrabold text-slate-800">🎤 Câu trending cho bài này</h2>
          <p className="text-xs text-slate-500">Học từ qua meme & lyrics cho đỡ chán nè!</p>
          <div className="mt-3 flex flex-col gap-3">
            {lesson.sentences.map((s) => {
              const badge = TYPE_BADGES[s.type]
              return (
                <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className={`badge-chip ${badge.cls}`}>{badge.label}</span>
                      <div className="mt-2 font-hanzi text-xl font-bold text-slate-800">{s.hanzi}</div>
                      <div className="text-sm font-semibold text-brand-600">{s.pinyin}</div>
                      <div className="text-sm text-slate-600">{s.vi}</div>
                      <div className="mt-1 text-xs italic text-slate-400">{s.note}</div>
                    </div>
                    {isSpeechSupported() && (
                      <button
                        onClick={() => speakChinese(s.hanzi)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600 transition hover:scale-110 active:scale-95"
                        aria-label={`Nghe câu ${s.hanzi}`}
                      >
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <Link to="/trending" className="mt-3 inline-block text-sm font-bold text-brand-600 hover:underline">
            Xem tất cả câu trending →
          </Link>
        </section>
      )}

      {/* Điều hướng giữa các bài */}
      <div className="flex items-center justify-between gap-3 pb-2">
        {lesson.prevId ? (
          <Link to={`/vocab/${lesson.prevId}`} onClick={() => setIndex(0)} className="btn-ghost text-sm">
            ← Bài trước
          </Link>
        ) : <span />}
        {lesson.nextId ? (
          <Link to={`/vocab/${lesson.nextId}`} onClick={() => setIndex(0)} className="btn-ghost text-sm">
            Bài sau →
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}
