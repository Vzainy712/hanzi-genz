/**
 * Kịch bản hội thoại nhập vai (kiểu chat WeChat).
 * Mỗi bước: NPC nói -> người học chọn 1 trong 3 câu đáp (1 đúng, 2 "tấu hài").
 * Chọn sai không mất lượt, chỉ nhận gợi ý vui - học qua thử & sai.
 *
 * @typedef {Object} Choice
 * @property {string} t  - Câu chữ Hán
 * @property {string} p  - Pinyin
 * @property {string} v  - Nghĩa tiếng Việt
 * @property {boolean} ok - Đáp án đúng?
 * @property {string} [why] - Vì sao sai (hiện khi chọn nhầm, giọng hài hước)
 */

export const dialogues = [
  {
    id: 'dl-milktea',
    emoji: '🧋',
    title: 'Đi mua trà sữa',
    desc: 'Order trà sữa bằng tiếng Trung như dân bản địa.',
    npcName: 'Nhân viên quán',
    npcAvatar: '🧑‍🍳',
    steps: [
      {
        npc: { t: '你好！你要喝什么？', p: 'Nǐ hǎo! Nǐ yào hē shénme?', v: 'Xin chào! Bạn muốn uống gì?' },
        choices: [
          { t: '我要一杯奶茶。', p: 'Wǒ yào yì bēi nǎichá.', v: 'Cho mình một ly trà sữa.', ok: true },
          { t: '我是奶茶。', p: 'Wǒ shì nǎichá.', v: 'Tôi LÀ trà sữa.', ok: false, why: 'Bạn vừa tự nhận mình là trà sữa đó 😂 — 是 nghĩa là "là", muốn "muốn/cần" phải dùng 要.' },
          { t: '你要喝什么？', p: 'Nǐ yào hē shénme?', v: 'Bạn muốn uống gì?', ok: false, why: 'Hỏi ngược lại nhân viên thì ai bán cho ai đây 🤨' },
        ],
      },
      {
        npc: { t: '好的！大杯还是小杯？', p: 'Hǎo de! Dà bēi háishi xiǎo bēi?', v: 'OK! Ly lớn hay ly nhỏ?' },
        choices: [
          { t: '大杯，谢谢！', p: 'Dà bēi, xièxie!', v: 'Ly lớn, cảm ơn!', ok: true },
          { t: '我很大。', p: 'Wǒ hěn dà.', v: 'Tôi rất to.', ok: false, why: 'Người ta hỏi ly, không hỏi bạn 🙈 — nhớ nói 大杯 (ly lớn).' },
          { t: '不客气。', p: 'Bú kèqi.', v: 'Không có gì.', ok: false, why: '不客气 dùng để đáp lại "cảm ơn" — chưa ai cảm ơn bạn mà 😅' },
        ],
      },
      {
        npc: { t: '一共十五块。', p: 'Yígòng shíwǔ kuài.', v: 'Tổng cộng 15 tệ ạ.' },
        choices: [
          { t: '好的，给你钱。', p: 'Hǎo de, gěi nǐ qián.', v: 'OK, gửi bạn tiền.', ok: true },
          { t: '太好了，再见！', p: 'Tài hǎo le, zàijiàn!', v: 'Tuyệt quá, tạm biệt!', ok: false, why: 'Ơ kìa chưa trả tiền mà đã chạy?? 🏃💨 Công an gọi bạn đó!' },
          { t: '你多少钱？', p: 'Nǐ duōshao qián?', v: 'BẠN giá bao nhiêu tiền?', ok: false, why: 'Câu này hỏi giá... của nhân viên 💀 Muốn hỏi giá món đồ thì nói 这个多少钱.' },
        ],
      },
      {
        npc: { t: '谢谢！请等一下，马上就好！', p: 'Xièxie! Qǐng děng yíxià, mǎshàng jiù hǎo!', v: 'Cảm ơn! Chờ chút xíu, có ngay đây!' },
        choices: [
          { t: '好的，谢谢你！', p: 'Hǎo de, xièxie nǐ!', v: 'OK, cảm ơn bạn!', ok: true },
          { t: '我不要了。', p: 'Wǒ bú yào le.', v: 'Thôi tôi không lấy nữa.', ok: false, why: 'Trả tiền xong rồi lại huỷ?? Trà sữa không có lỗi 🥺' },
          { t: '你是谁？', p: 'Nǐ shì shéi?', v: 'Bạn là ai?', ok: false, why: 'Nói chuyện nãy giờ mà giờ hỏi "bạn là ai" thì hơi kỳ á 😅' },
        ],
      },
    ],
  },
  {
    id: 'dl-crush',
    emoji: '💘',
    title: 'Bắt chuyện với crush',
    desc: 'Crush là bạn học mới người Trung — đừng để "toang" ngay câu đầu!',
    npcName: 'Crush 💕',
    npcAvatar: '😊',
    steps: [
      {
        npc: { t: '你好，你是新同学吗？', p: 'Nǐ hǎo, nǐ shì xīn tóngxué ma?', v: 'Chào cậu, cậu là bạn học mới à?' },
        choices: [
          { t: '是的！很高兴认识你！', p: 'Shì de! Hěn gāoxìng rènshi nǐ!', v: 'Đúng rồi! Rất vui được quen cậu!', ok: true },
          { t: '你多大？', p: 'Nǐ duō dà?', v: 'Cậu bao nhiêu tuổi?', ok: false, why: 'Mới câu đầu đã tra hỏi tuổi — hơi "căng" á bestie 😬' },
          { t: '我不是人。', p: 'Wǒ bú shì rén.', v: 'Tôi không phải người.', ok: false, why: 'Bạn vừa tự nhận không phải người... crush chạy mất dép 👻' },
        ],
      },
      {
        npc: { t: '我也很高兴！你喜欢做什么？', p: 'Wǒ yě hěn gāoxìng! Nǐ xǐhuan zuò shénme?', v: 'Tớ cũng vui lắm! Cậu thích làm gì?' },
        choices: [
          { t: '我喜欢听音乐和看电影。你呢？', p: 'Wǒ xǐhuan tīng yīnyuè hé kàn diànyǐng. Nǐ ne?', v: 'Tớ thích nghe nhạc và xem phim. Còn cậu?', ok: true },
          { t: '我喜欢你。', p: 'Wǒ xǐhuan nǐ.', v: 'Tớ thích... cậu.', ok: false, why: 'TỎ TÌNH LUÔN?? Mới quen 30 giây thôi bình tĩnh nàoo 😳' },
          { t: '不知道。', p: 'Bù zhīdào.', v: 'Không biết.', ok: false, why: 'Rep nhạt thế này thì cuộc trò chuyện "toang" sớm 🧊' },
        ],
      },
      {
        npc: { t: '真的吗？我也喜欢看电影！', p: 'Zhēn de ma? Wǒ yě xǐhuan kàn diànyǐng!', v: 'Thật hả? Tớ cũng thích xem phim!' },
        choices: [
          { t: '周末我们一起去看电影，怎么样？', p: 'Zhōumò wǒmen yìqǐ qù kàn diànyǐng, zěnmeyàng?', v: 'Cuối tuần mình cùng đi xem phim nhé, thế nào?', ok: true },
          { t: '哦。', p: 'Ò.', v: 'Ồ.', ok: false, why: '"Ồ." — một chữ kết thúc mọi cuộc vui 🪦 Cơ hội vàng mà rep vậy đó hả?' },
          { t: '我很忙。', p: 'Wǒ hěn máng.', v: 'Tớ bận lắm.', ok: false, why: 'Crush đang bắt sóng mà bạn "bận" — sau này đừng hối hận nha 😤' },
        ],
      },
      {
        npc: { t: '好啊！那周末见！', p: 'Hǎo a! Nà zhōumò jiàn!', v: 'Được đó! Vậy cuối tuần gặp nhé!' },
        choices: [
          { t: '好，周末见！', p: 'Hǎo, zhōumò jiàn!', v: 'Ừ, cuối tuần gặp nhé!', ok: true },
          { t: '见什么？', p: 'Jiàn shénme?', v: 'Gặp cái gì cơ?', ok: false, why: 'Chính bạn rủ người ta mà?? Não cá vàng huyền thoại 🐠' },
          { t: '再见，妈妈！', p: 'Zàijiàn, māma!', v: 'Tạm biệt, MẸ!', ok: false, why: 'Gọi crush là mẹ... thôi xong, về nhà ôm gối khóc đi 😭' },
        ],
      },
    ],
  },
  {
    id: 'dl-direction',
    emoji: '🗺️',
    title: 'Hỏi đường ở Bắc Kinh',
    desc: 'Lạc đường giữa Bắc Kinh, tìm đường ra ga tàu.',
    npcName: 'Cô bán hàng',
    npcAvatar: '👩‍🦱',
    steps: [
      {
        npc: { t: '你好，需要帮忙吗？', p: 'Nǐ hǎo, xūyào bāngmáng ma?', v: 'Chào cháu, cần giúp gì không?' },
        choices: [
          { t: '请问，火车站在哪儿？', p: 'Qǐngwèn, huǒchēzhàn zài nǎr?', v: 'Cho cháu hỏi, ga tàu ở đâu ạ?', ok: true },
          { t: '你在哪儿？', p: 'Nǐ zài nǎr?', v: 'Cô đang ở đâu?', ok: false, why: 'Cô ấy đứng ngay trước mặt bạn mà?? 👀' },
          { t: '我不需要你。', p: 'Wǒ bù xūyào nǐ.', v: 'Tôi không cần cô.', ok: false, why: 'Phũ vậy ai giúp nữa 🥲 Người ta có lòng mà.' },
        ],
      },
      {
        npc: { t: '火车站在前面，很近。', p: 'Huǒchēzhàn zài qiánmiàn, hěn jìn.', v: 'Ga tàu ở phía trước, gần lắm.' },
        choices: [
          { t: '走路要几分钟？', p: 'Zǒulù yào jǐ fēnzhōng?', v: 'Đi bộ mất mấy phút ạ?', ok: true },
          { t: '我不想去了。', p: 'Wǒ bù xiǎng qù le.', v: 'Thôi cháu không muốn đi nữa.', ok: false, why: 'Hỏi xong lại không đi?? Cô bán hàng: "…" 😑' },
          { t: '前面是什么？', p: 'Qiánmiàn shì shénme?', v: 'Phía trước là cái gì?', ok: false, why: 'Là ga tàu, cô vừa nói xong mà 🤦 Nghe kỹ nào!' },
        ],
      },
      {
        npc: { t: '大概十分钟就到了。', p: 'Dàgài shí fēnzhōng jiù dào le.', v: 'Tầm 10 phút là tới thôi.' },
        choices: [
          { t: '太好了，谢谢您！', p: 'Tài hǎo le, xièxie nín!', v: 'Tuyệt quá, cảm ơn cô ạ!', ok: true },
          { t: '太远了，我要哭了。', p: 'Tài yuǎn le, wǒ yào kū le.', v: 'Xa quá, cháu sắp khóc rồi.', ok: false, why: '10 phút mà xa gì bestie ơi 😂 Gen Z lười đi bộ là có thật.' },
          { t: '十块钱？', p: 'Shí kuài qián?', v: '10 tệ hả?', ok: false, why: '分钟 là PHÚT, 块 mới là tiền — hỏi đường free nha không ai thu phí đâu 😆' },
        ],
      },
      {
        npc: { t: '不客气，一路平安！', p: 'Bú kèqi, yílù píng\'ān!', v: 'Không có gì, thượng lộ bình an nhé!' },
        choices: [
          { t: '谢谢，再见！', p: 'Xièxie, zàijiàn!', v: 'Cảm ơn cô, tạm biệt ạ!', ok: true },
          { t: '你也去火车站吗？', p: 'Nǐ yě qù huǒchēzhàn ma?', v: 'Cô cũng ra ga tàu à?', ok: false, why: 'Cô ấy còn phải bán hàng mà, rủ chi vậy 😅' },
          { t: '平安是谁？', p: 'Píng\'ān shì shéi?', v: 'Bình An là ai cơ?', ok: false, why: '平安 = bình an, là lời chúc chứ không phải tên người nha 🤣' },
        ],
      },
    ],
  },
]

/** Tìm kịch bản theo id. */
export function getDialogueById(id) {
  return dialogues.find((d) => d.id === id) || null
}
