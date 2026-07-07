/**
 * Bộ nạp & tra cứu từ vựng HSK đầy đủ (nhập từ dữ liệu mở, ~4991 từ HSK 1-6).
 * Gộp 3 nguồn nghĩa tiếng Việt theo thứ tự ưu tiên:
 *   1. viOverlay (biên soạn tay - chuẩn nhất)
 *   2. dữ liệu curated trong hskData (các bài học đã làm kỹ)
 *   3. (không có) -> hiển thị nghĩa tiếng Anh gốc
 */

import rawVocab from './hskFullVocab.json'
import { viOverlay as viOverlayL1 } from './viOverlay.js'
import { viOverlayL2 } from './viOverlayL2.js'
import { viOverlayL3 } from './viOverlayL3.js'
import { getAllCharacters } from './hskData.js'

// Gộp các lớp phủ tiếng Việt theo cấp (L1 -> L3).
const viOverlay = { ...viOverlayL1, ...viOverlayL2, ...viOverlayL3 }

// Bản đồ nghĩa tiếng Việt lấy từ dữ liệu curated (chữ Hán -> nghĩa).
const curatedVi = {}
for (const c of getAllCharacters()) {
  if (!curatedVi[c.hanzi]) curatedVi[c.hanzi] = c.meaning
}

/**
 * Danh sách từ đã chuẩn hoá, mỗi từ gồm:
 * { hanzi, pinyin, english, vietnamese|null, radical, level, tone }
 */
export const fullVocab = rawVocab.map((x) => {
  const ov = viOverlay[x.w] || {}
  return {
    hanzi: x.w,
    pinyin: ov.p || x.p,
    english: ov.en || x.e,
    vietnamese: ov.vi || curatedVi[x.w] || null,
    radical: x.r,
    level: x.l,
    tone: ov.t != null ? ov.t : x.t,
  }
})

/** Tổng số từ. */
export const totalVocabCount = fullVocab.length

/** Tổng số "đơn vị học được" (chữ curated + từ vựng HSK 1-3) - dùng cho tiến độ. */
export const learnableCount = (() => {
  const set = new Set(getAllCharacters().map((c) => c.hanzi))
  for (const w of fullVocab) if (w.level <= 3) set.add(w.hanzi)
  return set.size
})()

/** Số từ đã có nghĩa tiếng Việt. */
export const translatedCount = fullVocab.filter((w) => w.vietnamese).length

/** Thống kê số từ theo cấp độ. */
export const countByLevel = fullVocab.reduce((acc, w) => {
  acc[w.level] = (acc[w.level] || 0) + 1
  return acc
}, {})

/**
 * Tìm kiếm + lọc từ vựng.
 * @param {Object} opts
 * @param {string} [opts.query] - từ khoá (chữ Hán, pinyin, nghĩa Việt/Anh)
 * @param {number} [opts.level] - lọc theo cấp (0 = tất cả)
 * @returns {Array} danh sách từ khớp
 */
export function searchVocab({ query = '', level = 0 } = {}) {
  const q = query.trim().toLowerCase()
  return fullVocab.filter((w) => {
    if (level && w.level !== level) return false
    if (!q) return true
    return (
      w.hanzi.includes(query.trim()) ||
      w.pinyin.toLowerCase().includes(q) ||
      w.english.toLowerCase().includes(q) ||
      (w.vietnamese && w.vietnamese.toLowerCase().includes(q))
    )
  })
}
