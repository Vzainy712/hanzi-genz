import { useProgress, BADGES } from '../context/ProgressContext.jsx'
import { hskData } from '../data/hskData.js'

/** Trang theo dõi tiến độ: chỉ số, huy hiệu, tiến độ từng cấp độ. */
export default function ProgressPage() {
  const { points, streak, learnedIds, totalCharacters, earnedBadges, resetProgress } = useProgress()
  const earnedIds = new Set(earnedBadges.map((b) => b.id))
  const percent = Math.round((learnedIds.length / totalCharacters) * 100)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">📊 Tiến độ của bạn</h1>
        <p className="text-slate-500">Theo dõi hành trình chinh phục chữ Hán.</p>
      </div>

      {/* Chỉ số tổng */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat emoji="💎" value={points} label="Điểm" />
        <Stat emoji="🔥" value={streak} label="Chuỗi ngày" />
        <Stat emoji="📖" value={`${learnedIds.length}/${totalCharacters}`} label="Chữ đã học" />
        <Stat emoji="🏅" value={`${earnedBadges.length}/${BADGES.length}`} label="Huy hiệu" />
      </section>

      {/* Tiến độ từng cấp độ */}
      <section className="card">
        <h2 className="mb-3 font-extrabold text-slate-800">Tiến độ theo cấp độ</h2>
        <div className="flex flex-col gap-4">
          {hskData.map((level) => {
            const all = level.lessons.flatMap((l) => l.characters)
            const done = all.filter((c) => learnedIds.includes(c.hanzi)).length
            const p = Math.round((done / all.length) * 100)
            return (
              <div key={level.level}>
                <div className="mb-1 flex justify-between text-sm font-bold">
                  <span className="text-slate-700">{level.label}</span>
                  <span className="text-brand-600">{done}/{all.length}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${level.color} transition-all duration-500`}
                    style={{ width: `${p}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-center text-sm font-bold text-slate-400">
          Tổng: {percent}% dữ liệu mẫu 🎯
        </p>
      </section>

      {/* Bộ sưu tập huy hiệu */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-slate-800">🏅 Bộ sưu tập huy hiệu</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BADGES.map((badge) => {
            const earned = earnedIds.has(badge.id)
            return (
              <div
                key={badge.id}
                className={`card items-center p-4 text-center transition ${
                  earned ? 'ring-2 ring-brand-200' : 'opacity-60 grayscale'
                }`}
              >
                <div className={`text-4xl ${earned ? 'animate-wiggle' : ''}`}>{badge.emoji}</div>
                <div className="mt-2 font-extrabold text-slate-800">{badge.name}</div>
                <div className="text-xs text-slate-500">{badge.desc}</div>
                {earned && (
                  <span className="badge-chip mt-2 bg-emerald-100 text-emerald-700">Đã mở khoá</span>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Đặt lại tiến độ */}
      <section className="card">
        <h2 className="font-extrabold text-slate-800">⚙️ Cài đặt</h2>
        <p className="mt-1 text-sm text-slate-500">
          Xoá toàn bộ tiến độ và bắt đầu lại từ đầu. Hành động này không thể hoàn tác.
        </p>
        <button
          onClick={() => {
            if (window.confirm('Bạn chắc chắn muốn xoá toàn bộ tiến độ?')) resetProgress()
          }}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-100 px-5 py-2.5 font-bold text-rose-600 transition hover:bg-rose-200 active:scale-95"
        >
          🗑️ Đặt lại tiến độ
        </button>
      </section>
    </div>
  )
}

function Stat({ emoji, value, label }) {
  return (
    <div className="card items-center p-4 text-center">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-xl font-black text-slate-800">{value}</div>
      <div className="text-xs font-semibold text-slate-400">{label}</div>
    </div>
  )
}
