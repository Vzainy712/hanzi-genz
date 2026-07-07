/**
 * Sinh bài học từ vựng theo CHỦ ĐỀ từ kho HSK đầy đủ (HSK 1-3, 100% tiếng Việt).
 * - Chủ đề định nghĩa trong themes.js (emoji + tiêu đề + danh sách từ).
 * - Từ chưa thuộc chủ đề nào tự động gom vào các bài "Từ vựng bổ sung".
 * - Mỗi bài kèm 2 câu trending xoay vòng để học theo ngữ cảnh.
 */

import { fullVocab } from './fullVocab.js'
import { themes } from './themes.js'
import { getSentencesForLevel } from './trendySentences.js'

const CHUNK_SIZE = 10

/** Màu gradient theo cấp (đồng bộ toàn app). */
export const VOCAB_LEVEL_COLORS = {
  1: 'from-violet-500 to-fuchsia-500',
  2: 'from-cyan-500 to-blue-500',
  3: 'from-orange-500 to-rose-500',
}

// Tra cứu nhanh từ theo chữ Hán.
const byHanzi = new Map(fullVocab.map((w) => [w.hanzi, w]))

/** Dựng danh sách bài theo cấp: chủ đề trước, từ còn sót gom vào bài bổ sung. */
function buildLessons() {
  const assigned = new Set()
  const byLevel = { 1: [], 2: [], 3: [] }

  for (const theme of themes) {
    const words = theme.words
      .map((h) => byHanzi.get(h))
      .filter((w) => w && w.level === theme.level && !assigned.has(w.hanzi))
    words.forEach((w) => assigned.add(w.hanzi))
    if (words.length > 0) {
      byLevel[theme.level].push({ id: theme.id, level: theme.level, emoji: theme.emoji, title: theme.title, words })
    }
  }

  // Gom từ chưa được xếp chủ đề.
  for (const level of [1, 2, 3]) {
    const leftovers = fullVocab.filter((w) => w.level === level && !assigned.has(w.hanzi))
    for (let i = 0; i < leftovers.length; i += CHUNK_SIZE) {
      const n = i / CHUNK_SIZE + 1
      byLevel[level].push({
        id: `t${level}-extra${n}`,
        level,
        emoji: '🧩',
        title: `Từ vựng bổ sung ${n}`,
        words: leftovers.slice(i, i + CHUNK_SIZE),
      })
    }
  }

  return byLevel
}

const lessonsByLevel = buildLessons()

/** Nhóm bài theo cấp, gắn chỉ số + câu trending xoay vòng. */
export const vocabLessonGroups = [1, 2, 3].map((level) => {
  const pool = getSentencesForLevel(level)
  const lessons = lessonsByLevel[level].map((lesson, i) => {
    const index = i + 1
    const sentences = pool.length
      ? [pool[(index - 1) % pool.length], pool[index % pool.length]].filter(
          (s, idx, arr) => arr.findIndex((x) => x.id === s.id) === idx,
        )
      : []
    return { ...lesson, index, sentences }
  })
  return { level, lessons }
})

/** Tìm bài học theo id (kèm prev/next trong cùng cấp). */
export function getVocabLessonById(id) {
  for (const group of vocabLessonGroups) {
    const idx = group.lessons.findIndex((l) => l.id === id)
    if (idx >= 0) {
      return {
        ...group.lessons[idx],
        prevId: idx > 0 ? group.lessons[idx - 1].id : null,
        nextId: idx < group.lessons.length - 1 ? group.lessons[idx + 1].id : null,
        totalInLevel: group.lessons.length,
      }
    }
  }
  return null
}
