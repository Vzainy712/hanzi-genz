import { NavLink } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'

/** Thanh điều hướng chính (trên cùng ở desktop, dưới cùng ở mobile). */
export default function Navbar() {
  const { points, streak } = useProgress()

  const links = [
    { to: '/', label: 'Trang chủ', icon: '🏠', end: true },
    { to: '/lessons', label: 'Bài học', icon: '📚' },
    { to: '/practice', label: 'Luyện tập', icon: '🎯' },
    { to: '/progress', label: 'Tiến độ', icon: '📊' },
  ]

  return (
    <>
      {/* Thanh trên - logo + điểm/streak */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-genz font-hanzi text-lg font-bold text-white">
              字
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-800">
              HanZi<span className="text-brand-600">GenZ</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-2">
            <span className="badge-chip bg-amber-100 text-amber-700" title="Chuỗi ngày học liên tiếp">
              🔥 {streak}
            </span>
            <span className="badge-chip bg-brand-100 text-brand-700" title="Tổng điểm">
              💎 {points}
            </span>
          </div>
        </div>

        {/* Menu ngang - chỉ hiện ở desktop/tablet */}
        <nav className="mx-auto hidden max-w-5xl gap-1 px-4 pb-2 sm:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-bold transition ${
                  isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-500 hover:bg-slate-100'
                }`
              }
            >
              {l.icon} {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Menu dưới - chỉ hiện ở mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-slate-100 bg-white/90 backdrop-blur sm:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-bold transition ${
                isActive ? 'text-brand-600' : 'text-slate-400'
              }`
            }
          >
            <span className="text-lg">{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
