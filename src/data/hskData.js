/**
 * Dữ liệu chữ Hán HSK (bản mẫu HSK 1-2).
 * Mỗi chữ gồm: chữ Hán, pinyin, thanh điệu, nghĩa tiếng Việt,
 * bộ thủ (radical) + nghĩa bộ thủ, số nét, và câu ví dụ.
 *
 * Ghi chú: strokeCount mang tính tham khảo; hoạt hình nét chữ lấy trực tiếp
 * từ thư viện hanzi-writer nên luôn chính xác theo dữ liệu chuẩn.
 *
 * @typedef {Object} Example
 * @property {string} hanzi   - Cụm/câu ví dụ bằng chữ Hán
 * @property {string} pinyin  - Phiên âm pinyin
 * @property {string} meaning - Nghĩa tiếng Việt
 *
 * @typedef {Object} CharacterEntry
 * @property {string} hanzi         - Chữ Hán
 * @property {string} pinyin        - Phiên âm pinyin (có dấu thanh)
 * @property {number} tone          - Thanh điệu: 1-4, hoặc 0 (thanh nhẹ)
 * @property {string} meaning       - Nghĩa tiếng Việt
 * @property {string} radical       - Bộ thủ
 * @property {string} radicalName   - Tên bộ thủ (Hán Việt)
 * @property {string} radicalMeaning- Ý nghĩa bộ thủ
 * @property {number} strokeCount   - Số nét (tham khảo)
 * @property {Example[]} examples   - Danh sách câu ví dụ
 */

