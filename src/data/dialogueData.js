/**
 * Kịch bản hội thoại nhập vai (kiểu chat WeChat) - 8 tình huống thực tế.
 * Mỗi bước: NPC nói -> chọn 1 trong 3 câu đáp (1 đúng, 2 "tấu hài").
 * Mỗi kịch bản cài cắm nhiều mẫu cú pháp: 要, 太…了, 能不能, 从…开始,
 * 别+động từ, 越来越, 一共, 还是, 虽然…但是, 一起…吧...
 *
 * Lưu ý UI: nghĩa tiếng Việt (v) bị làm mờ mặc định để luyện nhớ mặt chữ.
 */

export const dialogues = [
  {
    id: 'dl-milktea',
    emoji: '🧋',
    title: 'Đi mua trà sữa',
    desc: 'Order trà sữa như dân bản địa: chọn size, chọn topping, trả tiền.',
    npcName: 'Nhân viên quán',
    npcAvatar: '🧑‍🍳',
    steps: [
      {
        npc: { t: '你好！你要喝什么？', p: 'Nǐ hǎo! Nǐ yào hē shénme?', v: 'Xin chào! Bạn muốn uống gì?' },
        choices: [
          { t: '我要一杯奶茶。', p: 'Wǒ yào yì bēi nǎichá.', v: 'Cho mình một ly trà sữa.', ok: true },
          { t: '我是奶茶。', p: 'Wǒ shì nǎichá.', v: 'Tôi LÀ trà sữa.', ok: false, why: 'Bạn vừa tự nhận mình là trà sữa đó 😂 — 是 là "là", muốn nói "muốn" phải dùng 要.' },
          { t: '你要喝什么？', p: 'Nǐ yào hē shénme?', v: 'Bạn muốn uống gì?', ok: false, why: 'Hỏi ngược lại nhân viên thì ai bán cho ai đây 🤨' },
        ],
      },
      {
        npc: { t: '好的！大杯还是小杯？', p: 'Hǎo de! Dà bēi háishi xiǎo bēi?', v: 'OK! Ly lớn hay ly nhỏ? (mẫu A还是B: chọn một trong hai)' },
        choices: [
          { t: '大杯，谢谢！', p: 'Dà bēi, xièxie!', v: 'Ly lớn, cảm ơn!', ok: true },
          { t: '我很大。', p: 'Wǒ hěn dà.', v: 'Tôi rất to.', ok: false, why: 'Người ta hỏi ly, không hỏi bạn 🙈' },
          { t: '还是。', p: 'Háishi.', v: 'Hay là.', ok: false, why: '还是 dùng để hỏi "A hay B", không đứng một mình làm câu trả lời được 😅' },
        ],
      },
      {
        npc: { t: '要不要加珍珠？', p: 'Yào bu yào jiā zhēnzhū?', v: 'Có thêm trân châu không? (mẫu 要不要: có...không)' },
        choices: [
          { t: '要！多加一点，谢谢！', p: 'Yào! Duō jiā yìdiǎn, xièxie!', v: 'Có! Thêm nhiều chút nha, cảm ơn!', ok: true },
          { t: '珍珠是什么？可以吃吗？', p: 'Zhēnzhū shì shénme? Kěyǐ chī ma?', v: 'Trân châu là gì? Ăn được không?', ok: false, why: 'Uống trà sữa mà không biết trân châu?? GenZ nào cũng biết mà 🧋😂' },
          { t: '我不要钱。', p: 'Wǒ bú yào qián.', v: 'Tôi không cần tiền.', ok: false, why: 'Ai hỏi tiền đâu?? 珍珠 là trân châu, 钱 là tiền — đừng nhầm nha 💸' },
        ],
      },
      {
        npc: { t: '一共十八块。', p: 'Yígòng shíbā kuài.', v: 'Tổng cộng 18 tệ. (一共: tổng cộng)' },
        choices: [
          { t: '好的，给你钱。', p: 'Hǎo de, gěi nǐ qián.', v: 'OK, gửi bạn tiền.', ok: true },
          { t: '太好了，再见！', p: 'Tài hǎo le, zàijiàn!', v: 'Tuyệt quá, tạm biệt!', ok: false, why: 'Chưa trả tiền mà đã chạy?? 🏃💨' },
          { t: '你多少钱？', p: 'Nǐ duōshao qián?', v: 'BẠN giá bao nhiêu?', ok: false, why: 'Câu này hỏi giá... của nhân viên 💀 Hỏi giá đồ thì nói 这个多少钱.' },
        ],
      },
      {
        npc: { t: '谢谢！请等一下，马上就好！', p: 'Xièxie! Qǐng děng yíxià, mǎshàng jiù hǎo!', v: 'Cảm ơn! Chờ xíu, có ngay! (马上: ngay lập tức)' },
        choices: [
          { t: '好的，我在旁边等。', p: 'Hǎo de, wǒ zài pángbiān děng.', v: 'OK, mình đứng bên cạnh đợi.', ok: true },
          { t: '我不要了。', p: 'Wǒ bú yào le.', v: 'Thôi không lấy nữa.', ok: false, why: 'Trả tiền rồi mà huỷ?? Trà sữa không có lỗi 🥺' },
          { t: '马上是谁？', p: 'Mǎshàng shì shéi?', v: 'Mã Thượng là ai?', ok: false, why: '马上 = "ngay lập tức", không phải tên người đâu 🤣' },
        ],
      },
      {
        npc: { t: '你的奶茶好了！慢用！', p: 'Nǐ de nǎichá hǎo le! Màn yòng!', v: 'Trà sữa của bạn xong rồi! Dùng từ từ nhé!' },
        choices: [
          { t: '谢谢！看起来太好喝了！', p: 'Xièxie! Kàn qǐlai tài hǎo hē le!', v: 'Cảm ơn! Nhìn ngon quá trời! (太…了: quá...)', ok: true },
          { t: '我要慢慢地看它。', p: 'Wǒ yào mànmàn de kàn tā.', v: 'Tôi sẽ từ từ... ngắm nó.', ok: false, why: 'Mua để uống chứ đâu phải để ngắm 😂 Khen ngon thì nói 太好喝了!' },
          { t: '你也喝吗？', p: 'Nǐ yě hē ma?', v: 'Bạn cũng uống hả?', ok: false, why: 'Mời nhân viên uống chung ly của mình hơi kỳ á 😅' },
        ],
      },
    ],
  },
  {
    id: 'dl-crush',
    emoji: '💘',
    title: 'Bắt chuyện với crush',
    desc: 'Crush là bạn học mới người Trung — flirt có cú pháp, đừng để toang!',
    npcName: 'Crush 💕',
    npcAvatar: '😊',
    steps: [
      {
        npc: { t: '你好，你是新同学吗？', p: 'Nǐ hǎo, nǐ shì xīn tóngxué ma?', v: 'Chào cậu, cậu là bạn học mới à? (mẫu 是…吗)' },
        choices: [
          { t: '是的！很高兴认识你！', p: 'Shì de! Hěn gāoxìng rènshi nǐ!', v: 'Đúng rồi! Rất vui được quen cậu!', ok: true },
          { t: '你多大？', p: 'Nǐ duō dà?', v: 'Cậu bao nhiêu tuổi?', ok: false, why: 'Mới câu đầu đã tra hỏi tuổi — hơi "căng" á bestie 😬' },
          { t: '我不是人。', p: 'Wǒ bú shì rén.', v: 'Tôi không phải người.', ok: false, why: 'Crush chạy mất dép 👻' },
        ],
      },
      {
        npc: { t: '我也很高兴！你喜欢做什么？', p: 'Wǒ yě hěn gāoxìng! Nǐ xǐhuan zuò shénme?', v: 'Tớ cũng vui! Cậu thích làm gì? (也: cũng)' },
        choices: [
          { t: '我喜欢听音乐和看电影。你呢？', p: 'Wǒ xǐhuan tīng yīnyuè hé kàn diànyǐng. Nǐ ne?', v: 'Tớ thích nghe nhạc và xem phim. Còn cậu? (…你呢?)', ok: true },
          { t: '我喜欢你。', p: 'Wǒ xǐhuan nǐ.', v: 'Tớ thích... cậu.', ok: false, why: 'TỎ TÌNH LUÔN?? Mới quen 30 giây bình tĩnh nàoo 😳' },
          { t: '不知道。', p: 'Bù zhīdào.', v: 'Không biết.', ok: false, why: 'Rep nhạt thế này thì "toang" sớm 🧊' },
        ],
      },
      {
        npc: { t: '真的吗？我也喜欢看电影！你最喜欢什么电影？', p: 'Zhēn de ma? Wǒ yě xǐhuan kàn diànyǐng! Nǐ zuì xǐhuan shénme diànyǐng?', v: 'Thật hả? Tớ cũng thích phim! Cậu thích phim gì nhất? (最: nhất)' },
        choices: [
          { t: '我最喜欢中国电影，因为很有意思。', p: 'Wǒ zuì xǐhuan Zhōngguó diànyǐng, yīnwèi hěn yǒu yìsi.', v: 'Tớ thích phim Trung nhất, vì rất thú vị. (因为: bởi vì)', ok: true },
          { t: '看电影太累了，我要睡觉。', p: 'Kàn diànyǐng tài lèi le, wǒ yào shuìjiào.', v: 'Xem phim mệt lắm, tớ muốn ngủ.', ok: false, why: 'Đang bắt sóng mà đòi đi ngủ?? Tỉnh táo lên bestie 😴' },
          { t: '电影是什么？', p: 'Diànyǐng shì shénme?', v: 'Phim là cái gì?', ok: false, why: 'Vừa nói mình thích xem phim xong quên luôn — não cá vàng 🐠' },
        ],
      },
      {
        npc: { t: '哈哈，我们真像！周末你有时间吗？', p: 'Hāhā, wǒmen zhēn xiàng! Zhōumò nǐ yǒu shíjiān ma?', v: 'Haha, mình giống nhau ghê! Cuối tuần cậu rảnh không? (有…吗)' },
        choices: [
          { t: '有！周末我们一起去看电影吧！', p: 'Yǒu! Zhōumò wǒmen yìqǐ qù kàn diànyǐng ba!', v: 'Rảnh! Cuối tuần mình cùng đi xem phim đi! (一起…吧: cùng...nhé)', ok: true },
          { t: '我很忙，忙着想你。', p: 'Wǒ hěn máng, mángzhe xiǎng nǐ.', v: 'Tớ bận lắm, bận... nhớ cậu.', ok: false, why: 'Thính gắt quá liều lượng, crush "đứng hình" mất 5 giây 😂' },
          { t: '周末我要洗我的猫。', p: 'Zhōumò wǒ yào xǐ wǒ de māo.', v: 'Cuối tuần tớ phải... tắm cho mèo.', ok: false, why: 'Lý do từ chối huyền thoại — cơ hội vàng bay màu 🐱' },
        ],
      },
      {
        npc: { t: '好啊！那我们加个微信吧？', p: 'Hǎo a! Nà wǒmen jiā ge Wēixìn ba?', v: 'Được đó! Vậy mình add WeChat nhé?' },
        choices: [
          { t: '好！这是我的微信号。', p: 'Hǎo! Zhè shì wǒ de Wēixìn hào.', v: 'Ok! Đây là WeChat của tớ. (这是…: đây là...)', ok: true },
          { t: '微信是什么？我用鸽子。', p: 'Wēixìn shì shénme? Wǒ yòng gēzi.', v: 'WeChat là gì? Tớ dùng... bồ câu đưa thư.', ok: false, why: 'Sống ở thế kỷ nào vậy bestie 🕊️😂' },
          { t: '不行。', p: 'Bù xíng.', v: 'Không được.', ok: false, why: 'Từ chối thẳng thừng sau khi rủ người ta đi chơi?? Logic ở đâu 🤯' },
        ],
      },
      {
        npc: { t: '太好了！那周末见！', p: 'Tài hǎo le! Nà zhōumò jiàn!', v: 'Tuyệt! Vậy cuối tuần gặp nhé!' },
        choices: [
          { t: '周末见！等你的消息！', p: 'Zhōumò jiàn! Děng nǐ de xiāoxi!', v: 'Cuối tuần gặp! Chờ tin nhắn của cậu!', ok: true },
          { t: '见什么？', p: 'Jiàn shénme?', v: 'Gặp cái gì cơ?', ok: false, why: 'Chính bạn rủ mà?? 🐠' },
          { t: '再见，妈妈！', p: 'Zàijiàn, māma!', v: 'Tạm biệt, MẸ!', ok: false, why: 'Gọi crush là mẹ... về ôm gối khóc đi 😭' },
        ],
      },
    ],
  },
  {
    id: 'dl-direction',
    emoji: '🗺️',
    title: 'Hỏi đường ở Bắc Kinh',
    desc: 'Lạc giữa Bắc Kinh: hỏi đường, chọn đi bộ hay tàu điện.',
    npcName: 'Cô bán hàng',
    npcAvatar: '👩‍🦱',
    steps: [
      {
        npc: { t: '你好，需要帮忙吗？', p: 'Nǐ hǎo, xūyào bāngmáng ma?', v: 'Chào cháu, cần giúp gì không?' },
        choices: [
          { t: '请问，火车站在哪儿？', p: 'Qǐngwèn, huǒchēzhàn zài nǎr?', v: 'Cho cháu hỏi, ga tàu ở đâu ạ? (请问: cho hỏi)', ok: true },
          { t: '你在哪儿？', p: 'Nǐ zài nǎr?', v: 'Cô đang ở đâu?', ok: false, why: 'Cô ấy đứng ngay trước mặt bạn mà?? 👀' },
          { t: '我不需要你。', p: 'Wǒ bù xūyào nǐ.', v: 'Tôi không cần cô.', ok: false, why: 'Phũ vậy ai giúp nữa 🥲' },
        ],
      },
      {
        npc: { t: '火车站有点远。你想走路还是坐地铁？', p: 'Huǒchēzhàn yǒudiǎn yuǎn. Nǐ xiǎng zǒulù háishi zuò dìtiě?', v: 'Ga tàu hơi xa. Cháu muốn đi bộ hay đi tàu điện ngầm? (有点: hơi; A还是B)' },
        choices: [
          { t: '坐地铁快一点吧。地铁站在哪儿？', p: 'Zuò dìtiě kuài yìdiǎn ba. Dìtiězhàn zài nǎr?', v: 'Đi tàu điện nhanh hơn ạ. Ga tàu điện ở đâu cô? (…一点: hơn một chút)', ok: true },
          { t: '我想飞。', p: 'Wǒ xiǎng fēi.', v: 'Cháu muốn... bay.', ok: false, why: 'Superman hả?? Chọn 走路 (đi bộ) hoặc 坐地铁 (tàu điện) thôi 😂' },
          { t: '火车站为什么远？', p: 'Huǒchēzhàn wèishénme yuǎn?', v: 'Tại sao ga tàu lại xa?', ok: false, why: 'Cô bán hàng đâu có xây cái ga đâu mà hỏi tại sao 🤣' },
        ],
      },
      {
        npc: { t: '地铁站就在前面，很近。', p: 'Dìtiězhàn jiù zài qiánmiàn, hěn jìn.', v: 'Ga tàu điện ngay phía trước, gần lắm. (就在: ngay tại)' },
        choices: [
          { t: '坐几号线？', p: 'Zuò jǐ hào xiàn?', v: 'Đi tuyến số mấy ạ? (几号线: tuyến số mấy)', ok: true },
          { t: '前面是什么？', p: 'Qiánmiàn shì shénme?', v: 'Phía trước là cái gì?', ok: false, why: 'Là ga tàu điện, cô vừa nói xong 🤦' },
          { t: '我怕地铁。', p: 'Wǒ pà dìtiě.', v: 'Cháu sợ tàu điện.', ok: false, why: 'Vừa chọn đi tàu điện xong giờ lại sợ?? Quyết đoán lên nào 😅' },
        ],
      },
      {
        npc: { t: '坐二号线，三站就到火车站了。', p: 'Zuò èr hào xiàn, sān zhàn jiù dào huǒchēzhàn le.', v: 'Đi tuyến 2, ba ga là tới ga tàu. (…就到了: là tới ngay)' },
        choices: [
          { t: '太好了，谢谢您！', p: 'Tài hǎo le, xièxie nín!', v: 'Tuyệt quá, cảm ơn cô ạ! (您: kính trọng)', ok: true },
          { t: '三站？太远了，我要哭了。', p: 'Sān zhàn? Tài yuǎn le, wǒ yào kū le.', v: 'Ba ga? Xa quá, cháu sắp khóc rồi.', ok: false, why: 'Ba ga tàu điện mà xa gì bestie 😂' },
          { t: '二号线多少钱一个？', p: 'Èr hào xiàn duōshao qián yí ge?', v: 'Tuyến số 2 bao nhiêu tiền một... cái?', ok: false, why: 'Tuyến tàu không bán theo "cái" nha 🚇😂 Hỏi giá vé thì nói 票多少钱.' },
        ],
      },
      {
        npc: { t: '不客气，路上小心，一路平安！', p: 'Bú kèqi, lùshang xiǎoxīn, yílù píng\'ān!', v: 'Không có gì, đi đường cẩn thận, thượng lộ bình an! (小心: cẩn thận)' },
        choices: [
          { t: '谢谢，再见！', p: 'Xièxie, zàijiàn!', v: 'Cảm ơn cô, tạm biệt ạ!', ok: true },
          { t: '你也去火车站吗？', p: 'Nǐ yě qù huǒchēzhàn ma?', v: 'Cô cũng ra ga tàu à?', ok: false, why: 'Cô ấy còn phải bán hàng mà 😅' },
          { t: '平安是谁？', p: 'Píng\'ān shì shéi?', v: 'Bình An là ai cơ?', ok: false, why: '平安 = bình an, là lời chúc chứ không phải tên người 🤣' },
        ],
      },
    ],
  },
  {
    id: 'dl-restaurant',
    emoji: '🍜',
    title: 'Gọi món ở nhà hàng',
    desc: 'Vào quán Trung gọi món trọn bộ: đặt bàn, order, khen ngon, tính tiền.',
    npcName: 'Phục vụ',
    npcAvatar: '🤵',
    steps: [
      {
        npc: { t: '欢迎光临！请问几位？', p: 'Huānyíng guānglín! Qǐngwèn jǐ wèi?', v: 'Kính chào quý khách! Cho hỏi mấy vị ạ? (几位: mấy người - lịch sự)' },
        choices: [
          { t: '两位，谢谢。', p: 'Liǎng wèi, xièxie.', v: 'Hai người, cảm ơn. (两 + lượng từ)', ok: true },
          { t: '我一个人，但是我很饿。', p: 'Wǒ yí ge rén, dànshì wǒ hěn è.', v: 'Tôi một mình, nhưng tôi RẤT đói.', ok: false, why: 'Thông tin "rất đói" hơi thừa với câu hỏi mấy người 😂 Mà thôi cũng relatable!' },
          { t: '你们几位？', p: 'Nǐmen jǐ wèi?', v: 'Các bạn mấy người?', ok: false, why: 'Hỏi ngược nhân viên?? Quán của người ta mà 🤨' },
        ],
      },
      {
        npc: { t: '请坐！你们要点什么菜？', p: 'Qǐng zuò! Nǐmen yào diǎn shénme cài?', v: 'Mời ngồi! Các bạn muốn gọi món gì? (点菜: gọi món)' },
        choices: [
          { t: '我要一个面条和一碗米饭。', p: 'Wǒ yào yí ge miàntiáo hé yì wǎn mǐfàn.', v: 'Cho mình một mì và một bát cơm. (碗: bát - lượng từ)', ok: true },
          { t: '我要吃菜单。', p: 'Wǒ yào chī càidān.', v: 'Tôi muốn ăn... cái thực đơn.', ok: false, why: '菜单 là tờ thực đơn, không ăn được nha 📋😂' },
          { t: '什么菜？我不知道。你呢？', p: 'Shénme cài? Wǒ bù zhīdào. Nǐ ne?', v: 'Món gì hả? Tôi không biết. Còn bạn?', ok: false, why: 'Hỏi phục vụ "còn bạn ăn gì" — người ta đi làm chứ có đi ăn đâu 😅' },
        ],
      },
      {
        npc: { t: '好的。要喝点什么吗？', p: 'Hǎo de. Yào hē diǎn shénme ma?', v: 'Dạ. Uống chút gì không ạ? (喝点什么: uống chút gì)' },
        choices: [
          { t: '两杯热茶，谢谢。', p: 'Liǎng bēi rè chá, xièxie.', v: 'Hai ly trà nóng, cảm ơn. (杯: ly - lượng từ)', ok: true },
          { t: '我要喝汤，大杯的。', p: 'Wǒ yào hē tāng, dà bēi de.', v: 'Cho tôi... canh, ly lớn.', ok: false, why: 'Canh đựng bát chứ ai đựng ly bao giờ 🍜😂' },
          { t: '不喝，我怕水。', p: 'Bù hē, wǒ pà shuǐ.', v: 'Không uống, tôi sợ nước.', ok: false, why: 'Sợ nước?? Bạn là mèo hả 🐱' },
        ],
      },
      {
        npc: { t: '菜来了！小心，很热！', p: 'Cài lái le! Xiǎoxīn, hěn rè!', v: 'Món ra rồi ạ! Cẩn thận, nóng lắm!' },
        choices: [
          { t: '哇，看起来太好吃了！', p: 'Wā, kàn qǐlai tài hǎochī le!', v: 'Woa, nhìn ngon quá! (看起来: trông có vẻ)', ok: true },
          { t: '热？那我明天再吃。', p: 'Rè? Nà wǒ míngtiān zài chī.', v: 'Nóng hả? Vậy mai tôi ăn.', ok: false, why: 'Đợi tới mai thì thành đồ nguội luôn rồi 😂 (再: rồi mới...)' },
          { t: '这是什么？我没点。', p: 'Zhè shì shénme? Wǒ méi diǎn.', v: 'Đây là gì? Tôi không gọi món này.', ok: false, why: 'Chính bạn gọi mì với cơm mà?? 🍜🐠' },
        ],
      },
      {
        npc: { t: '好吃吗？还要别的吗？', p: 'Hǎochī ma? Hái yào bié de ma?', v: 'Ngon không ạ? Còn cần gì nữa không? (还要…吗: còn muốn... nữa không)' },
        choices: [
          { t: '很好吃！虽然有点辣，但是我很喜欢！', p: 'Hěn hǎochī! Suīrán yǒudiǎn là, dànshì wǒ hěn xǐhuan!', v: 'Ngon lắm! Tuy hơi cay nhưng mình rất thích! (虽然…但是…)', ok: true },
          { t: '不好吃，但是我吃完了。', p: 'Bù hǎochī, dànshì wǒ chī wán le.', v: 'Không ngon, nhưng tôi ăn sạch rồi.', ok: false, why: 'Chê dở mà ăn hết sạch — miệng nói không mà thân thể rất thành thật 😂' },
          { t: '别的是什么菜？', p: 'Bié de shì shénme cài?', v: '"Món khác" là món gì?', ok: false, why: '别的 = "thứ khác" nói chung, không phải tên món nha 😅' },
        ],
      },
      {
        npc: { t: '一共六十八块。', p: 'Yígòng liùshíbā kuài.', v: 'Tổng cộng 68 tệ ạ.' },
        choices: [
          { t: '好的，可以用手机付钱吗？', p: 'Hǎo de, kěyǐ yòng shǒujī fù qián ma?', v: 'OK, trả bằng điện thoại được không? (可以…吗: có thể... không)', ok: true },
          { t: '太贵了！我要洗碗吗？', p: 'Tài guì le! Wǒ yào xǐ wǎn ma?', v: 'Đắt quá! Tôi phải... rửa bát trừ nợ hả?', ok: false, why: '68 tệ cho 2 người là bình thường mà, chưa tới mức rửa bát đâu 😂' },
          { t: '是你请我吗？', p: 'Shì nǐ qǐng wǒ ma?', v: 'Là bạn mời tôi hả?', ok: false, why: 'Nhân viên phục vụ mời bạn ăn?? Mơ đẹp quá bestie 💀' },
        ],
      },
    ],
  },
  {
    id: 'dl-shopping',
    emoji: '🛍️',
    title: 'Mặc cả ở chợ',
    desc: 'Kỹ năng sinh tồn ở chợ Trung Quốc: chê đắt, trả giá, chốt đơn.',
    npcName: 'Bà chủ sạp',
    npcAvatar: '👩‍💼',
    steps: [
      {
        npc: { t: '小朋友，进来看看！要买什么？', p: 'Xiǎopéngyǒu, jìnlai kànkan! Yào mǎi shénme?', v: 'Cưng ơi, vào xem đi! Muốn mua gì nào? (看看: xem thử)' },
        choices: [
          { t: '这件衣服多少钱？', p: 'Zhè jiàn yīfu duōshao qián?', v: 'Cái áo này bao nhiêu tiền ạ? (件: lượng từ cho áo)', ok: true },
          { t: '我不买，我只看你。', p: 'Wǒ bù mǎi, wǒ zhǐ kàn nǐ.', v: 'Tôi không mua, tôi chỉ... nhìn cô.', ok: false, why: 'Nghe hơi đáng sợ á 😳 Muốn nói "xem hàng" thì là 只看看.' },
          { t: '你要买什么？', p: 'Nǐ yào mǎi shénme?', v: 'Cô muốn mua gì?', ok: false, why: 'Bà chủ bán hàng mà bạn hỏi bà ấy mua gì 🤨' },
        ],
      },
      {
        npc: { t: '这件两百块，很漂亮的！', p: 'Zhè jiàn liǎngbǎi kuài, hěn piàoliang de!', v: 'Cái này 200 tệ, đẹp lắm đó!' },
        choices: [
          { t: '太贵了！能不能便宜一点？', p: 'Tài guì le! Néng bu néng piányi yìdiǎn?', v: 'Đắt quá! Bớt chút được không cô? (能不能: có thể...không)', ok: true },
          { t: '好的，我买十件。', p: 'Hǎo de, wǒ mǎi shí jiàn.', v: 'OK, tôi mua 10 cái.', ok: false, why: 'Chưa mặc cả mà đã chốt 10 cái?? Ví tiền đang khóc đó 💸😂' },
          { t: '两百块是多少钱？', p: 'Liǎngbǎi kuài shì duōshao qián?', v: '200 tệ là bao nhiêu tiền?', ok: false, why: '200 tệ... là 200 tệ chứ sao 🤣 Câu hỏi đi vào lòng đất!' },
        ],
      },
      {
        npc: { t: '哎呀，一百八，不能再便宜了！', p: 'Āiyā, yìbǎi bā, bù néng zài piányi le!', v: 'Trời ơi, 180, không bớt được nữa đâu! (不能再…了: không thể... hơn nữa)' },
        choices: [
          { t: '一百块吧！不行我就走了。', p: 'Yìbǎi kuài ba! Bù xíng wǒ jiù zǒu le.', v: '100 tệ đi! Không được thì cháu đi đây. (chiêu mặc cả kinh điển)', ok: true },
          { t: '好，一百九！', p: 'Hǎo, yìbǎi jiǔ!', v: 'OK, 190!', ok: false, why: 'Ơ kìa?? Mặc cả kiểu gì mà trả giá CAO hơn giá bà chủ vừa nói vậy 😂' },
          { t: '哎呀是什么意思？', p: 'Āiyā shì shénme yìsi?', v: '"Ai da" nghĩa là gì cô?', ok: false, why: '哎呀 là thán từ "trời ơi" thôi — đang mặc cả mà đi hỏi từ vựng 📚😂' },
        ],
      },
      {
        npc: { t: '你真会买东西！好吧好吧，一百二，卖给你！', p: 'Nǐ zhēn huì mǎi dōngxi! Hǎo ba hǎo ba, yìbǎi èr, mài gěi nǐ!', v: 'Cưng đúng là biết mua đồ! Thôi được được, 120, bán cho cưng đó! (会: giỏi việc gì)' },
        choices: [
          { t: '好的，成交！给您钱。', p: 'Hǎo de, chéngjiāo! Gěi nín qián.', v: 'OK, chốt đơn! Gửi cô tiền. (成交: chốt giao dịch)', ok: true },
          { t: '等等，我打电话问我妈。', p: 'Děngdeng, wǒ dǎ diànhuà wèn wǒ mā.', v: 'Khoan, để cháu gọi hỏi mẹ đã.', ok: false, why: 'Mặc cả xong xuôi hết rồi mới hỏi mẹ 😂 Bà chủ muốn xỉu ngang!' },
          { t: '一百二？太便宜了，两百吧！', p: 'Yìbǎi èr? Tài piányi le, liǎngbǎi ba!', v: '120? Rẻ quá, thôi 200 đi!', ok: false, why: 'Bạn là người mua hay người bán vậy trời 🤣' },
        ],
      },
      {
        npc: { t: '谢谢！下次再来啊！', p: 'Xièxie! Xià cì zài lái a!', v: 'Cảm ơn cưng! Lần sau lại ghé nha! (下次: lần sau)' },
        choices: [
          { t: '好的，再见！', p: 'Hǎo de, zàijiàn!', v: 'Dạ, chào cô!', ok: true },
          { t: '下次我要五十块。', p: 'Xià cì wǒ yào wǔshí kuài.', v: 'Lần sau cháu muốn giá 50 tệ.', ok: false, why: 'Mua xong rồi còn mặc cả cho... lần sau 😂 Đỉnh cao tiết kiệm!' },
          { t: '我不来了，太累了。', p: 'Wǒ bù lái le, tài lèi le.', v: 'Cháu không tới nữa đâu, mệt quá.', ok: false, why: 'Mặc cả có 3 câu mà mệt gì bestie 😂' },
        ],
      },
    ],
  },
  {
    id: 'dl-sick',
    emoji: '🤒',
    title: 'Đi khám bệnh',
    desc: 'Ốm rồi! Mô tả triệu chứng, nghe dặn dò của bác sĩ.',
    npcName: 'Bác sĩ',
    npcAvatar: '🧑‍⚕️',
    steps: [
      {
        npc: { t: '你好，请坐。你怎么了？', p: 'Nǐ hǎo, qǐng zuò. Nǐ zěnme le?', v: 'Chào em, mời ngồi. Em bị làm sao? (怎么了: bị sao thế)' },
        choices: [
          { t: '我头疼，还有点发烧。', p: 'Wǒ tóu téng, hái yǒudiǎn fāshāo.', v: 'Em đau đầu, còn hơi sốt nữa. (还: còn... nữa)', ok: true },
          { t: '我没事，我来看看你。', p: 'Wǒ méishì, wǒ lái kànkan nǐ.', v: 'Em không sao, em tới... thăm bác sĩ chơi.', ok: false, why: 'Bệnh viện đông lắm, không phải chỗ đi chơi nha 😂' },
          { t: '你怎么了？', p: 'Nǐ zěnme le?', v: 'BÁC SĨ bị làm sao?', ok: false, why: 'Bạn là bệnh nhân mà?? Đừng khám ngược bác sĩ 🤣' },
        ],
      },
      {
        npc: { t: '从什么时候开始的？', p: 'Cóng shénme shíhou kāishǐ de?', v: 'Bắt đầu từ khi nào? (从…开始: bắt đầu từ...)' },
        choices: [
          { t: '从昨天晚上开始的。', p: 'Cóng zuótiān wǎnshang kāishǐ de.', v: 'Từ tối hôm qua ạ.', ok: true },
          { t: '从我出生开始。', p: 'Cóng wǒ chūshēng kāishǐ.', v: 'Từ lúc em... mới sinh ra.', ok: false, why: 'Sốt từ lúc mới đẻ tới giờ?? 20 năm sốt liên tục chắc thành kỷ lục thế giới 😂' },
          { t: '我不知道，你知道吗？', p: 'Wǒ bù zhīdào, nǐ zhīdào ma?', v: 'Em không biết, bác sĩ biết không?', ok: false, why: 'Bệnh của em mà hỏi bác sĩ biết không 🤦😂' },
        ],
      },
      {
        npc: { t: '我看看…没什么大问题，是感冒了。', p: 'Wǒ kànkan… Méi shénme dà wèntí, shì gǎnmào le.', v: 'Để bác xem... Không có vấn đề gì lớn, bị cảm thôi. (没什么: không có gì)' },
        choices: [
          { t: '太好了！那我要吃药吗？', p: 'Tài hǎo le! Nà wǒ yào chī yào ma?', v: 'May quá! Vậy em có cần uống thuốc không? (要…吗: có cần... không)', ok: true },
          { t: '感冒？我要住院一年！', p: 'Gǎnmào? Wǒ yào zhùyuàn yì nián!', v: 'Cảm hả? Em muốn nhập viện... một năm!', ok: false, why: 'Cảm xoàng mà đòi nằm viện 1 năm — trốn deadline hả bestie 😂' },
          { t: '不可能！我没有感冒！', p: 'Bù kěnéng! Wǒ méiyǒu gǎnmào!', v: 'Không thể nào! Em không bị cảm!', ok: false, why: 'Cãi tay đôi với bác sĩ về bệnh của chính mình 🤨 Ai học y ở đây?' },
        ],
      },
      {
        npc: { t: '对，别担心。吃点药，多喝水，多休息。', p: 'Duì, bié dānxīn. Chī diǎn yào, duō hē shuǐ, duō xiūxi.', v: 'Ừ, đừng lo. Uống chút thuốc, uống nhiều nước, nghỉ ngơi nhiều. (别: đừng; 多+động từ: ...nhiều vào)' },
        choices: [
          { t: '好的，我记住了。谢谢医生！', p: 'Hǎo de, wǒ jìzhu le. Xièxie yīshēng!', v: 'Dạ, em nhớ rồi. Cảm ơn bác sĩ! (记住: nhớ kỹ)', ok: true },
          { t: '多喝水？可以多喝奶茶吗？', p: 'Duō hē shuǐ? Kěyǐ duō hē nǎichá ma?', v: 'Uống nhiều nước? Uống nhiều trà sữa được không ạ?', ok: false, why: 'Trà sữa không tính là nước chữa bệnh nha bestie 🧋😂 Bác sĩ: "..."' },
          { t: '休息是什么？我有三个deadline。', p: 'Xiūxi shì shénme? Wǒ yǒu sān ge deadline.', v: 'Nghỉ ngơi là gì ạ? Em có 3 cái deadline.', ok: false, why: 'Đau lòng quá, nhưng sức khoẻ trước deadline sau nha 🥲' },
        ],
      },
      {
        npc: { t: '三天以后再来看看。祝你早日康复！', p: 'Sān tiān yǐhòu zài lái kànkan. Zhù nǐ zǎorì kāngfù!', v: 'Ba ngày sau quay lại khám nhé. Chúc em mau khoẻ! (以后: sau khi; 祝: chúc)' },
        choices: [
          { t: '好的，三天以后见。谢谢您！', p: 'Hǎo de, sān tiān yǐhòu jiàn. Xièxie nín!', v: 'Dạ, ba ngày sau gặp lại. Cảm ơn bác sĩ ạ!', ok: true },
          { t: '三天？太久了，明天我就来。', p: 'Sān tiān? Tài jiǔ le, míngtiān wǒ jiù lái.', v: 'Ba ngày? Lâu quá, mai em tới luôn.', ok: false, why: 'Nhớ bác sĩ tới vậy hả 😂 Nghe lời dặn đi nào!' },
          { t: '康复是谁？', p: 'Kāngfù shì shéi?', v: 'Khang Phục là ai ạ?', ok: false, why: '康复 = hồi phục sức khoẻ, không phải tên người nha 🤣' },
        ],
      },
    ],
  },
  {
    id: 'dl-hotel',
    emoji: '🏨',
    title: 'Nhận phòng khách sạn',
    desc: 'Du lịch tự túc: check-in, hỏi wifi, hỏi giờ ăn sáng.',
    npcName: 'Lễ tân',
    npcAvatar: '💁‍♀️',
    steps: [
      {
        npc: { t: '晚上好！欢迎光临！', p: 'Wǎnshang hǎo! Huānyíng guānglín!', v: 'Chào buổi tối! Kính chào quý khách!' },
        choices: [
          { t: '你好，我要一个房间，住三天。', p: 'Nǐ hǎo, wǒ yào yí ge fángjiān, zhù sān tiān.', v: 'Chào bạn, mình cần một phòng, ở ba ngày. (住+thời gian)', ok: true },
          { t: '晚上好！这是你的家吗？', p: 'Wǎnshang hǎo! Zhè shì nǐ de jiā ma?', v: 'Chào buổi tối! Đây là nhà của bạn à?', ok: false, why: 'Đây là khách sạn mà 🤦 Lễ tân đứng hình 3 giây!' },
          { t: '我不住，我只想睡觉。', p: 'Wǒ bú zhù, wǒ zhǐ xiǎng shuìjiào.', v: 'Tôi không ở, tôi chỉ muốn... ngủ.', ok: false, why: 'Ngủ ở khách sạn thì chính là "ở" đó bestie 😂 (住 = lưu trú)' },
        ],
      },
      {
        npc: { t: '好的。请给我看一下您的护照。', p: 'Hǎo de. Qǐng gěi wǒ kàn yíxià nín de hùzhào.', v: 'Dạ. Cho mình xem hộ chiếu của quý khách ạ. (给…看一下: đưa... xem một chút)' },
        choices: [
          { t: '好的，给您。', p: 'Hǎo de, gěi nín.', v: 'Dạ, gửi bạn.', ok: true },
          { t: '护照？我用我的脸，可以吗？', p: 'Hùzhào? Wǒ yòng wǒ de liǎn, kěyǐ ma?', v: 'Hộ chiếu? Dùng mặt tôi được không?', ok: false, why: 'Mặt đẹp cỡ nào cũng không thay được hộ chiếu nha 😂' },
          { t: '你的护照呢？', p: 'Nǐ de hùzhào ne?', v: 'Thế hộ chiếu của BẠN đâu?', ok: false, why: 'Lễ tân làm ở đây, cần gì hộ chiếu 🤨' },
        ],
      },
      {
        npc: { t: '谢谢。您的房间在八楼，808号。', p: 'Xièxie. Nín de fángjiān zài bā lóu, bā líng bā hào.', v: 'Cảm ơn. Phòng của quý khách ở tầng 8, số 808. (楼: tầng)' },
        choices: [
          { t: '好的。请问，有没有Wi-Fi？', p: 'Hǎo de. Qǐngwèn, yǒu méiyǒu Wi-Fi?', v: 'Dạ. Cho hỏi có Wi-Fi không? (有没有: có... không)', ok: true },
          { t: '八楼？我怕高，给我一楼！', p: 'Bā lóu? Wǒ pà gāo, gěi wǒ yī lóu!', v: 'Tầng 8? Tôi sợ độ cao, cho tôi tầng 1!', ok: false, why: 'Tầng 8 thôi mà, có phải đỉnh Everest đâu 😂' },
          { t: '808是多少钱？', p: 'Bā líng bā shì duōshao qián?', v: '808 là bao nhiêu tiền?', ok: false, why: '808 là SỐ PHÒNG, không phải giá tiền nha 🤣' },
        ],
      },
      {
        npc: { t: '有！Wi-Fi密码就是您的房间号。', p: 'Yǒu! Wi-Fi mìmǎ jiùshì nín de fángjiān hào.', v: 'Có ạ! Mật khẩu Wi-Fi chính là số phòng của quý khách. (就是: chính là)' },
        choices: [
          { t: '明白了！早饭几点开始？', p: 'Míngbai le! Zǎofàn jǐ diǎn kāishǐ?', v: 'Hiểu rồi! Bữa sáng mấy giờ bắt đầu? (几点: mấy giờ)', ok: true },
          { t: '密码太难了，我记不住。', p: 'Mìmǎ tài nán le, wǒ jì bu zhù.', v: 'Mật khẩu khó quá, tôi không nhớ nổi.', ok: false, why: 'Là số phòng của bạn mà?? 3 chữ số thôi bestie 😂' },
          { t: '我不用Wi-Fi，我用爱上网。', p: 'Wǒ bú yòng Wi-Fi, wǒ yòng ài shàngwǎng.', v: 'Tôi không cần Wi-Fi, tôi lên mạng bằng... tình yêu.', ok: false, why: 'Thính đâu cũng thả 😂 Nhưng tình yêu không phát được 4G nha!' },
        ],
      },
      {
        npc: { t: '早饭从七点到十点，在二楼。祝您入住愉快！', p: 'Zǎofàn cóng qī diǎn dào shí diǎn, zài èr lóu. Zhù nín rùzhù yúkuài!', v: 'Bữa sáng từ 7h đến 10h, ở tầng 2. Chúc quý khách lưu trú vui vẻ! (从…到…: từ...đến...)' },
        choices: [
          { t: '太好了，谢谢！晚安！', p: 'Tài hǎo le, xièxie! Wǎn\'ān!', v: 'Tuyệt quá, cảm ơn! Chúc ngủ ngon! (晚安: good night)', ok: true },
          { t: '十点半可以吃吗？我爱睡觉。', p: 'Shí diǎn bàn kěyǐ chī ma? Wǒ ài shuìjiào.', v: '10 rưỡi ăn được không? Tôi cuồng ngủ lắm.', ok: false, why: 'Người ta nói TỚI 10h mà — dậy sớm nửa tiếng vì bữa sáng free đi bestie 😂' },
          { t: '愉快是什么房间？', p: 'Yúkuài shì shénme fángjiān?', v: '"Vui vẻ" là phòng nào?', ok: false, why: '愉快 = vui vẻ (lời chúc), không phải tên phòng nha 🤣' },
        ],
      },
    ],
  },
  {
    id: 'dl-birthday',
    emoji: '🎂',
    title: 'Tiệc sinh nhật bạn thân',
    desc: 'Dự sinh nhật bạn Trung: tặng quà, khen bánh, chúc mừng.',
    npcName: 'Bạn thân',
    npcAvatar: '🥳',
    steps: [
      {
        npc: { t: '你来了！欢迎欢迎！', p: 'Nǐ lái le! Huānyíng huānyíng!', v: 'Cậu tới rồi! Hoan nghênh hoan nghênh!' },
        choices: [
          { t: '生日快乐！这是给你的礼物！', p: 'Shēngrì kuàilè! Zhè shì gěi nǐ de lǐwù!', v: 'Chúc mừng sinh nhật! Đây là quà cho cậu! (给你的: dành cho cậu)', ok: true },
          { t: '今天是什么日子？', p: 'Jīntiān shì shénme rìzi?', v: 'Hôm nay là ngày gì vậy?', ok: false, why: 'Tới dự sinh nhật mà không biết là sinh nhật?? 🎂🐠' },
          { t: '我来了，饭呢？', p: 'Wǒ lái le, fàn ne?', v: 'Tôi tới rồi, đồ ăn đâu?', ok: false, why: 'Chưa chúc câu nào đã đòi ăn 😂 Chill đi bestie, tiệc mới bắt đầu!' },
        ],
      },
      {
        npc: { t: '谢谢你！你太好了！快进来坐！', p: 'Xièxie nǐ! Nǐ tài hǎo le! Kuài jìnlai zuò!', v: 'Cảm ơn cậu! Cậu tốt quá! Mau vào ngồi đi! (快+động từ: mau...)' },
        choices: [
          { t: '哇，你的家真漂亮！', p: 'Wā, nǐ de jiā zhēn piàoliang!', v: 'Woa, nhà cậu đẹp thật đó! (真: thật là)', ok: true },
          { t: '不好意思，我坐地上吧。', p: 'Bù hǎoyìsi, wǒ zuò dìshang ba.', v: 'Ngại quá, tớ ngồi... đất cũng được.', ok: false, why: 'Nhà người ta thiếu gì ghế mà đòi ngồi đất 😂 Khách sáo quá mức rồi!' },
          { t: '你家我家？', p: 'Nǐ jiā wǒ jiā?', v: 'Nhà cậu nhà tớ?', ok: false, why: 'Câu này nghe như đang chia tài sản vậy 😂 Khen nhà thì nói 真漂亮!' },
        ],
      },
      {
        npc: { t: '快尝尝这个蛋糕，是我自己做的！', p: 'Kuài chángchang zhège dàngāo, shì wǒ zìjǐ zuò de!', v: 'Mau nếm thử bánh kem này đi, tự tay tớ làm đó! (自己: tự mình; 尝尝: nếm thử)' },
        choices: [
          { t: '真的吗？看起来太好吃了！', p: 'Zhēn de ma? Kàn qǐlai tài hǎochī le!', v: 'Thật hả? Nhìn ngon quá trời!', ok: true },
          { t: '自己做的？那我不吃了。', p: 'Zìjǐ zuò de? Nà wǒ bù chī le.', v: 'Tự làm hả? Vậy thôi tớ không ăn đâu.', ok: false, why: 'PHŨ QUÁ RỒI 😭 Bạn thân làm cả buổi chiều đó!' },
          { t: '蛋糕会说话吗？', p: 'Dàngāo huì shuōhuà ma?', v: 'Bánh kem biết nói chuyện không?', ok: false, why: 'Hỏi gì lạ vậy bestie, bánh chứ có phải AI đâu 🤖😂' },
        ],
      },
      {
        npc: { t: '哈哈，你许愿了吗？帮我想一个愿望吧！', p: 'Hāhā, nǐ xǔyuàn le ma? Bāng wǒ xiǎng yí ge yuànwàng ba!', v: 'Haha, cậu ước gì chưa? Nghĩ giúp tớ một điều ước đi! (帮我+động từ: giúp tớ...)' },
        choices: [
          { t: '祝你越来越漂亮，天天开心！', p: 'Zhù nǐ yuè lái yuè piàoliang, tiāntiān kāixīn!', v: 'Chúc cậu ngày càng xinh, ngày nào cũng vui! (越来越: ngày càng; 天天: mỗi ngày)', ok: true },
          { t: '我希望你的蛋糕更好吃。', p: 'Wǒ xīwàng nǐ de dàngāo gèng hǎochī.', v: 'Tớ ước bánh của cậu... ngon hơn cái này.', ok: false, why: 'Khen mà như chê 😂 Ý là bánh này chưa ngon hả??' },
          { t: '我的愿望是你的礼物。', p: 'Wǒ de yuànwàng shì nǐ de lǐwù.', v: 'Điều ước của tớ là... món quà của cậu.', ok: false, why: 'Đòi lại quà bằng điều ước?? Đỉnh cao "cho đi là còn mãi... trong lòng" 😂' },
        ],
      },
      {
        npc: { t: '太谢谢你了！我们一起照张照片吧！', p: 'Tài xièxie nǐ le! Wǒmen yìqǐ zhào zhāng zhàopiàn ba!', v: 'Cảm ơn cậu nhiều lắm! Mình cùng chụp tấm ảnh đi! (张: lượng từ cho ảnh)' },
        choices: [
          { t: '好啊！一、二、三，茄子！', p: 'Hǎo a! Yī, èr, sān, qiézi!', v: 'Okê! Một, hai, ba... "qiézi"! (茄子 = cà tím, hô khi chụp ảnh như "cheese")', ok: true },
          { t: '等我十分钟，我要化妆。', p: 'Děng wǒ shí fēnzhōng, wǒ yào huàzhuāng.', v: 'Chờ tớ 10 phút, tớ phải trang điểm.', ok: false, why: 'Cả tiệc chờ mình bạn make up 😂 Tự tin lên, bạn xinh sẵn rồi!' },
          { t: '照片要多少钱？', p: 'Zhàopiàn yào duōshao qián?', v: 'Chụp ảnh mất bao nhiêu tiền?', ok: false, why: 'Bạn thân chụp bằng điện thoại mà, free nha 😂' },
        ],
      },
    ],
  },
]

/** Tìm kịch bản theo id. */
export function getDialogueById(id) {
  return dialogues.find((d) => d.id === id) || null
}
