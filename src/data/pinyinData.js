/**
 * Dữ liệu phát âm tiếng Trung: 4 thanh điệu, thanh mẫu (phụ âm đầu),
 * vận mẫu (nguyên âm) - phục vụ module luyện Phát âm.
 */

/** 4 thanh điệu + thanh nhẹ, minh hoạ bằng âm "ma". */
export const tones = [
  {
    tone: 1,
    mark: 'ā',
    name: 'Thanh 1 (thanh ngang)',
    contour: 'Cao và đều, giữ nguyên như hát một nốt.',
    example: '妈',
    examplePinyin: 'mā',
    exampleMeaning: 'mẹ',
    color: '#ef4444',
  },
  {
    tone: 2,
    mark: 'á',
    name: 'Thanh 2 (thanh sắc)',
    contour: 'Đi lên từ giữa lên cao, như đang hỏi lại "Hả?".',
    example: '麻',
    examplePinyin: 'má',
    exampleMeaning: 'cây gai / tê',
    color: '#f59e0b',
  },
  {
    tone: 3,
    mark: 'ǎ',
    name: 'Thanh 3 (thanh hỏi)',
    contour: 'Xuống thấp rồi mới lên, giống chữ V.',
    example: '马',
    examplePinyin: 'mǎ',
    exampleMeaning: 'con ngựa',
    color: '#10b981',
  },
  {
    tone: 4,
    mark: 'à',
    name: 'Thanh 4 (thanh nặng/huyền gắt)',
    contour: 'Đổ dốc từ cao xuống thấp, dứt khoát như ra lệnh.',
    example: '骂',
    examplePinyin: 'mà',
    exampleMeaning: 'mắng, chửi',
    color: '#3b82f6',
  },
  {
    tone: 0,
    mark: 'a',
    name: 'Thanh nhẹ',
    contour: 'Đọc nhẹ và ngắn, không nhấn.',
    example: '吗',
    examplePinyin: 'ma',
    exampleMeaning: '(trợ từ nghi vấn)',
    color: '#9ca3af',
  },
]

/** Một số thanh mẫu (phụ âm đầu) hay gây khó cho người Việt. */
export const initials = [
  { pinyin: 'b', note: 'gần giống "p" nhẹ trong tiếng Việt', example: '爸 bà' },
  { pinyin: 'p', note: 'bật hơi mạnh, như "p" kèm hơi', example: '朋 péng' },
  { pinyin: 'zh', note: 'uốn lưỡi, gần "tr"', example: '中 zhōng' },
  { pinyin: 'ch', note: 'uốn lưỡi bật hơi, gần "ch" nặng', example: '茶 chá' },
  { pinyin: 'sh', note: 'uốn lưỡi, gần "s" trong "show"', example: '是 shì' },
  { pinyin: 'r', note: 'uốn lưỡi, giữa "r" và "j" (gi)', example: '热 rè' },
  { pinyin: 'j', note: 'như "ch" nhẹ, môi dẹt', example: '几 jǐ' },
  { pinyin: 'q', note: 'như "ch" bật hơi, môi dẹt', example: '七 qī' },
  { pinyin: 'x', note: 'giữa "x" và "s", môi dẹt', example: '想 xiǎng' },
]

/** Một số vận mẫu (nguyên âm) tiêu biểu. */
export const finals = [
  { pinyin: 'a', note: 'như "a" tiếng Việt', example: '八 bā' },
  { pinyin: 'o', note: 'như "ô"', example: '我 wǒ' },
  { pinyin: 'e', note: 'như "ơ" nuốt vào trong', example: '喝 hē' },
  { pinyin: 'i', note: 'như "i"', example: '你 nǐ' },
  { pinyin: 'u', note: 'như "u"', example: '五 wǔ' },
  { pinyin: 'ü', note: 'như "uy" chu môi (không có trong tiếng Việt)', example: '女 nǚ' },
  { pinyin: 'ang', note: 'như "ang" mở rộng', example: '想 xiǎng' },
  { pinyin: 'ong', note: 'như "ung/ông"', example: '中 zhōng' },
]
