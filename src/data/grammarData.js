/**
 * Dữ liệu ngữ pháp & mẫu câu tiếng Trung (HSK 1-2).
 * Mỗi điểm ngữ pháp gồm: mẫu câu (pattern), giải thích tiếng Việt,
 * mẹo ghi nhớ và các câu ví dụ có pinyin + nghĩa.
 *
 * @typedef {Object} SentenceExample
 * @property {string} hanzi   - Câu ví dụ bằng chữ Hán
 * @property {string} pinyin  - Phiên âm pinyin
 * @property {string} meaning - Nghĩa tiếng Việt
 *
 * @typedef {Object} GrammarPoint
 * @property {string} id
 * @property {string} title       - Tên điểm ngữ pháp (tiếng Việt)
 * @property {string} emoji
 * @property {number} level       - Cấp độ HSK
 * @property {string} pattern     - Công thức mẫu câu
 * @property {string} explanation - Giải thích cách dùng
 * @property {string} tip         - Mẹo ghi nhớ nhanh
 * @property {SentenceExample[]} examples
 */

export const grammarData = [
  {
    id: 'gr-shi',
    title: 'Câu khẳng định với 是',
    emoji: '🟰',
    level: 1,
    pattern: 'A + 是 + B',
    explanation:
      '是 (shì) nghĩa là "là", dùng để nối chủ ngữ với danh từ chỉ danh tính, nghề nghiệp, quốc tịch… Giống động từ "to be" trong tiếng Anh nhưng chỉ dùng với danh từ, KHÔNG dùng với tính từ.',
    tip: 'Muốn nói "tôi rất vui" thì KHÔNG dùng 是, mà dùng 很 (xem bài 很 + tính từ).',
    examples: [
      { hanzi: '我是学生。', pinyin: 'Wǒ shì xuéshēng.', meaning: 'Tôi là học sinh.' },
      { hanzi: '他是中国人。', pinyin: 'Tā shì zhōngguó rén.', meaning: 'Anh ấy là người Trung Quốc.' },
      { hanzi: '这是我的家。', pinyin: 'Zhè shì wǒ de jiā.', meaning: 'Đây là nhà của tôi.' },
    ],
  },
  {
    id: 'gr-ma',
    title: 'Câu hỏi với 吗',
    emoji: '❓',
    level: 1,
    pattern: 'Câu khẳng định + 吗 ?',
    explanation:
      'Thêm 吗 (ma) vào cuối một câu khẳng định là biến nó thành câu hỏi "có… không?". Đây là cách hỏi đơn giản nhất trong tiếng Trung.',
    tip: 'Không cần đảo trật tự từ như tiếng Anh — chỉ cần gắn 吗 vào cuối là xong!',
    examples: [
      { hanzi: '你好吗？', pinyin: 'Nǐ hǎo ma?', meaning: 'Bạn khỏe không?' },
      { hanzi: '你是学生吗？', pinyin: 'Nǐ shì xuéshēng ma?', meaning: 'Bạn là học sinh phải không?' },
      { hanzi: '他吃饭吗？', pinyin: 'Tā chī fàn ma?', meaning: 'Anh ấy ăn cơm không?' },
    ],
  },
  {
    id: 'gr-de',
    title: 'Sở hữu với 的',
    emoji: '🔗',
    level: 1,
    pattern: 'Người/vật + 的 + danh từ',
    explanation:
      '的 (de) đứng giữa để thể hiện sở hữu hoặc bổ nghĩa, tương đương "của" hoặc dấu "\'s" trong tiếng Anh.',
    tip: 'Với người thân thiết (我妈妈 - mẹ tôi) có thể lược bỏ 的 cho tự nhiên.',
    examples: [
      { hanzi: '我的书', pinyin: 'wǒ de shū', meaning: 'sách của tôi' },
      { hanzi: '老师的名字', pinyin: 'lǎoshī de míngzi', meaning: 'tên của thầy/cô' },
      { hanzi: '这是谁的？', pinyin: 'Zhè shì shéi de?', meaning: 'Đây là của ai?' },
    ],
  },
  {
    id: 'gr-bu-mei',
    title: 'Phủ định: 不 và 没',
    emoji: '🚫',
    level: 1,
    pattern: '不 + động từ (hiện tại/tương lai) · 没 + động từ (quá khứ)',
    explanation:
      '不 (bù) phủ định thói quen, ý muốn, hiện tại và tương lai. 没 (méi) phủ định hành động đã/chưa xảy ra trong quá khứ, và luôn dùng với 有.',
    tip: 'Nhớ: "chưa từng làm" → 没; "không làm/không muốn" → 不.',
    examples: [
      { hanzi: '我不吃肉。', pinyin: 'Wǒ bù chī ròu.', meaning: 'Tôi không ăn thịt.' },
      { hanzi: '他没来。', pinyin: 'Tā méi lái.', meaning: 'Anh ấy chưa/không đến (đã rồi).' },
      { hanzi: '我没有钱。', pinyin: 'Wǒ méiyǒu qián.', meaning: 'Tôi không có tiền.' },
    ],
  },
  {
    id: 'gr-hen-adj',
    title: 'Tính từ với 很',
    emoji: '🎨',
    level: 1,
    pattern: 'Chủ ngữ + 很 + tính từ',
    explanation:
      'Trong tiếng Trung, tính từ tự làm vị ngữ mà KHÔNG cần 是. Thường thêm 很 (hěn) đứng trước tính từ; ở đây 很 gần như chỉ để câu nghe trọn vẹn, không nhất thiết mang nghĩa "rất".',
    tip: 'Nói "我好" nghe cụt; nói "我很好" mới tự nhiên = "Tôi khỏe/ổn".',
    examples: [
      { hanzi: '我很好。', pinyin: 'Wǒ hěn hǎo.', meaning: 'Tôi (rất) khỏe.' },
      { hanzi: '今天很热。', pinyin: 'Jīntiān hěn rè.', meaning: 'Hôm nay rất nóng.' },
      { hanzi: '汉语很难。', pinyin: 'Hànyǔ hěn nán.', meaning: 'Tiếng Trung rất khó.' },
    ],
  },
  {
    id: 'gr-question-words',
    title: 'Câu hỏi với từ để hỏi',
    emoji: '🕵️',
    level: 1,
    pattern: 'Đặt từ hỏi (什么/谁/哪儿…) đúng vị trí của câu trả lời',
    explanation:
      'Khác tiếng Anh, từ để hỏi trong tiếng Trung đứng ĐÚNG vị trí mà câu trả lời sẽ nằm — không cần đảo lên đầu câu. Không dùng kèm 吗.',
    tip: 'Muốn hỏi "Bạn ăn gì?" → giữ nguyên trật tự "你吃 + 什么" (Bạn ăn + gì).',
    examples: [
      { hanzi: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', meaning: 'Bạn tên là gì?' },
      { hanzi: '他是谁？', pinyin: 'Tā shì shéi?', meaning: 'Anh ấy là ai?' },
      { hanzi: '你去哪儿？', pinyin: 'Nǐ qù nǎr?', meaning: 'Bạn đi đâu?' },
    ],
  },
  {
    id: 'gr-you',
    title: 'Diễn tả "có" với 有',
    emoji: '🎁',
    level: 1,
    pattern: 'Chủ ngữ + 有 + tân ngữ (phủ định: 没有)',
    explanation:
      '有 (yǒu) nghĩa là "có" (sở hữu hoặc tồn tại). Dạng phủ định đặc biệt: luôn dùng 没有, KHÔNG BAO GIỜ dùng 不有.',
    tip: 'Ghi nhớ cặp: 有 ↔ 没有.',
    examples: [
      { hanzi: '我有一个哥哥。', pinyin: 'Wǒ yǒu yí gè gēge.', meaning: 'Tôi có một người anh trai.' },
      { hanzi: '家里有很多书。', pinyin: 'Jiā lǐ yǒu hěn duō shū.', meaning: 'Trong nhà có rất nhiều sách.' },
      { hanzi: '我没有时间。', pinyin: 'Wǒ méiyǒu shíjiān.', meaning: 'Tôi không có thời gian.' },
    ],
  },
  {
    id: 'gr-measure-ge',
    title: 'Lượng từ 个',
    emoji: '🔟',
    level: 2,
    pattern: 'Số từ + 个 + danh từ',
    explanation:
      'Khi đếm sự vật, tiếng Trung cần "lượng từ" đứng giữa số và danh từ. 个 (gè) là lượng từ phổ biến nhất, dùng được cho rất nhiều thứ, đặc biệt là người.',
    tip: 'Không nói "三人" mà phải nói "三个人" (ba người).',
    examples: [
      { hanzi: '三个人', pinyin: 'sān gè rén', meaning: 'ba người' },
      { hanzi: '一个苹果', pinyin: 'yí gè píngguǒ', meaning: 'một quả táo' },
      { hanzi: '我要两个。', pinyin: 'Wǒ yào liǎng gè.', meaning: 'Tôi muốn hai cái.' },
    ],
  },
  {
    id: 'gr-zai-location',
    title: 'Chỉ nơi chốn với 在',
    emoji: '📍',
    level: 2,
    pattern: 'Chủ ngữ + 在 + địa điểm',
    explanation:
      '在 (zài) nghĩa là "ở, tại", dùng để nói ai đó/vật gì đang ở đâu. Cũng đứng trước động từ để nói địa điểm diễn ra hành động.',
    tip: '在 + nơi chốn = "ở đâu". Ví dụ: 在家 (ở nhà), 在学校 (ở trường).',
    examples: [
      { hanzi: '我在家。', pinyin: 'Wǒ zài jiā.', meaning: 'Tôi đang ở nhà.' },
      { hanzi: '他在学校学习。', pinyin: 'Tā zài xuéxiào xuéxí.', meaning: 'Anh ấy học ở trường.' },
      { hanzi: '你在哪儿？', pinyin: 'Nǐ zài nǎr?', meaning: 'Bạn đang ở đâu?' },
    ],
  },
  {
    id: 'gr-tai-le',
    title: 'Cảm thán với 太…了',
    emoji: '🤯',
    level: 1,
    pattern: '太 + tính từ + 了',
    explanation:
      'Kẹp tính từ vào giữa 太 (tài) và 了 (le) để cảm thán "quá…!". Đây là cấu trúc khen/chê cảm xúc mạnh phổ biến nhất khi nói chuyện.',
    tip: 'Meme mạng 我太难了 (tôi khó khăn quá) chính là cấu trúc này - thấy 太…了 là biết đang "quá trời quá đất".',
    examples: [
      { hanzi: '太好了！', pinyin: 'Tài hǎo le!', meaning: 'Tuyệt quá!' },
      { hanzi: '太贵了！', pinyin: 'Tài guì le!', meaning: 'Đắt quá!' },
      { hanzi: '我太难了。', pinyin: 'Wǒ tài nán le.', meaning: 'Tôi khổ quá mà (meme quốc dân).' },
    ],
  },
  {
    id: 'gr-yue',
    title: 'Càng… càng… với 越…越…',
    emoji: '📈',
    level: 3,
    pattern: '越 + A + 越 + B · 越来越 + tính từ',
    explanation:
      '越…越… diễn tả hai thứ tăng cùng nhau: "càng A thì càng B". Riêng 越来越 + tính từ = "càng ngày càng…" (thay đổi theo thời gian).',
    tip: 'Thoại viral phim Cuồng Phong: 风浪越大，鱼越贵 (sóng càng lớn, cá càng đắt) - nhớ meme là nhớ ngữ pháp!',
    examples: [
      { hanzi: '越多越好。', pinyin: 'Yuè duō yuè hǎo.', meaning: 'Càng nhiều càng tốt.' },
      { hanzi: '汉语越学越有意思。', pinyin: 'Hànyǔ yuè xué yuè yǒu yìsi.', meaning: 'Tiếng Trung càng học càng thú vị.' },
      { hanzi: '天气越来越热。', pinyin: 'Tiānqì yuè lái yuè rè.', meaning: 'Trời càng ngày càng nóng.' },
    ],
  },
  {
    id: 'gr-rang',
    title: 'Câu khiến với 让',
    emoji: '🎬',
    level: 3,
    pattern: 'A + 让 + B + làm gì',
    explanation:
      '让 (ràng) = "để cho, khiến cho": A khiến/cho phép B làm gì đó. Dùng cả khi nói cảm xúc: 让我很开心 (khiến tôi rất vui).',
    tip: 'Tên phim kinh điển 让子弹飞 (Để viên đạn bay) chính là mẫu câu này - 让 + 子弹 (viên đạn) + 飞 (bay).',
    examples: [
      { hanzi: '让我看看。', pinyin: 'Ràng wǒ kànkan.', meaning: 'Để tôi xem nào.' },
      { hanzi: '妈妈不让我玩游戏。', pinyin: 'Māma bú ràng wǒ wán yóuxì.', meaning: 'Mẹ không cho tôi chơi game.' },
      { hanzi: '这首歌让我想家。', pinyin: 'Zhè shǒu gē ràng wǒ xiǎng jiā.', meaning: 'Bài hát này làm tôi nhớ nhà.' },
    ],
  },
]

/** Tìm một điểm ngữ pháp theo id. */
export function getGrammarById(id) {
  return grammarData.find((g) => g.id === id) || null
}
