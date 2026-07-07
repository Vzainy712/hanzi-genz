/**
 * Sinh bài học từ vựng tự động từ kho HSK đầy đủ (HSK 1-3, đã dịch tiếng Việt).
 * Mỗi bài ~10 từ, kèm 2 câu trending liên quan cấp độ để học theo ngữ cảnh.
 */

import { fullVocab } from './fullVocab.js'
import { getSentencesForLevel } from './trendySentences.js'

const CHUNK_SIZE = 10

/** Emoji xoay vòng cho tiêu đề bài - nhìn cho vui mắt. */
const EMOJIS = ['🌱', '🚀', '🔥', '✨', '🎈', '🌈', '⚡', '🍀', '🎵', '💫', '🧋', '🐼', '🏮', '🎮', '🌸']

/** Màu gradient theo cấp (đồng bộ với hskData). */
export const VOCAB_LEVEL_COLORS = {
  1: 'from-violet-500 to-fuchsia-500',
  2: 'from-cyan-500 to-blue-500',
  3: 'from-orange-500 to-rose-500',
}

/**
 * Danh sách nhóm bài theo cấp: [{ level, lessons: [{id, level, index, title, emoji, words, sentences}] }]
 */
export const vocabLessonGroups = [1, 2, 3].map((level) => {
  const words = fullVocab.filter((w) => w.level === level)
  const pool = getSentencesForLevel(level)
  const lessons = []
  for (let i = 0; i < words.length; i += CHUNK_SIZE) {
    const index = i / CHUNK_SIZE + 1
    // Gán 2 câu trending xoay vòng theo số thứ tự bài.
    const sentences = pool.length
      ? [pool[(index - 1) % pool.length], pool[index % pool.length]].filter(
          (s, idx, arr) => arr.findIndex((x) => x.id === s.id) === idx,
        )
      : []
    lessons.push({
      id: `vl${level}-${index}`,
      level,
      index,
      emoji: EMOJIS[(index - 1) % EMOJIS.length],
      title: `Bộ từ ${index}`,
      words: words.slice(i, i + CHUNK_SIZE),
      sentences,
    })
  }
  return { level, lessons }
})

/** Tìm bài học từ vựng theo id (kèm thông tin trước/sau để điều hướng). */
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
