import { useEffect, useRef, useState } from 'react'
import HanziWriter from 'hanzi-writer'

/**
 * Hoạt hình thứ tự nét chữ Hán dùng thư viện hanzi-writer.
 * Dữ liệu nét được tải tự động từ CDN của hanzi-writer (cần internet).
 *
 * @param {Object} props
 * @param {string} props.character - Chữ Hán cần vẽ
 * @param {number} [props.size=220] - Kích thước khung (px)
 */
export default function StrokeAnimation({ character, size = 220 }) {
  const containerRef = useRef(null)
  const writerRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    if (!containerRef.current) return
    // Xoá nội dung cũ khi đổi chữ.
    containerRef.current.innerHTML = ''
    setStatus('loading')

    let cancelled = false
    const writer = HanziWriter.create(containerRef.current, character, {
      width: size,
      height: size,
      padding: 8,
      showOutline: true,
      strokeColor: '#7c3aed',
      radicalColor: '#ec4899',
      outlineColor: '#e5e7eb',
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 220,
      charDataLoader: (char, onComplete) => {
        HanziWriter.loadCharacterData(char)
          .then((data) => {
            if (!cancelled) {
              setStatus('ready')
              onComplete(data)
            }
          })
          .catch(() => {
            if (!cancelled) setStatus('error')
          })
      },
    })
    writerRef.current = writer
    // Tự chạy hoạt hình lần đầu.
    writer.animateCharacter()

    return () => {
      cancelled = true
    }
  }, [character, size])

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-3xl bg-white ring-1 ring-slate-100"
        style={{ width: size, height: size }}
      >
        {/* Lưới ô mễ (米字格) làm nền chuẩn tập viết */}
        <MiGrid size={size} />
        <div ref={containerRef} className="absolute inset-0" />
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Đang tải nét chữ…
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-slate-400">
            Chưa có dữ liệu nét cho chữ này 😅
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          className="btn-ghost text-sm"
          onClick={() => writerRef.current?.animateCharacter()}
        >
          ▶️ Xem lại
        </button>
        <button
          className="btn-ghost text-sm"
          onClick={() => {
            writerRef.current?.quiz({
              onComplete: () => {},
            })
          }}
        >
          ✍️ Tập viết
        </button>
      </div>
    </div>
  )
}

/** Lưới ô mễ tự (米字格) vẽ bằng SVG làm nền. */
function MiGrid({ size }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <rect x="1" y="1" width={size - 2} height={size - 2} rx="20" fill="none" stroke="#f1f5f9" />
      <line x1="0" y1={size / 2} x2={size} y2={size / 2} stroke="#f1f5f9" strokeDasharray="6 6" />
      <line x1={size / 2} y1="0" x2={size / 2} y2={size} stroke="#f1f5f9" strokeDasharray="6 6" />
      <line x1="0" y1="0" x2={size} y2={size} stroke="#f8fafc" strokeDasharray="6 6" />
      <line x1={size} y1="0" x2="0" y2={size} stroke="#f8fafc" strokeDasharray="6 6" />
    </svg>
  )
}
