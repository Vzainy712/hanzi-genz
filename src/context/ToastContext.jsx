import { createContext, useContext, useCallback, useState } from 'react'

/**
 * Hệ thống thông báo nổi (toast) để phản hồi/động viên người dùng.
 * Dùng showToast(message, options) ở bất cứ đâu trong app.
 */

const ToastContext = createContext(null)

let idCounter = 0

/** Câu động viên ngẫu nhiên - làm việc học vui hơn. */
export const ENCOURAGEMENTS = [
  'Làm tốt lắm! 💪',
  'Cứ đà này nhé! 🔥',
  'Bạn học nhanh thật đấy! ⚡',
  'Tuyệt vời ông mặt trời! ☀️',
  'Thêm một chữ, thêm một bước! 🚀',
  'Não bạn đang lớn lên đấy! 🧠',
  'Xịn sò! Tiếp tục nào! ✨',
  'Đỉnh của chóp! 🏔️',
]

/** Lấy một câu động viên ngẫu nhiên. */
export function randomEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, { emoji = '🎉', type = 'success', duration = 2800 } = {}) => {
      const id = ++idCounter
      setToasts((list) => [...list, { id, message, emoji, type }])
      setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Khu vực hiển thị toast - trên cùng, giữa màn hình */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => dismiss(t.id)}
            className={`pointer-events-auto flex max-w-sm animate-pop-in cursor-pointer items-center gap-3 rounded-2xl px-5 py-3 font-bold text-white shadow-xl ${
              t.type === 'badge'
                ? 'bg-gradient-genz'
                : t.type === 'info'
                  ? 'bg-slate-800'
                  : 'bg-emerald-500'
            }`}
          >
            <span className="text-2xl">{t.emoji}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** Hook truy cập hệ thống toast. */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast phải nằm trong <ToastProvider>')
  return ctx
}
