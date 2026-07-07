import { Link } from 'react-router-dom'

/** Các chế độ luyện tập / khám phá trong app. */
const modes = [
  {
    to: '/flashcards',
    emoji: '🃏',
    title: 'Flashcard nhớ mặt chữ',
    desc: 'Lật thẻ, tự kiểm tra trí nhớ chữ Hán',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    to: '/listening',
    emoji: '🎧',
    title: 'Luyện nghe câu',
    desc: 'Nghe câu tiếng Trung, chọn nghĩa đúng',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    to: '/pronunciation',
    emoji: '🗣️',
    title: 'Luyện phát âm',
    desc: '4 thanh điệu + trò chơi đoán thanh',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    to: '/grammar',
    emoji: '🔤',
    title: 'Ngữ pháp & Câu',
    desc: 'Mẫu câu HSK để tự đặt câu',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    to: '/radicals',
    emoji: '🧩',
    title: 'Bộ thủ',
    desc: 'Học các bộ chữ gốc, đoán nghĩa nhanh',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    to: '/trending',
    emoji: '🎤',
    title: 'Câu trending & Lyrics',
    desc: 'Meme, câu cửa miệng, lời bài hát hot',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    to: '/sentence-game',
    emoji: '🧱',
    title: 'Xếp câu',
    desc: 'Ghép mảnh từ thành câu đúng thứ tự',
    gradient: 'from-lime-500 to-emerald-500',
  },
  {
    to: '/dictionary',
    emoji: '📖',
    title: 'Từ điển HSK',
    desc: 'Tra cứu trọn bộ ~5000 từ HSK 1-6',
    gradient: 'from-slate-600 to-slate-800',
  },
]

/** Trang trung tâm luyện tập - lối vào mọi chế độ học. */
export default function PracticePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">🎯 Luyện tập</h1>
        <p className="text-slate-500">Chọn một chế độ để luyện tập theo cách bạn thích.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {modes.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-100 transition hover:scale-[1.02] hover:shadow-xl"
          >
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${m.gradient} text-3xl shadow`}
            >
              {m.emoji}
            </div>
            <h3 className="mt-3 font-extrabold text-slate-800">{m.title}</h3>
            <p className="text-sm text-slate-500">{m.desc}</p>
            <span className="absolute right-5 top-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500">
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl bg-brand-50 p-4 text-center text-sm text-brand-700">
        💡 Mẹo: mỗi bài học đều có nút <b>Quiz</b> riêng để kiểm tra ngay sau khi học.
      </div>
    </div>
  )
}
