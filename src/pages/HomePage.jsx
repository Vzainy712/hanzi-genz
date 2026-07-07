import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { hskData } from '../data/hskData.js'

/** Trang chủ - dashboard tổng quan, lời chào và lối tắt vào bài học. */
export default function HomePage() {
  const { points, streak, learnedIds, totalCharacters, earnedBadges } = useProgress()
  const progressPercent = Math.round((learnedIds.length / totalCharacters) * 100)

  return (
    <div className="flex flex-col gap-6">
      {/* Banner chào mừng */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-genz p-7 text-white shadow-xl shadow-brand-500/30">
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-white/80">
            你好 · Xin chào
          </p>
          <h1 className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
            Học tiếng Trung <br /> theo cách của GenZ 🚀
          </h1>
          <p className="mt-2 max-w-md text-white/90">
            Luyện chữ Hán HSK qua thẻ tương tác, thứ tự nét, phát âm và quiz vui nhộn.
          </p>
          <Link to="/lessons" className="mt-4 inline-flex bg-white text-brand-600 btn-primary">
            Bắt đầu học ngay →
          </Link>
        </div>
        {/* Chữ Hán trang trí mờ phía sau */}
        <div className="pointer-events-none absolute -right-4 -top-6 font-hanzi text-[10rem] font-bold text-white/10 animate-float">
          字
        </div>
      </section>

      {/* Thẻ chỉ số nhanh */}
      <section className="grid grid-cols-3 gap-3">
        <StatCard emoji="🔥" value={streak} label="Ngày liên tiếp" color="text-amber-500" />
        <StatCard emoji="💎" value={points} label="Tổng điểm" color="text-brand-600" />
        <StatCard emoji="🏅" value={earnedBadges.length} label="Huy hiệu" color="text-accent-pink" />
      </section>

      {/* Thanh tiến độ tổng */}
      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-slate-800">Tiến độ tổng thể</h2>
          <span className="text-sm font-bold text-brand-600">
            {learnedIds.length}/{totalCharacters} chữ
          </span>
        </div>
        <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-genz transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {progressPercent === 0
            ? 'Cùng học chữ đầu tiên nào! 🌱'
            : `Bạn đã hoàn thành ${progressPercent}% dữ liệu mẫu. Cố lên! 💪`}
        </p>
      </section>

      {/* Lối tắt tới các module mới */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-slate-800">Khám phá thêm</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/flashcards"
            className="card group flex items-center gap-4 transition hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-genz text-3xl">
              🃏
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-800">Flashcard nhớ chữ</h3>
              <p className="text-sm text-slate-500">Lật thẻ, tự kiểm tra trí nhớ</p>
            </div>
          </Link>
          <Link
            to="/dictionary"
            className="card group flex items-center gap-4 transition hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-cool text-3xl">
              📖
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-800">Từ điển HSK</h3>
              <p className="text-sm text-slate-500">Tra cứu trọn bộ ~5000 từ HSK 1-6</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Danh sách cấp độ */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-slate-800">Chọn cấp độ HSK</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {hskData.map((level) => {
            const total = level.lessons.reduce((s, l) => s + l.characters.length, 0)
            const done = level.lessons
              .flatMap((l) => l.characters)
              .filter((c) => learnedIds.includes(c.hanzi)).length
            return (
              <Link
                key={level.level}
                to="/lessons"
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${level.color} p-5 text-white shadow-lg transition hover:scale-[1.02]`}
              >
                <div className="text-2xl font-black">{level.label}</div>
                <div className="mt-1 text-sm text-white/90">{level.lessons.length} bài học · {total} chữ</div>
                <div className="mt-3 text-sm font-bold text-white/95">Đã học: {done}/{total}</div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function StatCard({ emoji, value, label, color }) {
  return (
    <div className="card items-center p-4 text-center">
      <div className="text-2xl">{emoji}</div>
      <div className={`mt-1 text-2xl font-black ${color}`}>{value}</div>
      <div className="text-xs font-semibold text-slate-400">{label}</div>
    </div>
  )
}