export const hskData = [
  {
    level: 1,
    label: 'HSK 1',
    color: 'from-violet-500 to-fuchsia-500',
    lessons: [
      {
        id: 'hsk1-1',
        title: 'Chào hỏi cơ bản',
        emoji: '👋',
        description: 'Những chữ đầu tiên để chào và giới thiệu bản thân.',
        characters: [
          {
            hanzi: '你',
            pinyin: 'nǐ',
            tone: 3,
            meaning: 'bạn, anh, chị (ngôi thứ hai số ít)',
            radical: '亻',
            radicalName: 'nhân đứng',
            radicalMeaning: 'liên quan đến con người',
            strokeCount: 7,
            examples: [
              { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
              { hanzi: '你们', pinyin: 'nǐ men', meaning: 'các bạn' },
            ],
          },
          {
            hanzi: '好',
            pinyin: 'hǎo',
            tone: 3,
            meaning: 'tốt, hay, ổn',
            radical: '女',
            radicalName: 'nữ',
            radicalMeaning: 'phụ nữ, con gái',
            strokeCount: 6,
            examples: [
              { hanzi: '很好', pinyin: 'hěn hǎo', meaning: 'rất tốt' },
              { hanzi: '好吃', pinyin: 'hǎo chī', meaning: 'ngon (đồ ăn)' },
            ],
          },
          {
            hanzi: '我',
            pinyin: 'wǒ',
            tone: 3,
            meaning: 'tôi, tớ, mình',
            radical: '戈',
            radicalName: 'qua',
            radicalMeaning: 'ngọn giáo (vũ khí cổ)',
            strokeCount: 7,
            examples: [
              { hanzi: '我们', pinyin: 'wǒ men', meaning: 'chúng tôi, chúng ta' },
              { hanzi: '我是', pinyin: 'wǒ shì', meaning: 'tôi là' },
            ],
          },
          {
            hanzi: '是',
            pinyin: 'shì',
            tone: 4,
            meaning: 'là, đúng, phải',
            radical: '日',
            radicalName: 'nhật',
            radicalMeaning: 'mặt trời, ngày',
            strokeCount: 9,
            examples: [
              { hanzi: '不是', pinyin: 'bú shì', meaning: 'không phải' },
              { hanzi: '是的', pinyin: 'shì de', meaning: 'đúng vậy' },
            ],
          },
          {
            hanzi: '不',
            pinyin: 'bù',
            tone: 4,
            meaning: 'không (phủ định)',
            radical: '一',
            radicalName: 'nhất',
            radicalMeaning: 'số một, nét ngang',
            strokeCount: 4,
            examples: [
              { hanzi: '不要', pinyin: 'bú yào', meaning: 'không muốn, đừng' },
              { hanzi: '不客气', pinyin: 'bú kè qì', meaning: 'không có gì (đáp lại cảm ơn)' },
            ],
          },
        ],
      },
      {
        id: 'hsk1-2',
        title: 'Con người & Gia đình',
        emoji: '👨‍👩‍👧',
        description: 'Từ vựng về người thân và các tính từ kích thước.',
        characters: [
          {
            hanzi: '人',
            pinyin: 'rén',
            tone: 2,
            meaning: 'người',
            radical: '人',
            radicalName: 'nhân',
            radicalMeaning: 'con người',
            strokeCount: 2,
            examples: [
              { hanzi: '中国人', pinyin: 'zhōng guó rén', meaning: 'người Trung Quốc' },
              { hanzi: '大人', pinyin: 'dà rén', meaning: 'người lớn' },
            ],
          },
          {
            hanzi: '大',
            pinyin: 'dà',
            tone: 4,
            meaning: 'to, lớn',
            radical: '大',
            radicalName: 'đại',
            radicalMeaning: 'to lớn',
            strokeCount: 3,
            examples: [
              { hanzi: '大学', pinyin: 'dà xué', meaning: 'đại học' },
              { hanzi: '很大', pinyin: 'hěn dà', meaning: 'rất to' },
            ],
          },
          {
            hanzi: '小',
            pinyin: 'xiǎo',
            tone: 3,
            meaning: 'nhỏ, bé',
            radical: '小',
            radicalName: 'tiểu',
            radicalMeaning: 'nhỏ bé',
            strokeCount: 3,
            examples: [
              { hanzi: '小学', pinyin: 'xiǎo xué', meaning: 'tiểu học' },
              { hanzi: '小心', pinyin: 'xiǎo xīn', meaning: 'cẩn thận' },
            ],
          },
          {
            hanzi: '女',
            pinyin: 'nǚ',
            tone: 3,
            meaning: 'nữ, con gái',
            radical: '女',
            radicalName: 'nữ',
            radicalMeaning: 'phụ nữ, con gái',
            strokeCount: 3,
            examples: [
              { hanzi: '女人', pinyin: 'nǚ rén', meaning: 'phụ nữ' },
              { hanzi: '女儿', pinyin: 'nǚ ér', meaning: 'con gái (ruột)' },
            ],
          },
          {
            hanzi: '家',
            pinyin: 'jiā',
            tone: 1,
            meaning: 'nhà, gia đình',
            radical: '宀',
            radicalName: 'miên',
            radicalMeaning: 'mái nhà, mái che',
            strokeCount: 10,
            examples: [
              { hanzi: '回家', pinyin: 'huí jiā', meaning: 'về nhà' },
              { hanzi: '家人', pinyin: 'jiā rén', meaning: 'người nhà, người thân' },
            ],
          },
        ],
      },
      {
        id: 'hsk1-3',
        title: 'Đất nước & Học tập',
        emoji: '📚',
        description: 'Nói về quốc gia, việc học và tên gọi.',
        characters: [
          {
            hanzi: '中',
            pinyin: 'zhōng',
            tone: 1,
            meaning: 'giữa, trung tâm; Trung (Quốc)',
            radical: '丨',
            radicalName: 'cổn',
            radicalMeaning: 'nét sổ thẳng đứng',
            strokeCount: 4,
            examples: [
              { hanzi: '中国', pinyin: 'zhōng guó', meaning: 'Trung Quốc' },
              { hanzi: '中文', pinyin: 'zhōng wén', meaning: 'tiếng Trung' },
            ],
          },
          {
            hanzi: '国',
            pinyin: 'guó',
            tone: 2,
            meaning: 'nước, quốc gia',
            radical: '囗',
            radicalName: 'vi',
            radicalMeaning: 'vây quanh, bao bọc',
            strokeCount: 8,
            examples: [
              { hanzi: '国家', pinyin: 'guó jiā', meaning: 'quốc gia' },
              { hanzi: '外国', pinyin: 'wài guó', meaning: 'nước ngoài' },
            ],
          },
          {
            hanzi: '学',
            pinyin: 'xué',
            tone: 2,
            meaning: 'học, học tập',
            radical: '子',
            radicalName: 'tử',
            radicalMeaning: 'con, trẻ nhỏ',
            strokeCount: 8,
            examples: [
              { hanzi: '学生', pinyin: 'xué shēng', meaning: 'học sinh' },
              { hanzi: '学习', pinyin: 'xué xí', meaning: 'học tập' },
            ],
          },
          {
            hanzi: '生',
            pinyin: 'shēng',
            tone: 1,
            meaning: 'sinh, sống; học trò',
            radical: '生',
            radicalName: 'sinh',
            radicalMeaning: 'sinh ra, sống',
            strokeCount: 5,
            examples: [
              { hanzi: '医生', pinyin: 'yī shēng', meaning: 'bác sĩ' },
              { hanzi: '生日', pinyin: 'shēng rì', meaning: 'sinh nhật' },
            ],
          },
          {
            hanzi: '名',
            pinyin: 'míng',
            tone: 2,
            meaning: 'tên, danh',
            radical: '口',
            radicalName: 'khẩu',
            radicalMeaning: 'cái miệng',
            strokeCount: 6,
            examples: [
              { hanzi: '名字', pinyin: 'míng zi', meaning: 'tên (họ tên)' },
              { hanzi: '有名', pinyin: 'yǒu míng', meaning: 'nổi tiếng' },
            ],
          },
        ],
      },
      {
        id: 'hsk1-4',
        title: 'Ăn uống & Sinh hoạt',
        emoji: '🍜',
        description: 'Các động từ và danh từ về ăn uống hằng ngày.',
        characters: [
          {
            hanzi: '吃',
            pinyin: 'chī',
            tone: 1,
            meaning: 'ăn',
            radical: '口',
            radicalName: 'khẩu',
            radicalMeaning: 'cái miệng',
            strokeCount: 6,
            examples: [
              { hanzi: '吃饭', pinyin: 'chī fàn', meaning: 'ăn cơm' },
              { hanzi: '好吃', pinyin: 'hǎo chī', meaning: 'ngon' },
            ],
          },
          {
            hanzi: '喝',
            pinyin: 'hē',
            tone: 1,
            meaning: 'uống',
            radical: '口',
            radicalName: 'khẩu',
            radicalMeaning: 'cái miệng',
            strokeCount: 12,
            examples: [
              { hanzi: '喝水', pinyin: 'hē shuǐ', meaning: 'uống nước' },
              { hanzi: '喝茶', pinyin: 'hē chá', meaning: 'uống trà' },
            ],
          },
          {
            hanzi: '水',
            pinyin: 'shuǐ',
            tone: 3,
            meaning: 'nước',
            radical: '水',
            radicalName: 'thủy',
            radicalMeaning: 'nước',
            strokeCount: 4,
            examples: [
              { hanzi: '喝水', pinyin: 'hē shuǐ', meaning: 'uống nước' },
              { hanzi: '水果', pinyin: 'shuǐ guǒ', meaning: 'trái cây' },
            ],
          },
          {
            hanzi: '茶',
            pinyin: 'chá',
            tone: 2,
            meaning: 'trà',
            radical: '艹',
            radicalName: 'thảo đầu',
            radicalMeaning: 'cỏ, cây cối',
            strokeCount: 9,
            examples: [
              { hanzi: '喝茶', pinyin: 'hē chá', meaning: 'uống trà' },
              { hanzi: '红茶', pinyin: 'hóng chá', meaning: 'hồng trà' },
            ],
          },
          {
            hanzi: '饭',
            pinyin: 'fàn',
            tone: 4,
            meaning: 'cơm, bữa ăn',
            radical: '饣',
            radicalName: 'thực',
            radicalMeaning: 'đồ ăn, thức ăn',
            strokeCount: 7,
            examples: [
              { hanzi: '米饭', pinyin: 'mǐ fàn', meaning: 'cơm trắng' },
              { hanzi: '晚饭', pinyin: 'wǎn fàn', meaning: 'bữa tối' },
            ],
          },
        ],
      },
      {
        id: 'hsk1-5',
        title: 'Số đếm 1-10',
        emoji: '🔢',
        description: 'Mười con số đầu tiên - nền tảng để nói giờ, ngày, giá tiền.',
        characters: [
          {
            hanzi: '一', pinyin: 'yī', tone: 1, meaning: 'một (số 1)',
            radical: '一', radicalName: 'nhất', radicalMeaning: 'số một, nét ngang', strokeCount: 1,
            examples: [
              { hanzi: '一个', pinyin: 'yí gè', meaning: 'một cái' },
              { hanzi: '第一', pinyin: 'dì yī', meaning: 'thứ nhất' },
            ],
          },
          {
            hanzi: '二', pinyin: 'èr', tone: 4, meaning: 'hai (số 2)',
            radical: '二', radicalName: 'nhị', radicalMeaning: 'số hai', strokeCount: 2,
            examples: [
              { hanzi: '二十', pinyin: 'èr shí', meaning: 'hai mươi' },
              { hanzi: '十二', pinyin: 'shí èr', meaning: 'mười hai' },
            ],
          },
          {
            hanzi: '三', pinyin: 'sān', tone: 1, meaning: 'ba (số 3)',
            radical: '一', radicalName: 'nhất', radicalMeaning: 'số một, nét ngang', strokeCount: 3,
            examples: [
              { hanzi: '三个', pinyin: 'sān gè', meaning: 'ba cái' },
              { hanzi: '三月', pinyin: 'sān yuè', meaning: 'tháng Ba' },
            ],
          },
          {
            hanzi: '四', pinyin: 'sì', tone: 4, meaning: 'bốn (số 4)',
            radical: '囗', radicalName: 'vi', radicalMeaning: 'vây quanh, bao bọc', strokeCount: 5,
            examples: [
              { hanzi: '四十', pinyin: 'sì shí', meaning: 'bốn mươi' },
              { hanzi: '四个', pinyin: 'sì gè', meaning: 'bốn cái' },
            ],
          },
          {
            hanzi: '五', pinyin: 'wǔ', tone: 3, meaning: 'năm (số 5)',
            radical: '二', radicalName: 'nhị', radicalMeaning: 'số hai', strokeCount: 4,
            examples: [
              { hanzi: '五个', pinyin: 'wǔ gè', meaning: 'năm cái' },
              { hanzi: '五月', pinyin: 'wǔ yuè', meaning: 'tháng Năm' },
            ],
          },
          {
            hanzi: '六', pinyin: 'liù', tone: 4, meaning: 'sáu (số 6)',
            radical: '八', radicalName: 'bát', radicalMeaning: 'số tám, tách ra', strokeCount: 4,
            examples: [
              { hanzi: '六个', pinyin: 'liù gè', meaning: 'sáu cái' },
              { hanzi: '六月', pinyin: 'liù yuè', meaning: 'tháng Sáu' },
            ],
          },
          {
            hanzi: '七', pinyin: 'qī', tone: 1, meaning: 'bảy (số 7)',
            radical: '一', radicalName: 'nhất', radicalMeaning: 'số một, nét ngang', strokeCount: 2,
            examples: [
              { hanzi: '七个', pinyin: 'qī gè', meaning: 'bảy cái' },
              { hanzi: '七十', pinyin: 'qī shí', meaning: 'bảy mươi' },
            ],
          },
          {
            hanzi: '八', pinyin: 'bā', tone: 1, meaning: 'tám (số 8)',
            radical: '八', radicalName: 'bát', radicalMeaning: 'số tám, tách ra', strokeCount: 2,
            examples: [
              { hanzi: '八个', pinyin: 'bā gè', meaning: 'tám cái' },
              { hanzi: '八月', pinyin: 'bā yuè', meaning: 'tháng Tám' },
            ],
          },
          {
            hanzi: '九', pinyin: 'jiǔ', tone: 3, meaning: 'chín (số 9)',
            radical: '乙', radicalName: 'ất', radicalMeaning: 'nét cong (can thứ hai)', strokeCount: 2,
            examples: [
              { hanzi: '九个', pinyin: 'jiǔ gè', meaning: 'chín cái' },
              { hanzi: '九月', pinyin: 'jiǔ yuè', meaning: 'tháng Chín' },
            ],
          },
          {
            hanzi: '十', pinyin: 'shí', tone: 2, meaning: 'mười (số 10)',
            radical: '十', radicalName: 'thập', radicalMeaning: 'số mười', strokeCount: 2,
            examples: [
              { hanzi: '十个', pinyin: 'shí gè', meaning: 'mười cái' },
              { hanzi: '十月', pinyin: 'shí yuè', meaning: 'tháng Mười' },
            ],
          },
        ],
      },
      {
        id: 'hsk1-6',
        title: 'Từ để hỏi',
        emoji: '❓',
        description: 'Những chữ giúp bạn đặt câu hỏi mỗi ngày.',
        characters: [
          {
            hanzi: '谁', pinyin: 'shéi', tone: 2, meaning: 'ai (hỏi người)',
            radical: '讠', radicalName: 'ngôn', radicalMeaning: 'lời nói, ngôn ngữ', strokeCount: 10,
            examples: [
              { hanzi: '谁的', pinyin: 'shéi de', meaning: 'của ai' },
              { hanzi: '你是谁', pinyin: 'nǐ shì shéi', meaning: 'bạn là ai' },
            ],
          },
          {
            hanzi: '哪', pinyin: 'nǎ', tone: 3, meaning: 'nào, cái nào',
            radical: '口', radicalName: 'khẩu', radicalMeaning: 'cái miệng', strokeCount: 9,
            examples: [
              { hanzi: '哪个', pinyin: 'nǎ ge', meaning: 'cái nào' },
              { hanzi: '哪里', pinyin: 'nǎ lǐ', meaning: 'ở đâu' },
            ],
          },
          {
            hanzi: '几', pinyin: 'jǐ', tone: 3, meaning: 'mấy, bao nhiêu (số nhỏ)',
            radical: '几', radicalName: 'kỷ', radicalMeaning: 'cái ghế nhỏ', strokeCount: 2,
            examples: [
              { hanzi: '几个', pinyin: 'jǐ gè', meaning: 'mấy cái' },
              { hanzi: '几点', pinyin: 'jǐ diǎn', meaning: 'mấy giờ' },
            ],
          },
          {
            hanzi: '吗', pinyin: 'ma', tone: 0, meaning: 'trợ từ nghi vấn (đặt cuối câu hỏi)',
            radical: '口', radicalName: 'khẩu', radicalMeaning: 'cái miệng', strokeCount: 6,
            examples: [
              { hanzi: '好吗', pinyin: 'hǎo ma', meaning: 'có ổn không?' },
              { hanzi: '你好吗', pinyin: 'nǐ hǎo ma', meaning: 'bạn khỏe không?' },
            ],
          },
          {
            hanzi: '呢', pinyin: 'ne', tone: 0, meaning: 'trợ từ (…thì sao?)',
            radical: '口', radicalName: 'khẩu', radicalMeaning: 'cái miệng', strokeCount: 8,
            examples: [
              { hanzi: '你呢', pinyin: 'nǐ ne', meaning: 'còn bạn thì sao?' },
              { hanzi: '他呢', pinyin: 'tā ne', meaning: 'còn anh ấy thì sao?' },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 2,
    label: 'HSK 2',
    color: 'from-cyan-500 to-blue-500',
    lessons: [
      {
        id: 'hsk2-1',
        title: 'Thời gian',
        emoji: '⏰',
        description: 'Chữ chỉ ngày, tháng, năm và thời gian.',
        characters: [
          {
            hanzi: '日',
            pinyin: 'rì',
            tone: 4,
            meaning: 'ngày, mặt trời',
            radical: '日',
            radicalName: 'nhật',
            radicalMeaning: 'mặt trời, ngày',
            strokeCount: 4,
            examples: [
              { hanzi: '生日', pinyin: 'shēng rì', meaning: 'sinh nhật' },
              { hanzi: '日本', pinyin: 'rì běn', meaning: 'Nhật Bản' },
            ],
          },
          {
            hanzi: '月',
            pinyin: 'yuè',
            tone: 4,
            meaning: 'tháng, mặt trăng',
            radical: '月',
            radicalName: 'nguyệt',
            radicalMeaning: 'mặt trăng, tháng',
            strokeCount: 4,
            examples: [
              { hanzi: '一月', pinyin: 'yī yuè', meaning: 'tháng Một' },
              { hanzi: '月亮', pinyin: 'yuè liang', meaning: 'mặt trăng' },
            ],
          },
          {
            hanzi: '天',
            pinyin: 'tiān',
            tone: 1,
            meaning: 'trời, ngày',
            radical: '大',
            radicalName: 'đại',
            radicalMeaning: 'to lớn',
            strokeCount: 4,
            examples: [
              { hanzi: '今天', pinyin: 'jīn tiān', meaning: 'hôm nay' },
              { hanzi: '天气', pinyin: 'tiān qì', meaning: 'thời tiết' },
            ],
          },
          {
            hanzi: '年',
            pinyin: 'nián',
            tone: 2,
            meaning: 'năm',
            radical: '干',
            radicalName: 'can',
            radicalMeaning: 'cái chày, khô',
            strokeCount: 6,
            examples: [
              { hanzi: '今年', pinyin: 'jīn nián', meaning: 'năm nay' },
              { hanzi: '去年', pinyin: 'qù nián', meaning: 'năm ngoái' },
            ],
          },
          {
            hanzi: '时',
            pinyin: 'shí',
            tone: 2,
            meaning: 'thời gian, giờ',
            radical: '日',
            radicalName: 'nhật',
            radicalMeaning: 'mặt trời, ngày',
            strokeCount: 7,
            examples: [
              { hanzi: '时间', pinyin: 'shí jiān', meaning: 'thời gian' },
              { hanzi: '小时', pinyin: 'xiǎo shí', meaning: 'tiếng đồng hồ' },
            ],
          },
        ],
      },
      {
        id: 'hsk2-2',
        title: 'Động từ thường dùng',
        emoji: '🏃',
        description: 'Những động từ xuất hiện nhiều nhất khi giao tiếp.',
        characters: [
          {
            hanzi: '去',
            pinyin: 'qù',
            tone: 4,
            meaning: 'đi (đến đâu đó)',
            radical: '厶',
            radicalName: 'khư',
            radicalMeaning: 'riêng tư, ích kỷ',
            strokeCount: 5,
            examples: [
              { hanzi: '去学校', pinyin: 'qù xué xiào', meaning: 'đi đến trường' },
              { hanzi: '出去', pinyin: 'chū qù', meaning: 'đi ra ngoài' },
            ],
          },
          {
            hanzi: '来',
            pinyin: 'lái',
            tone: 2,
            meaning: 'đến, tới',
            radical: '木',
            radicalName: 'mộc',
            radicalMeaning: 'cây, gỗ',
            strokeCount: 7,
            examples: [
              { hanzi: '过来', pinyin: 'guò lái', meaning: 'lại đây' },
              { hanzi: '来自', pinyin: 'lái zì', meaning: 'đến từ' },
            ],
          },
          {
            hanzi: '看',
            pinyin: 'kàn',
            tone: 4,
            meaning: 'nhìn, xem, đọc',
            radical: '目',
            radicalName: 'mục',
            radicalMeaning: 'con mắt',
            strokeCount: 9,
            examples: [
              { hanzi: '看书', pinyin: 'kàn shū', meaning: 'đọc sách' },
              { hanzi: '看见', pinyin: 'kàn jiàn', meaning: 'nhìn thấy' },
            ],
          },
          {
            hanzi: '说',
            pinyin: 'shuō',
            tone: 1,
            meaning: 'nói',
            radical: '讠',
            radicalName: 'ngôn',
            radicalMeaning: 'lời nói, ngôn ngữ',
            strokeCount: 9,
            examples: [
              { hanzi: '说话', pinyin: 'shuō huà', meaning: 'nói chuyện' },
              { hanzi: '说明', pinyin: 'shuō míng', meaning: 'giải thích' },
            ],
          },
          {
            hanzi: '想',
            pinyin: 'xiǎng',
            tone: 3,
            meaning: 'nghĩ, muốn, nhớ',
            radical: '心',
            radicalName: 'tâm',
            radicalMeaning: 'trái tim, tấm lòng',
            strokeCount: 13,
            examples: [
              { hanzi: '想家', pinyin: 'xiǎng jiā', meaning: 'nhớ nhà' },
              { hanzi: '想要', pinyin: 'xiǎng yào', meaning: 'muốn có' },
            ],
          },
        ],
      },
      {
        id: 'hsk2-3',
        title: 'Tính từ thường dùng',
        emoji: '🎨',
        description: 'Miêu tả sự vật: nhiều/ít, nóng/lạnh, nhanh.',
        characters: [
          {
            hanzi: '多', pinyin: 'duō', tone: 1, meaning: 'nhiều',
            radical: '夕', radicalName: 'tịch', radicalMeaning: 'buổi tối, hoàng hôn', strokeCount: 6,
            examples: [
              { hanzi: '很多', pinyin: 'hěn duō', meaning: 'rất nhiều' },
              { hanzi: '多少', pinyin: 'duō shao', meaning: 'bao nhiêu' },
            ],
          },
          {
            hanzi: '少', pinyin: 'shǎo', tone: 3, meaning: 'ít',
            radical: '小', radicalName: 'tiểu', radicalMeaning: 'nhỏ bé', strokeCount: 4,
            examples: [
              { hanzi: '很少', pinyin: 'hěn shǎo', meaning: 'rất ít' },
              { hanzi: '不少', pinyin: 'bù shǎo', meaning: 'không ít, khá nhiều' },
            ],
          },
          {
            hanzi: '冷', pinyin: 'lěng', tone: 3, meaning: 'lạnh',
            radical: '冫', radicalName: 'băng', radicalMeaning: 'băng, giá lạnh', strokeCount: 7,
            examples: [
              { hanzi: '很冷', pinyin: 'hěn lěng', meaning: 'rất lạnh' },
              { hanzi: '天冷', pinyin: 'tiān lěng', meaning: 'trời lạnh' },
            ],
          },
          {
            hanzi: '热', pinyin: 'rè', tone: 4, meaning: 'nóng',
            radical: '灬', radicalName: 'hỏa', radicalMeaning: 'lửa (bộ bốn chấm)', strokeCount: 10,
            examples: [
              { hanzi: '很热', pinyin: 'hěn rè', meaning: 'rất nóng' },
              { hanzi: '天热', pinyin: 'tiān rè', meaning: 'trời nóng' },
            ],
          },
          {
            hanzi: '快', pinyin: 'kuài', tone: 4, meaning: 'nhanh',
            radical: '忄', radicalName: 'tâm đứng', radicalMeaning: 'trái tim, cảm xúc', strokeCount: 7,
            examples: [
              { hanzi: '很快', pinyin: 'hěn kuài', meaning: 'rất nhanh' },
              { hanzi: '快乐', pinyin: 'kuài lè', meaning: 'vui vẻ' },
            ],
          },
        ],
      },
      {
        id: 'hsk2-4',
        title: 'Gia đình',
        emoji: '👪',
        description: 'Gọi tên các thành viên trong gia đình.',
        characters: [
          {
            hanzi: '爸', pinyin: 'bà', tone: 4, meaning: 'bố, ba',
            radical: '父', radicalName: 'phụ', radicalMeaning: 'người cha', strokeCount: 8,
            examples: [
              { hanzi: '爸爸', pinyin: 'bàba', meaning: 'bố' },
              { hanzi: '爸妈', pinyin: 'bà mā', meaning: 'bố mẹ' },
            ],
          },
          {
            hanzi: '妈', pinyin: 'mā', tone: 1, meaning: 'mẹ, má',
            radical: '女', radicalName: 'nữ', radicalMeaning: 'phụ nữ, con gái', strokeCount: 6,
            examples: [
              { hanzi: '妈妈', pinyin: 'māma', meaning: 'mẹ' },
              { hanzi: '妈妈好', pinyin: 'māma hǎo', meaning: 'mẹ khỏe' },
            ],
          },
          {
            hanzi: '哥', pinyin: 'gē', tone: 1, meaning: 'anh trai',
            radical: '口', radicalName: 'khẩu', radicalMeaning: 'cái miệng', strokeCount: 10,
            examples: [
              { hanzi: '哥哥', pinyin: 'gēge', meaning: 'anh trai' },
              { hanzi: '大哥', pinyin: 'dà gē', meaning: 'anh cả' },
            ],
          },
          {
            hanzi: '姐', pinyin: 'jiě', tone: 3, meaning: 'chị gái',
            radical: '女', radicalName: 'nữ', radicalMeaning: 'phụ nữ, con gái', strokeCount: 8,
            examples: [
              { hanzi: '姐姐', pinyin: 'jiějie', meaning: 'chị gái' },
              { hanzi: '大姐', pinyin: 'dà jiě', meaning: 'chị cả' },
            ],
          },
          {
            hanzi: '弟', pinyin: 'dì', tone: 4, meaning: 'em trai',
            radical: '弓', radicalName: 'cung', radicalMeaning: 'cái cung (bắn tên)', strokeCount: 7,
            examples: [
              { hanzi: '弟弟', pinyin: 'dìdi', meaning: 'em trai' },
              { hanzi: '兄弟', pinyin: 'xiōng dì', meaning: 'anh em' },
            ],
          },
        ],
      },
      {
        id: 'hsk2-5',
        title: 'Màu sắc & Đồ vật',
        emoji: '🎨',
        description: 'Màu cơ bản và vài đồ vật quen thuộc.',
        characters: [
          {
            hanzi: '红', pinyin: 'hóng', tone: 2, meaning: 'màu đỏ',
            radical: '纟', radicalName: 'mịch', radicalMeaning: 'sợi tơ, màu sắc', strokeCount: 6,
            examples: [
              { hanzi: '红色', pinyin: 'hóng sè', meaning: 'màu đỏ' },
              { hanzi: '红茶', pinyin: 'hóng chá', meaning: 'hồng trà' },
            ],
          },
          {
            hanzi: '白', pinyin: 'bái', tone: 2, meaning: 'màu trắng',
            radical: '白', radicalName: 'bạch', radicalMeaning: 'màu trắng', strokeCount: 5,
            examples: [
              { hanzi: '白色', pinyin: 'bái sè', meaning: 'màu trắng' },
              { hanzi: '明白', pinyin: 'míng bai', meaning: 'hiểu rõ' },
            ],
          },
          {
            hanzi: '黑', pinyin: 'hēi', tone: 1, meaning: 'màu đen',
            radical: '黑', radicalName: 'hắc', radicalMeaning: 'màu đen', strokeCount: 12,
            examples: [
              { hanzi: '黑色', pinyin: 'hēi sè', meaning: 'màu đen' },
              { hanzi: '黑板', pinyin: 'hēi bǎn', meaning: 'bảng đen' },
            ],
          },
          {
            hanzi: '书', pinyin: 'shū', tone: 1, meaning: 'sách',
            radical: '乙', radicalName: 'ất', radicalMeaning: 'nét cong', strokeCount: 4,
            examples: [
              { hanzi: '看书', pinyin: 'kàn shū', meaning: 'đọc sách' },
              { hanzi: '书店', pinyin: 'shū diàn', meaning: 'hiệu sách' },
            ],
          },
          {
            hanzi: '钱', pinyin: 'qián', tone: 2, meaning: 'tiền',
            radical: '钅', radicalName: 'kim', radicalMeaning: 'kim loại', strokeCount: 10,
            examples: [
              { hanzi: '多少钱', pinyin: 'duōshao qián', meaning: 'bao nhiêu tiền' },
              { hanzi: '有钱', pinyin: 'yǒu qián', meaning: 'có tiền, giàu' },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 3,
    label: 'HSK 3',
    color: 'from-orange-500 to-rose-500',
    lessons: [
      {
        id: 'hsk3-1',
        title: 'Cảm xúc',
        emoji: '😊',
        description: 'Diễn tả cảm giác: mệt, vui, buồn, bận, sợ.',
        characters: [
          {
            hanzi: '累', pinyin: 'lèi', tone: 4, meaning: 'mệt, mệt mỏi',
            radical: '纟', radicalName: 'mịch', radicalMeaning: 'sợi tơ', strokeCount: 11,
            examples: [
              { hanzi: '很累', pinyin: 'hěn lèi', meaning: 'rất mệt' },
              { hanzi: '太累了', pinyin: 'tài lèi le', meaning: 'mệt quá' },
            ],
          },
          {
            hanzi: '笑', pinyin: 'xiào', tone: 4, meaning: 'cười',
            radical: '竹', radicalName: 'trúc', radicalMeaning: 'cây tre', strokeCount: 10,
            examples: [
              { hanzi: '笑话', pinyin: 'xiàohua', meaning: 'truyện cười' },
              { hanzi: '开玩笑', pinyin: 'kāi wánxiào', meaning: 'nói đùa' },
            ],
          },
          {
            hanzi: '哭', pinyin: 'kū', tone: 1, meaning: 'khóc',
            radical: '口', radicalName: 'khẩu', radicalMeaning: 'cái miệng', strokeCount: 10,
            examples: [
              { hanzi: '哭了', pinyin: 'kū le', meaning: 'đã khóc' },
              { hanzi: '别哭', pinyin: 'bié kū', meaning: 'đừng khóc' },
            ],
          },
          {
            hanzi: '忙', pinyin: 'máng', tone: 2, meaning: 'bận, bận rộn',
            radical: '忄', radicalName: 'tâm đứng', radicalMeaning: 'trái tim, cảm xúc', strokeCount: 6,
            examples: [
              { hanzi: '很忙', pinyin: 'hěn máng', meaning: 'rất bận' },
              { hanzi: '帮忙', pinyin: 'bāng máng', meaning: 'giúp đỡ' },
            ],
          },
          {
            hanzi: '怕', pinyin: 'pà', tone: 4, meaning: 'sợ',
            radical: '忄', radicalName: 'tâm đứng', radicalMeaning: 'trái tim, cảm xúc', strokeCount: 8,
            examples: [
              { hanzi: '害怕', pinyin: 'hài pà', meaning: 'sợ hãi' },
              { hanzi: '别怕', pinyin: 'bié pà', meaning: 'đừng sợ' },
            ],
          },
        ],
      },
      {
        id: 'hsk3-2',
        title: 'Động từ hữu ích',
        emoji: '🛠️',
        description: 'Động từ dùng nhiều: giúp, dùng, nhớ, quên, dạy.',
        characters: [
          {
            hanzi: '帮', pinyin: 'bāng', tone: 1, meaning: 'giúp đỡ',
            radical: '巾', radicalName: 'cân', radicalMeaning: 'cái khăn', strokeCount: 9,
            examples: [
              { hanzi: '帮助', pinyin: 'bāngzhù', meaning: 'giúp đỡ' },
              { hanzi: '帮我', pinyin: 'bāng wǒ', meaning: 'giúp tôi' },
            ],
          },
          {
            hanzi: '用', pinyin: 'yòng', tone: 4, meaning: 'dùng, sử dụng',
            radical: '用', radicalName: 'dụng', radicalMeaning: 'sử dụng', strokeCount: 5,
            examples: [
              { hanzi: '有用', pinyin: 'yǒu yòng', meaning: 'có ích' },
              { hanzi: '不用', pinyin: 'bú yòng', meaning: 'không cần' },
            ],
          },
          {
            hanzi: '记', pinyin: 'jì', tone: 4, meaning: 'ghi nhớ, ghi lại',
            radical: '讠', radicalName: 'ngôn', radicalMeaning: 'lời nói', strokeCount: 5,
            examples: [
              { hanzi: '记得', pinyin: 'jìde', meaning: 'nhớ được' },
              { hanzi: '日记', pinyin: 'rìjì', meaning: 'nhật ký' },
            ],
          },
          {
            hanzi: '忘', pinyin: 'wàng', tone: 4, meaning: 'quên',
            radical: '心', radicalName: 'tâm', radicalMeaning: 'trái tim', strokeCount: 7,
            examples: [
              { hanzi: '忘记', pinyin: 'wàngjì', meaning: 'quên mất' },
              { hanzi: '别忘了', pinyin: 'bié wàng le', meaning: 'đừng quên' },
            ],
          },
          {
            hanzi: '教', pinyin: 'jiāo', tone: 1, meaning: 'dạy',
            radical: '攵', radicalName: 'phộc', radicalMeaning: 'động tác đánh nhẹ', strokeCount: 11,
            examples: [
              { hanzi: '教我', pinyin: 'jiāo wǒ', meaning: 'dạy tôi' },
              { hanzi: '教书', pinyin: 'jiāo shū', meaning: 'dạy học' },
            ],
          },
        ],
      },
    ],
  },
]

/** Màu sắc theo thanh điệu (chuẩn phổ biến khi dạy pinyin). */
export const toneColors = {
  1: '#ef4444', // thanh 1 - ngang cao (đỏ)
  2: '#f59e0b', // thanh 2 - đi lên (cam)
  3: '#10b981', // thanh 3 - xuống rồi lên (xanh lá)
  4: '#3b82f6', // thanh 4 - đi xuống (xanh dương)
  0: '#9ca3af', // thanh nhẹ (xám)
}

export const toneNames = {
  1: 'Thanh 1 — ngang, cao và đều (ā)',
  2: 'Thanh 2 — đi lên như câu hỏi (á)',
  3: 'Thanh 3 — xuống thấp rồi lên (ǎ)',
  4: 'Thanh 4 — đổ xuống dứt khoát (à)',
  0: 'Thanh nhẹ — đọc nhẹ, ngắn (a)',
}

/** Trả về mảng phẳng tất cả chữ Hán kèm thông tin cấp độ/bài học. */
export function getAllCharacters() {
  const out = []
  for (const level of hskData) {
    for (const lesson of level.lessons) {
      for (const char of lesson.characters) {
        out.push({ ...char, level: level.level, lessonId: lesson.id, lessonTitle: lesson.title })
      }
    }
  }
  return out
}

/** Tìm một bài học theo id. */
export function getLessonById(id) {
  for (const level of hskData) {
    const lesson = level.lessons.find((l) => l.id === id)
    if (lesson) return { ...lesson, level: level.level, levelLabel: level.label }
  }
  return null
}

/** Tổng số chữ trong toàn bộ dữ liệu. */
export function getTotalCharacterCount() {
  return getAllCharacters().length
}
