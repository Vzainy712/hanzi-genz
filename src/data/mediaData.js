/**
 * Kho câu thoại phim/drama, lời MV nhạc Trung và trend Douyin (TikTok Trung Quốc).
 * Mục tiêu: "chill mà vẫn ôn bài" - học ngữ pháp & từ vựng qua nội dung giải trí thật.
 *
 * @typedef {Object} MediaSentence
 * @property {string} id
 * @property {string} hanzi
 * @property {string} pinyin
 * @property {string} vi        - Nghĩa tiếng Việt
 * @property {'movie'|'mv'|'douyin'} type - movie: thoại phim/drama; mv: lời bài hát/MV; douyin: trend/meme Douyin
 * @property {string} source    - Tên phim/bài hát/trend
 * @property {string} note      - Bối cảnh, độ viral, cách dùng
 * @property {string|null} grammarId - Điểm ngữ pháp liên quan (id trong grammarData)
 * @property {number} level     - Cấp HSK gợi ý
 */

export const mediaSentences = [
  // ===== THOẠI PHIM / DRAMA =====
  {
    id: 'md-houzi',
    hanzi: '你是猴子请来的救兵吗？',
    pinyin: 'nǐ shì hóuzi qǐng lái de jiùbīng ma?',
    vi: 'Ngươi là cứu binh do con khỉ mời tới à?',
    type: 'movie',
    source: 'Tây Du Ký 1986 (西游记)',
    note: 'Câu thoại của Hồng Hài Nhi - thành meme quốc dân để trêu ai đó xuất hiện "đúng lúc". Mẫu câu 是…吗 chuẩn sách giáo khoa!',
    grammarId: 'gr-ma',
    level: 2,
  },
  {
    id: 'md-chenqie',
    hanzi: '臣妾做不到啊！',
    pinyin: 'chénqiè zuò bu dào a!',
    vi: 'Thần thiếp làm không nổi à!',
    type: 'movie',
    source: 'Chân Hoàn Truyện (甄嬛传)',
    note: 'Thoại của Hoàng hậu - meme "bó tay, không làm nổi" phủ sóng mạng Trung. 做不到 = làm không được.',
    grammarId: null,
    level: 3,
  },
  {
    id: 'md-anquan',
    hanzi: '道路千万条，安全第一条',
    pinyin: 'dàolù qiān wàn tiáo, ānquán dì yī tiáo',
    vi: 'Đường có nghìn vạn nẻo, an toàn là số một',
    type: 'movie',
    source: 'Lưu Lạc Địa Cầu (流浪地球)',
    note: 'Câu nhắc an toàn giao thông trong phim - viral tới mức công an Trung Quốc dùng làm khẩu hiệu thật.',
    grammarId: 'gr-measure-ge',
    level: 3,
  },
  {
    id: 'md-fenglang',
    hanzi: '风浪越大，鱼越贵',
    pinyin: 'fēnglàng yuè dà, yú yuè guì',
    vi: 'Sóng gió càng lớn, cá càng đắt',
    type: 'movie',
    source: 'Cuồng Phong (狂飙)',
    note: 'Thoại "trùm" Cao Khải Cường - meme về việc rủi ro lớn đi kèm phần thưởng lớn. Mẫu 越…越… kinh điển!',
    grammarId: 'gr-yue',
    level: 3,
  },
  {
    id: 'md-zidan',
    hanzi: '让子弹飞一会儿',
    pinyin: 'ràng zǐdàn fēi yíhuìr',
    vi: 'Cứ để viên đạn bay thêm một lúc',
    type: 'movie',
    source: 'Nhượng Tử Đạn Phi (让子弹飞)',
    note: 'Meme "đừng vội kết luận, chờ xem diễn biến" - dân mạng dùng mỗi khi có drama mới. Cấu trúc 让 + ai/cái gì + làm gì.',
    grammarId: 'gr-rang',
    level: 3,
  },
  {
    id: 'md-jiankang',
    hanzi: '健康快乐就行了',
    pinyin: 'jiànkāng kuàilè jiù xíng le',
    vi: 'Khoẻ mạnh vui vẻ là được rồi',
    type: 'movie',
    source: 'Xin Chào, Lý Hoán Anh (你好，李焕英)',
    note: 'Tinh thần của bà mẹ trong phim hài - cảm động doanh thu tỷ NDT: chỉ mong con khoẻ mạnh vui vẻ.',
    grammarId: null,
    level: 3,
  },

  // ===== LỜI MV / BÀI HÁT =====
  {
    id: 'md-guyongzhe',
    hanzi: '谁说站在光里的才算英雄',
    pinyin: 'shéi shuō zhàn zài guāng lǐ de cái suàn yīngxióng',
    vi: 'Ai bảo phải đứng trong ánh sáng mới được coi là anh hùng',
    type: 'mv',
    source: '孤勇者 (Cô Dũng Giả) - Trần Dịch Tấn',
    note: 'Hit quốc dân đến mức trẻ em cả Trung Quốc thuộc lòng - "bài hát mật khẩu" của học sinh tiểu học.',
    grammarId: 'gr-question-words',
    level: 3,
  },
  {
    id: 'md-xiaoxingyun',
    hanzi: '原来你是我最想留住的幸运',
    pinyin: 'yuánlái nǐ shì wǒ zuì xiǎng liúzhù de xìngyùn',
    vi: 'Hoá ra em là điều may mắn anh muốn giữ lại nhất',
    type: 'mv',
    source: '小幸运 (Tiểu May Mắn) - Điền Phức Chân',
    note: 'OST phim "Cô gái năm ấy chúng ta cùng theo đuổi" - câu thính huyền thoại của thanh xuân Cbiz.',
    grammarId: 'gr-shi',
    level: 3,
  },
  {
    id: 'md-qifengle',
    hanzi: '我曾难自拔于世界之大',
    pinyin: 'wǒ céng nán zìbá yú shìjiè zhī dà',
    vi: 'Tôi từng lạc lối giữa thế giới rộng lớn này',
    type: 'mv',
    source: '起风了 (Gió Nổi Rồi)',
    note: 'Bài hát "chữa lành" quốc dân - BGM của hàng triệu vlog du lịch, hoàng hôn trên Douyin.',
    grammarId: null,
    level: 3,
  },
  {
    id: 'md-gaobai',
    hanzi: '你是我的，我是你的',
    pinyin: 'nǐ shì wǒ de, wǒ shì nǐ de',
    vi: 'Em là của anh, anh là của em',
    type: 'mv',
    source: '告白气球 (Bóng Bay Tỏ Tình) - Châu Kiệt Luân',
    note: 'Tinh thần bài hit tỏ tình dễ thương nhất của Jay Chou - mẫu 是 + 的 sở hữu cực dễ nhớ.',
    grammarId: 'gr-de',
    level: 1,
  },

  // ===== TREND DOUYIN (TikTok Trung) =====
  {
    id: 'md-shuanq',
    hanzi: '栓Q',
    pinyin: 'shuān Q',
    vi: '"Thank you" phiên bản mỉa mai (cảm ơn mà như muốn khóc)',
    type: 'douyin',
    source: 'Trend Douyin - chú nông dân học tiếng Anh',
    note: 'Từ video chú Lưu ở Quảng Tây đọc "thank you" thành 栓Q. Dùng khi "cạn lời": 我真的栓Q = tôi thật sự cảm ơn (mà mệt mỏi).',
    grammarId: null,
    level: 1,
  },
  {
    id: 'md-zundu',
    hanzi: '尊嘟假嘟？',
    pinyin: 'zūn dū jiǎ dū?',
    vi: 'Thật hông dọ? (cách nói nhõng nhẽo của 真的假的)',
    type: 'douyin',
    source: 'Trend Douyin - giọng em bé',
    note: 'Biến âm dễ thương của 真的假的 (thật hay giả). Reply tin sốc nào cũng hợp. Học được từ 真 (thật)!',
    grammarId: null,
    level: 2,
  },
  {
    id: 'md-tingwoshuo',
    hanzi: '听我说谢谢你',
    pinyin: 'tīng wǒ shuō xièxie nǐ',
    vi: 'Nghe tôi nói này: cảm ơn bạn',
    type: 'douyin',
    source: 'Bài hát + điệu nhảy viral Douyin',
    note: 'Bài hát thiếu nhi thành trend nhảy cảm ơn "ám ảnh" cả mạng xã hội Trung. Câu chào tạm biệt của mọi video.',
    grammarId: null,
    level: 1,
  },
  {
    id: 'md-wayawa',
    hanzi: '挖呀挖呀挖',
    pinyin: 'wā ya wā ya wā',
    vi: 'Đào nè đào nè đào (bài hát mầm non viral)',
    type: 'douyin',
    source: 'Cô giáo mầm non hát trên Douyin',
    note: 'Cô giáo "Hoàng Lão Sư" hát bài trồng hoa cho bé - vài trăm triệu view, cả Trung Quốc hát theo.',
    grammarId: null,
    level: 1,
  },
  {
    id: 'md-pofangle',
    hanzi: '破防了',
    pinyin: 'pò fáng le',
    vi: 'Bị "xuyên thủng phòng tuyến" cảm xúc - xúc động/chạnh lòng quá',
    type: 'douyin',
    source: 'Slang gaming -> toàn mạng',
    note: 'Gốc từ game (vỡ giáp), giờ = "toang cảm xúc". Xem video cảm động: 我破防了 = tôi khóc thật rồi.',
    grammarId: null,
    level: 2,
  },
  {
    id: 'md-shesi',
    hanzi: '社死',
    pinyin: 'shè sǐ',
    vi: '"Chết xã hội" - quê độ tới mức muốn độn thổ',
    type: 'douyin',
    source: 'Viết tắt của 社会性死亡',
    note: 'Dùng khi gặp tình huống xấu hổ nơi công cộng: 今天太社死了 = hôm nay quê muốn chui xuống đất.',
    grammarId: null,
    level: 3,
  },
  {
    id: 'md-neijuan',
    hanzi: '内卷',
    pinyin: 'nèi juǎn',
    vi: '"Cuốn vào trong" - cuộc đua cạnh tranh vô nghĩa (rat race)',
    type: 'douyin',
    source: 'Buzzword xã hội Trung',
    note: 'Từ khoá thế hệ: ai cũng gồng để hơn nhau nhưng chẳng ai sung sướng hơn. Đối nghịch với 躺平 (nằm thẳng).',
    grammarId: null,
    level: 3,
  },
  {
    id: 'md-juejuezi',
    hanzi: '绝绝子',
    pinyin: 'jué jué zǐ',
    vi: 'Đỉnh xỉu, hết nước chấm (khen hết lời)',
    type: 'douyin',
    source: 'Slang show thần tượng -> Douyin',
    note: 'Phiên bản "cực cấp" của 绝了. Khen món ăn, cảnh đẹp, idol: 这个奶茶绝绝子 = trà sữa này đỉnh xỉu.',
    grammarId: null,
    level: 3,
  },
  {
    id: 'md-kemusan',
    hanzi: '科目三',
    pinyin: 'kēmù sān',
    vi: '"Môn thi số 3" - điệu nhảy lắc chân viral toàn cầu',
    type: 'douyin',
    source: 'Điệu nhảy đám cưới Quảng Tây -> Haidilao',
    note: 'Đùa rằng người Quảng Tây thi 3 môn: hát sơn ca, ăn mì gạo, và... nhảy điệu này. Nhân viên Haidilao nhảy phục vụ khách làm trend bùng nổ thế giới.',
    grammarId: null,
    level: 2,
  },
]

/** Lọc câu media theo điểm ngữ pháp. */
export function getMediaByGrammar(grammarId) {
  return mediaSentences.filter((s) => s.grammarId === grammarId)
}
