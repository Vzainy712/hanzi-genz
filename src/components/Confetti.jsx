import { useEffect, useState } from 'react'

/**
 * Hiệu ứng pháo giấy chúc mừng (không cần thư viện ngoài).
 * Tự biến mất sau khoảng 2.5 giây.
 *
 * @param {Object} props
 * @param {boolean} props.fire - Kích hoạt bắn pháo
 */
export default function Confetti({ fire }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!fire) return
    const colors = ['#8b5cf6', '#ec4899', '#f97316', '#22d3ee', '#a3e635', '#f59e0b']
    const next = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.8 + Math.random() * 1.2,
      color: colors[i % colors.length],
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }))
    setPieces(next)
    const t = setTimeout(() => setPieces([]), 2800)
    return () => clearTimeout(t)
  }, [fire])

  if (pieces.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.9; }
        }
      `}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  )
}
