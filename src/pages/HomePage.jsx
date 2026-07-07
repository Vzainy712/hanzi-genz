import { Link } from 'react-router-dom'
import { useProgress, DAILY_QUESTS } from '../context/ProgressContext.jsx'
import { hskData } from '../data/hskData.js'
import { vocabLessonGroups, VOCAB_LEVEL_COLORS } from '../data/vocabLessons.js'

/** Trang chủ - dashboard tổng quan, lời chào và lối tắt vào bài học. */
export default function HomePage() {
  const { points, streak, learnedIds, totalCharacters, earnedBadges, dueWords, questsToday, claimQuest } =
    useProgress()
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

      {/* SRS: từ đến hạn ôn hôm nay */}
      {dueWords.length > 0 && (
        <Link
          to="/review"
          className="flex items-center gap-4 rounded-3xl bg-gradient-cool p-5 text-white shadow-lg transition hover:scale-[1.02] animate-pop-in"
        >
          <div className="text-4xl animate-float">🧠</div>
          <div className="min-w-0 flex-1">
            <div className="font-black">Hôm nay cần ôn {dueWords.length} từ</div>
            <p className="text-sm text-white/85">Ôn đúng lúc sắp quên = nhớ trọn đời. Quẹt nhanh 2 phút thôi!</p>
          </div>
          <span className="rounded-2xl bg-white/20 px-4 py-2 font-black">Ôn ngay →</span>
        </Link>
      )}

      {/* Nhiệm vụ hằng ngày */}
      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-slate-800">🎯 Nhiệm vụ hôm nay</h2>
          <span className="badge-chip bg-brand-100 text-brand-700">
            {questsToday.claimed.length}/{DAILY_QUESTS.length} xong
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {DAILY_QUESTS.map((quest) => {
            const progress = Math.min(questsToday[quest.field], quest.target)
            const complete = progress >= quest.target
            const claimed = questsToday.claimed.includes(quest.id)
            return (
              <div key={quest.id} className="flex items-center gap-3">
                <span className="text-2xl">{quest.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{quest.label}</span>
                    <span className={complete ? 'text-emerald-600' : 'text-slate-400'}>
                      {progress}/{quest.target}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${complete ? 'bg-emerald-400' : 'bg-gradient-genz'}`}
                      style={{ width: `${(progress / quest.target) * 100}%` }}
                    />
                  </div>
                </div>
                {claimed ? (
                  <span className="badge-chip bg-emerald-100 text-emerald-700">✅ Đã nhận</span>
                ) : complete ? (
                  <button
                    onClick={() => claimQuest(quest.id)}
                    className="rounded-xl bg-gradient-genz px-3 py-1.5 text-xs font-black text-white shadow transition hover:scale-105 active:scale-95 animate-wiggle"
                  >
                    Nhận +{quest.reward}💎
                  </button>
                ) : (
                  <span className="text-xs font-bold text-slate-300">+{quest.reward}💎</span>
                )}
              </div>
            )
          })}
        </div>
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

      {/* Danh sách cấp độ - gộp bài chọn lọc + giáo trình từ vựng chuẩn */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold text-slate-800">Chọn cấp độ HSK</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3].map((lvl) => {
            const curated = hskData.find((l) => l.level === lvl)
            const group = vocabLessonGroups.find((g) => g.level === lvl)
            // Gộp không trùng lặp: chữ trong bài chọn lọc + từ trong giáo trình chuẩn.
            const wordSet = new Set([
              ...(curated ? curated.lessons.flatMap((l) => l.characters.map((c) => c.hanzi)) : []),
              ...(group ? group.lessons.flatMap((l) => l.words.map((w) => w.hanzi)) : []),
            ])
            const lessonCount = (curated?.lessons.length || 0) + (group?.lessons.length || 0)
            const done = [...wordSet].filter((h) => learnedIds.includes(h)).length
            const percent = wordSet.size ? Math.round((done / wordSet.size) * 100) : 0
            return (
              <Link
                key={lvl}
                to="/lessons"
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${VOCAB_LEVEL_COLORS[lvl]} p-5 text-white shadow-lg transition hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black">HSK {lvl}</div>
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-black">
                    {percent}%
                  </span>
                </div>
                <div className="mt-1 text-sm text-white/90">
                  {lessonCount} bài học · {wordSet.size} từ (đủ giáo trình ✓)
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/25">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="mt-2 text-sm font-bold text-white/95">Đã học: {done}/{wordSet.size}</div>
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
