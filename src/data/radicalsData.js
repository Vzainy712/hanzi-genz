/**
 * Dữ liệu bộ thủ (部首) - các "bộ chữ" gốc cấu tạo nên chữ Hán.
 * Nắm bộ thủ giúp đoán nghĩa và nhớ chữ nhanh hơn rất nhiều.
 *
 * @typedef {Object} RadicalExample
 * @property {string} hanzi
 * @property {string} pinyin
 * @property {string} meaning
 *
 * @typedef {Object} Radical
 * @property {string} radical      - Bộ thủ
 * @property {string} name         - Tên Hán Việt
 * @property {string} meaning      - Ý nghĩa
 * @property {string} note         - Ghi chú/mẹo nhận biết
 * @property {RadicalExample[]} examples - Chữ chứa bộ thủ này
 */

export const radicalsData = [
  {
    radical: '亻', name: 'nhân đứng', meaning: 'liên quan đến con người',
    note: 'Biến thể của 人 (người) khi đứng bên trái chữ.',
    examples: [
      { hanzi: '你', pinyin: 'nǐ', meaning: 'bạn' },
      { hanzi: '他', pinyin: 'tā', meaning: 'anh ấy' },
      { hanzi: '们', pinyin: 'men', meaning: '(số nhiều)' },
    ],
  },
  {
    radical: '女', name: 'nữ', meaning: 'phụ nữ, con gái',
    note: 'Xuất hiện trong nhiều chữ chỉ quan hệ nữ giới.',
    examples: [
      { hanzi: '好', pinyin: 'hǎo', meaning: 'tốt' },
      { hanzi: '妈', pinyin: 'mā', meaning: 'mẹ' },
      { hanzi: '姐', pinyin: 'jiě', meaning: 'chị gái' },
    ],
  },
  {
    radical: '口', name: 'khẩu', meaning: 'cái miệng',
    note: 'Thường gặp ở chữ liên quan tới ăn, nói, âm thanh.',
    examples: [
      { hanzi: '吃', pinyin: 'chī', meaning: 'ăn' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'uống' },
      { hanzi: '吗', pinyin: 'ma', meaning: '(trợ từ hỏi)' },
    ],
  },
  {
    radical: '氵', name: 'ba chấm thủy', meaning: 'nước, chất lỏng',
    note: 'Biến thể của 水 (nước) khi đứng bên trái.',
    examples: [
      { hanzi: '河', pinyin: 'hé', meaning: 'sông' },
      { hanzi: '海', pinyin: 'hǎi', meaning: 'biển' },
      { hanzi: '洗', pinyin: 'xǐ', meaning: 'rửa, giặt' },
    ],
  },
  {
    radical: '木', name: 'mộc', meaning: 'cây, gỗ',
    note: 'Gặp trong chữ về cây cối, đồ gỗ.',
    examples: [
      { hanzi: '来', pinyin: 'lái', meaning: 'đến' },
      { hanzi: '林', pinyin: 'lín', meaning: 'rừng' },
      { hanzi: '树', pinyin: 'shù', meaning: 'cái cây' },
    ],
  },
  {
    radical: '日', name: 'nhật', meaning: 'mặt trời, ngày',
    note: 'Liên quan tới thời gian, ánh sáng.',
    examples: [
      { hanzi: '是', pinyin: 'shì', meaning: 'là' },
      { hanzi: '时', pinyin: 'shí', meaning: 'thời gian' },
      { hanzi: '明', pinyin: 'míng', meaning: 'sáng; ngày mai' },
    ],
  },
  {
    radical: '忄', name: 'tâm đứng', meaning: 'trái tim, cảm xúc',
    note: 'Biến thể của 心 (tim) khi đứng bên trái - chữ về cảm xúc.',
    examples: [
      { hanzi: '忙', pinyin: 'máng', meaning: 'bận' },
      { hanzi: '快', pinyin: 'kuài', meaning: 'nhanh; vui' },
      { hanzi: '怕', pinyin: 'pà', meaning: 'sợ' },
    ],
  },
  {
    radical: '讠', name: 'ngôn', meaning: 'lời nói, ngôn ngữ',
    note: 'Biến thể của 言 (lời nói) - chữ về nói năng.',
    examples: [
      { hanzi: '说', pinyin: 'shuō', meaning: 'nói' },
      { hanzi: '谁', pinyin: 'shéi', meaning: 'ai' },
      { hanzi: '记', pinyin: 'jì', meaning: 'ghi nhớ' },
    ],
  },
  {
    radical: '宀', name: 'miên', meaning: 'mái nhà, mái che',
    note: 'Trông như mái nhà - chữ liên quan tới nhà cửa.',
    examples: [
      { hanzi: '家', pinyin: 'jiā', meaning: 'nhà' },
      { hanzi: '字', pinyin: 'zì', meaning: 'chữ' },
      { hanzi: '安', pinyin: 'ān', meaning: 'an toàn' },
    ],
  },
  {
    radical: '艹', name: 'thảo đầu', meaning: 'cỏ, cây cối',
    note: 'Nằm trên đầu chữ - liên quan tới thực vật.',
    examples: [
      { hanzi: '茶', pinyin: 'chá', meaning: 'trà' },
      { hanzi: '花', pinyin: 'huā', meaning: 'hoa' },
      { hanzi: '药', pinyin: 'yào', meaning: 'thuốc' },
    ],
  },
  {
    radical: '灬', name: 'hỏa (bốn chấm)', meaning: 'lửa, nhiệt',
    note: 'Biến thể của 火 (lửa) khi ở dưới chân chữ.',
    examples: [
      { hanzi: '热', pinyin: 'rè', meaning: 'nóng' },
      { hanzi: '点', pinyin: 'diǎn', meaning: 'điểm; gọi món' },
      { hanzi: '照', pinyin: 'zhào', meaning: 'chiếu; chụp' },
    ],
  },
  {
    radical: '扌', name: 'thủ (tay)', meaning: 'bàn tay, hành động',
    note: 'Biến thể của 手 (tay) khi đứng bên trái - chữ về động tác.',
    examples: [
      { hanzi: '打', pinyin: 'dǎ', meaning: 'đánh; chơi' },
      { hanzi: '找', pinyin: 'zhǎo', meaning: 'tìm' },
      { hanzi: '拿', pinyin: 'ná', meaning: 'cầm, lấy' },
    ],
  },
  {
    radical: '目', name: 'mục', meaning: 'con mắt',
    note: 'Chữ liên quan tới nhìn, mắt.',
    examples: [
      { hanzi: '看', pinyin: 'kàn', meaning: 'nhìn, xem' },
      { hanzi: '眼', pinyin: 'yǎn', meaning: 'mắt' },
      { hanzi: '睡', pinyin: 'shuì', meaning: 'ngủ' },
    ],
  },
  {
    radical: '钅', name: 'kim', meaning: 'kim loại, kim khí',
    note: 'Biến thể của 金 (vàng, kim loại).',
    examples: [
      { hanzi: '钱', pinyin: 'qián', meaning: 'tiền' },
      { hanzi: '银', pinyin: 'yín', meaning: 'bạc' },
      { hanzi: '铁', pinyin: 'tiě', meaning: 'sắt' },
    ],
  },
  {
    radical: '纟', name: 'mịch (tơ)', meaning: 'sợi tơ, chỉ, màu sắc',
    note: 'Biến thể của 糸 - chữ về vải vóc, dây, màu.',
    examples: [
      { hanzi: '红', pinyin: 'hóng', meaning: 'đỏ' },
      { hanzi: '给', pinyin: 'gěi', meaning: 'cho, đưa' },
      { hanzi: '累', pinyin: 'lèi', meaning: 'mệt' },
    ],
  },
]
