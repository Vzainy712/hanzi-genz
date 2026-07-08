/**
 * Hội thoại PHÂN NHÁNH - không có đáp án đúng/sai cố định.
 * Mỗi lựa chọn đều tiếp tục câu chuyện, nhưng NPC PHẢN HỒI KHÁC NHAU
 * tuỳ câu bạn chọn (reply riêng cho từng lựa chọn), có chỗ rẽ nhánh thật (next khác nhau).
 *
 * tone: 'smooth' (khéo léo +2) | 'ok' (ổn +1) | 'awkward' (mặn mòi +0)
 * -> cuối buổi chấm "EQ giao tiếp", không phạt, chỉ để vui.
 *
 * @typedef {{t:string,p:string,v:string}} Line
 * @typedef {{t:string,p:string,v:string,tone:'smooth'|'ok'|'awkward',reply:Line,next:string}} BranchChoice
 */

export const branchDialogues = [
  {
    id: 'dl-taxi',
    emoji: '🚕',
    title: 'Đi taxi & tán gẫu với tài xế',
    desc: 'Tài xế Trung Quốc nói nhiều lắm — trả lời sao cho mượt là cả nghệ thuật.',
    npcName: 'Tài xế Vương',
    npcAvatar: '👨‍✈️',
    branching: true,
    start: 'n1',
    nodes: {
      n1: {
        npc: { t: '你好！上车吧！去哪儿？', p: 'Nǐ hǎo! Shàng chē ba! Qù nǎr?', v: 'Chào bạn! Lên xe đi! Đi đâu nào?' },
        choices: [
          { t: '去机场，麻烦您快一点。', p: 'Qù jīchǎng, máfan nín kuài yìdiǎn.', v: 'Ra sân bay, phiền chú nhanh chút ạ.', tone: 'smooth',
            reply: { t: '好嘞！系好安全带，我们出发！', p: 'Hǎo lei! Jì hǎo ānquándài, wǒmen chūfā!', v: 'Được luôn! Thắt dây an toàn, xuất phát!' }, next: 'n2' },
          { t: '去天安门。', p: 'Qù Tiān\'ānmén.', v: 'Đi Thiên An Môn.', tone: 'ok',
            reply: { t: '好的，今天人多，可能有点堵啊。', p: 'Hǎo de, jīntiān rén duō, kěnéng yǒudiǎn dǔ a.', v: 'OK, hôm nay đông người, có thể hơi tắc đó.' }, next: 'n2' },
          { t: '我不知道，你想去哪儿就去哪儿。', p: 'Wǒ bù zhīdào, nǐ xiǎng qù nǎr jiù qù nǎr.', v: 'Cháu không biết, chú muốn đi đâu thì đi.', tone: 'awkward',
            reply: { t: '哈哈，开车十年第一次听到这样的！那先去市中心吧！', p: 'Hāhā, kāichē shí nián dì yī cì tīngdào zhèyàng de! Nà xiān qù shìzhōngxīn ba!', v: 'Haha, lái xe 10 năm lần đầu nghe kiểu này! Vậy ra trung tâm trước nhé!' }, next: 'n2' },
        ],
      },
      n2: {
        npc: { t: '你是外国人吧？中文说得真好！', p: 'Nǐ shì wàiguórén ba? Zhōngwén shuō de zhēn hǎo!', v: 'Bạn là người nước ngoài hả? Nói tiếng Trung chuẩn ghê!' },
        choices: [
          { t: '谢谢！我学了一年了，还在努力。', p: 'Xièxie! Wǒ xué le yì nián le, hái zài nǔlì.', v: 'Cảm ơn chú! Cháu học một năm rồi, vẫn đang cố gắng.', tone: 'smooth',
            reply: { t: '一年就这么好？你真聪明！', p: 'Yì nián jiù zhème hǎo? Nǐ zhēn cōngming!', v: 'Một năm mà giỏi vậy? Thông minh thật đó!' }, next: 'n3' },
          { t: '哪里哪里，还差得远呢。', p: 'Nǎli nǎli, hái chà de yuǎn ne.', v: 'Đâu có đâu, còn kém lắm ạ. (khiêm tốn kiểu Trung)', tone: 'smooth',
            reply: { t: '哟，连"哪里哪里"都会说，太地道了！', p: 'Yō, lián "nǎli nǎli" dōu huì shuō, tài dìdào le!', v: 'Ồ, biết cả "nả lỉ nả lỉ" luôn, chuẩn bản địa quá!' }, next: 'n3' },
          { t: '我是中国人。', p: 'Wǒ shì Zhōngguórén.', v: 'Cháu là người Trung Quốc.', tone: 'awkward',
            reply: { t: '真的吗？哈哈，我看你不太像，像留学生！', p: 'Zhēn de ma? Hāhā, wǒ kàn nǐ bú tài xiàng, xiàng liúxuéshēng!', v: 'Thật hả? Haha, nhìn không giống lắm, giống du học sinh hơn!' }, next: 'n3' },
        ],
      },
      n3: {
        npc: { t: '你从哪个国家来的？', p: 'Nǐ cóng nǎge guójiā lái de?', v: 'Bạn từ nước nào tới vậy?' },
        choices: [
          { t: '我从越南来的。', p: 'Wǒ cóng Yuènán lái de.', v: 'Cháu từ Việt Nam tới ạ.', tone: 'ok',
            reply: { t: '越南！我去过河内，越南粉太好吃了！', p: 'Yuènán! Wǒ qù guo Hénèi, Yuènán fěn tài hǎochī le!', v: 'Việt Nam! Chú từng đi Hà Nội, phở Việt Nam ngon xỉu!' }, next: 'n4' },
          { t: '你猜猜！', p: 'Nǐ cāicai!', v: 'Chú đoán thử xem!', tone: 'smooth',
            reply: { t: '嗯…泰国？马来西亚？哈哈我猜不到！', p: 'Ǹg… Tàiguó? Mǎláixīyà? Hāhā wǒ cāi bu dào!', v: 'Ừm... Thái Lan? Malaysia? Haha chịu thua!' }, next: 'n4' },
          { t: '这是秘密。', p: 'Zhè shì mìmì.', v: 'Đây là bí mật.', tone: 'awkward',
            reply: { t: '哈哈，好神秘啊！行行行，不问了。', p: 'Hāhā, hǎo shénmì a! Xíng xíng xíng, bú wèn le.', v: 'Haha, bí ẩn ghê! Được được, không hỏi nữa.' }, next: 'n4' },
        ],
      },
      n4: {
        npc: { t: '哎呀，前面堵车了。要不要走小路？', p: 'Āiyā, qiánmiàn dǔchē le. Yào bu yào zǒu xiǎolù?', v: 'Ây da, phía trước tắc đường rồi. Có muốn đi đường tắt không?' },
        choices: [
          { t: '好，听您的，您是专家！', p: 'Hǎo, tīng nín de, nín shì zhuānjiā!', v: 'Dạ, nghe chú, chú là chuyên gia mà!', tone: 'smooth',
            reply: { t: '哈哈你真会说话！走小路，五分钟就过去了！', p: 'Hāhā nǐ zhēn huì shuōhuà! Zǒu xiǎolù, wǔ fēnzhōng jiù guòqu le!', v: 'Haha bạn khéo miệng ghê! Đi đường tắt, 5 phút là qua!' }, next: 'n5' },
          { t: '没关系，我不着急，慢慢来。', p: 'Méi guānxi, wǒ bù zháojí, mànmàn lái.', v: 'Không sao, cháu không vội, từ từ cũng được.', tone: 'ok',
            reply: { t: '好心态！现在的年轻人都太着急了。', p: 'Hǎo xīntài! Xiànzài de niánqīngrén dōu tài zháojí le.', v: 'Tâm thái tốt đó! Giới trẻ giờ ai cũng vội vàng quá.' }, next: 'n5' },
          { t: '快点快点！我要迟到了！', p: 'Kuài diǎn kuài diǎn! Wǒ yào chídào le!', v: 'Nhanh lên nhanh lên! Cháu sắp muộn rồi!', tone: 'awkward',
            reply: { t: '别急别急，安全第一！道路千万条，安全第一条嘛！', p: 'Bié jí bié jí, ānquán dì yī! Dàolù qiān wàn tiáo, ānquán dì yī tiáo ma!', v: 'Đừng vội đừng vội, an toàn là trên hết! "Đường nghìn vạn nẻo, an toàn số một" mà!' }, next: 'n5' },
        ],
      },
      n5: {
        npc: { t: '你来中国是旅游还是工作啊？', p: 'Nǐ lái Zhōngguó shì lǚyóu háishi gōngzuò a?', v: 'Bạn tới Trung Quốc du lịch hay làm việc thế?' },
        choices: [
          { t: '我来学习中文，也想到处看看。', p: 'Wǒ lái xuéxí Zhōngwén, yě xiǎng dàochù kànkan.', v: 'Cháu tới học tiếng Trung, cũng muốn đi đó đây ngắm nghía.', tone: 'smooth',
            reply: { t: '好啊！年轻就要多看看世界！', p: 'Hǎo a! Niánqīng jiù yào duō kànkan shìjiè!', v: 'Tốt đó! Trẻ thì phải đi nhìn thế giới nhiều vào!' }, next: 'n6' },
          { t: '来工作的，天天加班。', p: 'Lái gōngzuò de, tiāntiān jiābān.', v: 'Tới làm việc ạ, ngày nào cũng tăng ca.', tone: 'ok',
            reply: { t: '哎，加班太累了，要注意身体啊！', p: 'Āi, jiābān tài lèi le, yào zhùyì shēntǐ a!', v: 'Ôi, tăng ca mệt lắm, chú ý sức khoẻ nha!' }, next: 'n6' },
          { t: '我来找我的爱情。', p: 'Wǒ lái zhǎo wǒ de àiqíng.', v: 'Cháu tới đây... tìm tình yêu.', tone: 'awkward',
            reply: { t: '哈哈哈！小伙子有意思！祝你早日找到！', p: 'Hāhāhā! Xiǎohuǒzi yǒu yìsi! Zhù nǐ zǎorì zhǎodào!', v: 'Hahaha! Vui tính ghê! Chúc sớm tìm được nha!' }, next: 'n6' },
        ],
      },
      n6: {
        npc: { t: '前面就到了。停在门口可以吗？', p: 'Qiánmiàn jiù dào le. Tíng zài ménkǒu kěyǐ ma?', v: 'Phía trước là tới rồi. Dừng ở cổng được không?' },
        choices: [
          { t: '可以，就停这儿吧，谢谢！', p: 'Kěyǐ, jiù tíng zhèr ba, xièxie!', v: 'Được ạ, dừng đây luôn, cảm ơn chú!', tone: 'smooth',
            reply: { t: '好嘞，到了！', p: 'Hǎo lei, dào le!', v: 'Được luôn, tới nơi!' }, next: 'n7' },
          { t: '麻烦再往前开一点。', p: 'Máfan zài wǎng qián kāi yìdiǎn.', v: 'Phiền chú chạy lên trước chút nữa ạ.', tone: 'ok',
            reply: { t: '没问题，说停就停啊。', p: 'Méi wèntí, shuō tíng jiù tíng a.', v: 'Không vấn đề, bảo dừng là dừng nha.' }, next: 'n7' },
          { t: '不可以，我还想坐一会儿。', p: 'Bù kěyǐ, wǒ hái xiǎng zuò yíhuìr.', v: 'Không được, cháu còn muốn ngồi thêm lát nữa.', tone: 'awkward',
            reply: { t: '哈哈，坐上瘾了？计价器还在走哦！', p: 'Hāhā, zuò shàngyǐn le? Jìjiàqì hái zài zǒu o!', v: 'Haha, ngồi nghiện luôn hả? Đồng hồ tính tiền vẫn chạy đó nha!' }, next: 'n7' },
        ],
      },
      n7: {
        npc: { t: '一共三十五块。', p: 'Yígòng sānshíwǔ kuài.', v: 'Tổng cộng 35 tệ.' },
        choices: [
          { t: '微信支付可以吗？', p: 'Wēixìn zhīfù kěyǐ ma?', v: 'Trả bằng WeChat được không ạ?', tone: 'smooth',
            reply: { t: '当然可以，扫这个码。收到了！', p: 'Dāngrán kěyǐ, sǎo zhège mǎ. Shōudào le!', v: 'Tất nhiên được, quét mã này. Nhận được rồi!' }, next: 'n8' },
          { t: '给您现金，不用找了。', p: 'Gěi nín xiànjīn, bú yòng zhǎo le.', v: 'Gửi chú tiền mặt, khỏi thối ạ.', tone: 'smooth',
            reply: { t: '哟，大方！谢谢啊！', p: 'Yō, dàfang! Xièxie a!', v: 'Ồ, hào phóng! Cảm ơn nha!' }, next: 'n8' },
          { t: '三十五？太贵了吧！', p: 'Sānshíwǔ? Tài guì le ba!', v: '35 tệ? Đắt quá vậy!', tone: 'awkward',
            reply: { t: '哈哈，打表的价格，一分都不骗你！', p: 'Hāhā, dǎbiǎo de jiàgé, yì fēn dōu bú piàn nǐ!', v: 'Haha, giá theo đồng hồ đó, không gian bạn một xu nào!' }, next: 'n8' },
        ],
      },
      n8: {
        npc: { t: '下车小心，慢走啊！有缘再见！', p: 'Xià chē xiǎoxīn, màn zǒu a! Yǒuyuán zàijiàn!', v: 'Xuống xe cẩn thận, đi thong thả nha! Hữu duyên gặp lại!' },
        end: true,
      },
    },
  },
  {
    id: 'dl-hotpot',
    emoji: '🍲',
    title: 'Ăn lẩu với bạn thân',
    desc: 'Văn hoá lẩu Trung Quốc: chọn độ cay, pha nước chấm, và trận chiến giành trả tiền.',
    npcName: 'Bạn thân A Minh',
    npcAvatar: '😄',
    branching: true,
    start: 'n1',
    nodes: {
      n1: {
        npc: { t: '今天我带你去吃火锅，怎么样？', p: 'Jīntiān wǒ dài nǐ qù chī huǒguō, zěnmeyàng?', v: 'Hôm nay tớ dẫn cậu đi ăn lẩu, thế nào?' },
        choices: [
          { t: '太好了！我早就想吃火锅了！', p: 'Tài hǎo le! Wǒ zǎo jiù xiǎng chī huǒguō le!', v: 'Tuyệt quá! Tớ thèm lẩu lâu lắm rồi!', tone: 'smooth',
            reply: { t: '哈哈就知道你会喜欢！走走走！', p: 'Hāhā jiù zhīdào nǐ huì xǐhuan! Zǒu zǒu zǒu!', v: 'Haha biết ngay cậu sẽ thích mà! Đi đi đi!' }, next: 'n2' },
          { t: '火锅？我第一次吃，会不会很辣？', p: 'Huǒguō? Wǒ dì yī cì chī, huì bu huì hěn là?', v: 'Lẩu hả? Tớ ăn lần đầu, có cay lắm không?', tone: 'ok',
            reply: { t: '放心，可以选不辣的！我带你入门！', p: 'Fàngxīn, kěyǐ xuǎn bú là de! Wǒ dài nǐ rùmén!', v: 'Yên tâm, chọn loại không cay được! Để tớ dẫn cậu nhập môn!' }, next: 'n2' },
          { t: '我想吃汉堡。', p: 'Wǒ xiǎng chī hànbǎo.', v: 'Tớ muốn ăn... hamburger.', tone: 'awkward',
            reply: { t: '汉堡天天有，火锅才是灵魂！相信我！', p: 'Hànbǎo tiāntiān yǒu, huǒguō cái shì línghún! Xiāngxìn wǒ!', v: 'Hamburger ngày nào chả có, lẩu mới là linh hồn! Tin tớ đi!' }, next: 'n2' },
        ],
      },
      n2: {
        npc: { t: '到了！要辣锅还是不辣的？', p: 'Dào le! Yào là guō háishi bú là de?', v: 'Tới rồi! Ăn lẩu cay hay không cay?' },
        choices: [
          { t: '一半一半吧，鸳鸯锅！', p: 'Yíbàn yíbàn ba, yuānyāng guō!', v: 'Mỗi thứ một nửa đi, lẩu uyên ương! (nồi 2 ngăn)', tone: 'smooth',
            reply: { t: '哟，连鸳鸯锅都知道，你是老手啊！', p: 'Yō, lián yuānyāng guō dōu zhīdào, nǐ shì lǎoshǒu a!', v: 'Ồ, biết cả lẩu uyên ương, cao thủ đó nha!' }, next: 'n3' },
          { t: '超级辣！我是辣王！', p: 'Chāojí là! Wǒ shì là wáng!', v: 'Siêu cay! Tớ là VUA ĂN CAY!', tone: 'ok',
            reply: { t: '哈哈好！四川特辣！等会儿别哭啊！', p: 'Hāhā hǎo! Sìchuān tè là! Děng huìr bié kū a!', v: 'Haha được! Cay đặc biệt Tứ Xuyên! Lát đừng có khóc đấy!' }, next: 'n3spicy' },
          { t: '不辣不辣，我怕辣。', p: 'Bú là bú là, wǒ pà là.', v: 'Không cay không cay, tớ sợ cay.', tone: 'ok',
            reply: { t: '行，番茄锅！酸酸甜甜也很好吃！', p: 'Xíng, fānqié guō! Suānsuān tiántián yě hěn hǎochī!', v: 'Được, lẩu cà chua! Chua chua ngọt ngọt cũng ngon lắm!' }, next: 'n3' },
        ],
      },
      n3: {
        npc: { t: '点菜吧！你想吃什么？', p: 'Diǎn cài ba! Nǐ xiǎng chī shénme?', v: 'Gọi món thôi! Cậu muốn ăn gì?' },
        choices: [
          { t: '牛肉、羊肉、虾，都来一份！', p: 'Niúròu, yángròu, xiā, dōu lái yí fèn!', v: 'Bò, cừu, tôm — mỗi thứ một phần!', tone: 'smooth',
            reply: { t: '会点！再加个土豆和青菜，完美！', p: 'Huì diǎn! Zài jiā ge tǔdòu hé qīngcài, wánměi!', v: 'Biết gọi món đó! Thêm khoai tây với rau xanh nữa, hoàn hảo!' }, next: 'n4' },
          { t: '多点蔬菜吧，我在减肥。', p: 'Duō diǎn shūcài ba, wǒ zài jiǎnféi.', v: 'Gọi nhiều rau đi, tớ đang giảm cân.', tone: 'ok',
            reply: { t: '吃火锅减肥？哈哈哈你在开玩笑吧！', p: 'Chī huǒguō jiǎnféi? Hāhāhā nǐ zài kāi wánxiào ba!', v: 'Ăn lẩu để giảm cân?? Hahaha cậu đùa tớ à!' }, next: 'n4' },
          { t: '你点吧，我都可以。', p: 'Nǐ diǎn ba, wǒ dōu kěyǐ.', v: 'Cậu gọi đi, tớ sao cũng được.', tone: 'awkward',
            reply: { t: '又是"都可以"！好，那我不客气了！', p: 'Yòu shì "dōu kěyǐ"! Hǎo, nà wǒ bú kèqi le!', v: 'Lại "sao cũng được"! Được, vậy tớ không khách sáo đâu!' }, next: 'n4' },
        ],
      },
      n3spicy: {
        npc: { t: '锅来了！你先尝一口汤试试？', p: 'Guō lái le! Nǐ xiān cháng yì kǒu tāng shìshi?', v: 'Nồi lẩu ra rồi! Cậu nếm thử một miếng nước dùng xem?' },
        choices: [
          { t: '（喝一口）…水！给我水！！', p: '(hē yì kǒu) …Shuǐ! Gěi wǒ shuǐ!!', v: '(uống một ngụm)... NƯỚC! Cho tớ nước!!', tone: 'ok',
            reply: { t: '哈哈哈辣王呢？服务员，一杯冰牛奶！', p: 'Hāhāhā là wáng ne? Fúwùyuán, yì bēi bīng niúnǎi!', v: 'Hahaha Vua ăn cay đâu rồi? Em ơi, cho ly sữa đá!' }, next: 'n4' },
          { t: '嗯，还行，再辣一点也可以。', p: 'Ǹg, hái xíng, zài là yìdiǎn yě kěyǐ.', v: 'Ừm, cũng được, cay hơn nữa cũng chơi.', tone: 'smooth',
            reply: { t: '厉害了！你是真的辣王，我服了！', p: 'Lìhai le! Nǐ shì zhēn de là wáng, wǒ fú le!', v: 'Đỉnh vậy! Cậu đúng là Vua ăn cay thật, tớ phục!' }, next: 'n4' },
          { t: '我的嘴要着火了，但是我不能输！', p: 'Wǒ de zuǐ yào zháohuǒ le, dànshì wǒ bù néng shū!', v: 'Miệng tớ sắp bốc cháy rồi, nhưng tớ không thể thua!', tone: 'awkward',
            reply: { t: '哈哈哈别硬撑！来来来，喝点酸梅汤！', p: 'Hāhāhā bié yìng chēng! Lái lái lái, hē diǎn suānméitāng!', v: 'Hahaha đừng gồng nữa! Đây đây, uống chút nước mơ chua đi!' }, next: 'n4' },
        ],
      },
      n4: {
        npc: { t: '对了，你会调蘸料吗？这是火锅的灵魂！', p: 'Duì le, nǐ huì tiáo zhànliào ma? Zhè shì huǒguō de línghún!', v: 'À đúng rồi, cậu biết pha nước chấm không? Linh hồn của lẩu đó!' },
        choices: [
          { t: '会！麻酱加蒜加香菜，绝了！', p: 'Huì! Májiàng jiā suàn jiā xiāngcài, jué le!', v: 'Biết! Sốt mè thêm tỏi thêm ngò, đỉnh của chóp!', tone: 'smooth',
            reply: { t: '哇，标准北方吃法！你上辈子是中国人吧！', p: 'Wā, biāozhǔn běifāng chīfǎ! Nǐ shàngbèizi shì Zhōngguórén ba!', v: 'Woa, chuẩn kiểu miền Bắc! Kiếp trước cậu là người Trung chắc luôn!' }, next: 'n5' },
          { t: '不会，你帮我调一个吧！', p: 'Bú huì, nǐ bāng wǒ tiáo yí ge ba!', v: 'Không biết, cậu pha giúp tớ một chén đi!', tone: 'ok',
            reply: { t: '看好了，这是祖传配方，只教你一个人！', p: 'Kàn hǎo le, zhè shì zǔchuán pèifāng, zhǐ jiāo nǐ yí ge rén!', v: 'Nhìn kỹ nè, công thức gia truyền, chỉ dạy mỗi cậu thôi đó!' }, next: 'n5' },
          { t: '香菜？！不要不要，香菜是恶魔！', p: 'Xiāngcài?! Bú yào bú yào, xiāngcài shì èmó!', v: 'Ngò á?! Không không, ngò là ác quỷ!', tone: 'awkward',
            reply: { t: '哈哈哈原来你是"反香菜联盟"的！行，不放！', p: 'Hāhāhā yuánlái nǐ shì "fǎn xiāngcài liánméng" de! Xíng, bú fàng!', v: 'Hahaha hoá ra cậu thuộc "liên minh anti ngò"! Được, không bỏ!' }, next: 'n5' },
        ],
      },
      n5: {
        npc: { t: '肉好了！快吃快吃！怎么样？', p: 'Ròu hǎo le! Kuài chī kuài chī! Zěnmeyàng?', v: 'Thịt chín rồi! Ăn mau ăn mau! Sao, ngon không?' },
        choices: [
          { t: '太好吃了！我停不下来了！', p: 'Tài hǎochī le! Wǒ tíng bu xiàlái le!', v: 'Ngon quá trời! Tớ không dừng được nữa rồi!', tone: 'smooth',
            reply: { t: '对吧！我就说火锅是灵魂！', p: 'Duì ba! Wǒ jiù shuō huǒguō shì línghún!', v: 'Thấy chưa! Đã bảo lẩu là linh hồn mà!' }, next: 'n6' },
          { t: '好吃！比汉堡好吃一百倍！', p: 'Hǎochī! Bǐ hànbǎo hǎochī yìbǎi bèi!', v: 'Ngon! Ngon gấp trăm lần hamburger!', tone: 'smooth',
            reply: { t: '哈哈哈现在知道了吧！来，再涮一盘！', p: 'Hāhāhā xiànzài zhīdào le ba! Lái, zài shuàn yì pán!', v: 'Hahaha giờ thì biết rồi ha! Nào, nhúng thêm đĩa nữa!' }, next: 'n6' },
          { t: '（一直吃，没时间说话）', p: '(yìzhí chī, méi shíjiān shuōhuà)', v: '(mải ăn, không có thời gian nói chuyện)', tone: 'ok',
            reply: { t: '喂喂，留点给我啊！哈哈哈！', p: 'Wèi wèi, liú diǎn gěi wǒ a! Hāhāhā!', v: 'Ê ê, chừa cho tớ với chứ! Hahaha!' }, next: 'n6' },
        ],
      },
      n6: {
        npc: { t: '吃饱了吗？要不要再点一盘肉？', p: 'Chī bǎo le ma? Yào bu yào zài diǎn yì pán ròu?', v: 'No chưa? Có gọi thêm đĩa thịt nữa không?' },
        choices: [
          { t: '再来一盘！今天不醉不归…不对，不饱不归！', p: 'Zài lái yì pán! Jīntiān bú zuì bù guī… bú duì, bù bǎo bù guī!', v: 'Thêm đĩa nữa! Hôm nay không say không về... à nhầm, không NO không về!', tone: 'smooth',
            reply: { t: '哈哈哈这句学得好！服务员，再来一盘羊肉！', p: 'Hāhāhā zhè jù xué de hǎo! Fúwùyuán, zài lái yì pán yángròu!', v: 'Hahaha câu này học chuẩn đó! Em ơi, thêm đĩa thịt cừu!' }, next: 'n7' },
          { t: '我饱了，再吃我要变成球了。', p: 'Wǒ bǎo le, zài chī wǒ yào biànchéng qiú le.', v: 'Tớ no rồi, ăn nữa là biến thành quả bóng luôn.', tone: 'ok',
            reply: { t: '哈哈，那喝点酸梅汤消化一下！', p: 'Hāhā, nà hē diǎn suānméitāng xiāohuà yíxià!', v: 'Haha, vậy uống chút nước mơ chua cho tiêu cơm!' }, next: 'n7' },
          { t: '点！你的钱包没问题吧？', p: 'Diǎn! Nǐ de qiánbāo méi wèntí ba?', v: 'Gọi! Ví của cậu không sao chứ?', tone: 'awkward',
            reply: { t: '哈哈你操心什么，今天我请客！', p: 'Hāhā nǐ cāoxīn shénme, jīntiān wǒ qǐngkè!', v: 'Haha cậu lo gì, hôm nay tớ mời!' }, next: 'n7' },
        ],
      },
      n7: {
        npc: { t: '服务员，买单！今天我请客！', p: 'Fúwùyuán, mǎidān! Jīntiān wǒ qǐngkè!', v: 'Em ơi, tính tiền! Hôm nay tớ mời!' },
        choices: [
          { t: '不行不行，我们AA吧！', p: 'Bù xíng bù xíng, wǒmen AA ba!', v: 'Không được không được, mình chia đôi đi! (AA制: cưa đôi)', tone: 'smooth',
            reply: { t: '跟我客气什么！好好好，那下次你请！', p: 'Gēn wǒ kèqi shénme! Hǎo hǎo hǎo, nà xià cì nǐ qǐng!', v: 'Khách sáo với tớ làm gì! Rồi rồi rồi, vậy lần sau cậu mời!' }, next: 'n8' },
          { t: '那说好了，下次我请你吃越南菜！', p: 'Nà shuō hǎo le, xià cì wǒ qǐng nǐ chī Yuènán cài!', v: 'Vậy chốt nhé, lần sau tớ mời cậu ăn món Việt Nam!', tone: 'smooth',
            reply: { t: '一言为定！我早就想尝尝越南菜了！', p: 'Yìyán wéidìng! Wǒ zǎo jiù xiǎng chángchang Yuènán cài le!', v: 'Nhất ngôn cửu đỉnh! Tớ thèm thử món Việt lâu lắm rồi!' }, next: 'n8' },
          { t: '谢谢老板爸爸！', p: 'Xièxie lǎobǎn bàba!', v: 'Cảm ơn... bố đại gia!', tone: 'awkward',
            reply: { t: '哈哈哈谁是你爸爸！就这一次啊！', p: 'Hāhāhā shéi shì nǐ bàba! Jiù zhè yí cì a!', v: 'Hahaha ai là bố cậu hả! Chỉ lần này thôi đấy nhé!' }, next: 'n8' },
        ],
      },
      n8: {
        npc: { t: '今天太开心了！下次再一起来吃，一言为定！', p: 'Jīntiān tài kāixīn le! Xià cì zài yìqǐ lái chī, yìyán wéidìng!', v: 'Hôm nay vui quá! Lần sau lại cùng đi ăn nhé, chốt đơn!' },
        end: true,
      },
    },
  },
  {
    id: 'dl-haircut',
    emoji: '💇',
    title: 'Đi cắt tóc',
    desc: 'Thử thách sinh tồn: mô tả kiểu tóc mình muốn và... cầu nguyện.',
    npcName: 'Anh thợ Tony',
    npcAvatar: '💇‍♂️',
    branching: true,
    start: 'n1',
    nodes: {
      n1: {
        npc: { t: '欢迎！今天想剪什么发型？', p: 'Huānyíng! Jīntiān xiǎng jiǎn shénme fàxíng?', v: 'Chào bạn! Hôm nay muốn cắt kiểu gì nào?' },
        choices: [
          { t: '稍微剪短一点就好，不要太短。', p: 'Shāowēi jiǎn duǎn yìdiǎn jiù hǎo, bú yào tài duǎn.', v: 'Cắt ngắn đi chút thôi, đừng ngắn quá ạ.', tone: 'smooth',
            reply: { t: '明白，修一修，保持自然！', p: 'Míngbai, xiū yi xiū, bǎochí zìrán!', v: 'Hiểu rồi, tỉa tỉa lại, giữ nét tự nhiên!' }, next: 'n2' },
          { t: '我想换个新发型，你帮我设计一下！', p: 'Wǒ xiǎng huàn ge xīn fàxíng, nǐ bāng wǒ shèjì yíxià!', v: 'Tớ muốn đổi kiểu mới, anh thiết kế giúp tớ đi!', tone: 'ok',
            reply: { t: '交给我！保证让你帅出新高度！', p: 'Jiāo gěi wǒ! Bǎozhèng ràng nǐ shuài chū xīn gāodù!', v: 'Cứ giao cho anh! Đảm bảo đẹp trai lên tầm cao mới!' }, next: 'n2' },
          { t: '照这张照片剪！（给他看明星照片）', p: 'Zhào zhè zhāng zhàopiàn jiǎn! (gěi tā kàn míngxīng zhàopiàn)', v: 'Cắt theo tấm ảnh này! (đưa ảnh idol)', tone: 'awkward',
            reply: { t: '呃…发型可以一样，脸就要看缘分了哈！', p: 'È… fàxíng kěyǐ yíyàng, liǎn jiù yào kàn yuánfèn le ha!', v: 'Ờm... kiểu tóc thì giống được, còn cái mặt thì tuỳ duyên nha!' }, next: 'n2' },
        ],
      },
      n2: {
        npc: { t: '好，先洗个头吧？水温这样可以吗？', p: 'Hǎo, xiān xǐ ge tóu ba? Shuǐwēn zhèyàng kěyǐ ma?', v: 'OK, gội đầu trước nhé? Nhiệt độ nước vậy được chưa?' },
        choices: [
          { t: '可以，很舒服！', p: 'Kěyǐ, hěn shūfu!', v: 'Được ạ, dễ chịu lắm!', tone: 'smooth',
            reply: { t: '那就好，放松放松，闭上眼睛休息一下。', p: 'Nà jiù hǎo, fàngsōng fàngsōng, bìshang yǎnjing xiūxi yíxià.', v: 'Vậy thì tốt, thư giãn đi, nhắm mắt nghỉ chút nào.' }, next: 'n3' },
          { t: '有点热，麻烦凉一点。', p: 'Yǒudiǎn rè, máfan liáng yìdiǎn.', v: 'Hơi nóng, phiền anh mát hơn chút ạ.', tone: 'ok',
            reply: { t: '好嘞，马上调！现在呢？完美！', p: 'Hǎo lei, mǎshàng tiáo! Xiànzài ne? Wánměi!', v: 'OK, chỉnh liền! Giờ sao? Hoàn hảo!' }, next: 'n3' },
          { t: '啊！我的头要熟了！', p: 'À! Wǒ de tóu yào shú le!', v: 'Á! Đầu tớ sắp... chín rồi!', tone: 'awkward',
            reply: { t: '哎呀对不起对不起！凉水凉水！', p: 'Āiyā duìbuqǐ duìbuqǐ! Liángshuǐ liángshuǐ!', v: 'Ây da xin lỗi xin lỗi! Nước mát nước mát!' }, next: 'n3' },
        ],
      },
      n3: {
        npc: { t: '（开始剪）最近工作忙不忙啊？', p: '(kāishǐ jiǎn) Zuìjìn gōngzuò máng bu máng a?', v: '(bắt đầu cắt) Dạo này công việc bận không?' },
        choices: [
          { t: '挺忙的，所以今天来放松一下。', p: 'Tǐng máng de, suǒyǐ jīntiān lái fàngsōng yíxià.', v: 'Khá bận, nên hôm nay tới thư giãn chút.', tone: 'smooth',
            reply: { t: '来对地方了！剪个头，压力少一半！', p: 'Lái duì dìfang le! Jiǎn ge tóu, yālì shǎo yíbàn!', v: 'Tới đúng chỗ rồi đó! Cắt cái đầu, áp lực vơi một nửa!' }, next: 'n4' },
          { t: '还好，就是天天想吃好吃的。', p: 'Hái hǎo, jiùshì tiāntiān xiǎng chī hǎochī de.', v: 'Cũng ổn, chỉ là ngày nào cũng thèm ăn ngon.', tone: 'ok',
            reply: { t: '哈哈同道中人！等会儿推荐你一家面馆！', p: 'Hāhā tóngdào zhōngrén! Děng huìr tuījiàn nǐ yì jiā miànguǎn!', v: 'Haha đồng đạo rồi! Lát anh giới thiệu quán mì ngon!' }, next: 'n4' },
          { t: '别说话了，我怕你剪错。', p: 'Bié shuōhuà le, wǒ pà nǐ jiǎn cuò.', v: 'Đừng nói chuyện nữa, tớ sợ anh cắt hỏng.', tone: 'awkward',
            reply: { t: '哈哈哈放心！我聊天剪头两不误，十年老师傅！', p: 'Hāhāhā fàngxīn! Wǒ liáotiān jiǎn tóu liǎng bú wù, shí nián lǎo shīfu!', v: 'Hahaha yên tâm! Anh vừa buôn vừa cắt không trượt phát nào, thợ 10 năm đó!' }, next: 'n4' },
        ],
      },
      n4: {
        npc: { t: '你看，这个长度可以吗？', p: 'Nǐ kàn, zhège chángdù kěyǐ ma?', v: 'Bạn xem, độ dài này được chưa?' },
        choices: [
          { t: '可以了可以了！就这样，别再剪了！', p: 'Kěyǐ le kěyǐ le! Jiù zhèyàng, bié zài jiǎn le!', v: 'Được rồi được rồi! Cứ vậy đi, đừng cắt nữa!', tone: 'ok',
            reply: { t: '哈哈好，收刀！你这反应跟大家一样！', p: 'Hāhā hǎo, shōu dāo! Nǐ zhè fǎnyìng gēn dàjiā yíyàng!', v: 'Haha rồi, thu kéo! Phản ứng của bạn giống hệt mọi người!' }, next: 'n5' },
          { t: '再短一点点，一点点就好。', p: 'Zài duǎn yìdiǎndiǎn, yìdiǎndiǎn jiù hǎo.', v: 'Ngắn thêm xíu xíu nữa, xíu thôi nha.', tone: 'smooth',
            reply: { t: '收到，"一点点"，我懂的！', p: 'Shōudào, "yìdiǎndiǎn", wǒ dǒng de!', v: 'Nhận lệnh, "xíu xíu thôi", anh hiểu mà!' }, next: 'n5' },
          { t: '嗯…你觉得呢？你是专业的。', p: 'Ǹg… nǐ juéde ne? Nǐ shì zhuānyè de.', v: 'Ừm... anh thấy sao? Anh là dân chuyên mà.', tone: 'awkward',
            reply: { t: '哦？把命运交给我了？哈哈，那我就不客气了！', p: 'Ó? Bǎ mìngyùn jiāo gěi wǒ le? Hāhā, nà wǒ jiù bú kèqi le!', v: 'Ồ? Giao số phận cho anh luôn hả? Haha, vậy anh không khách sáo nữa nha!' }, next: 'n5' },
        ],
      },
      n5: {
        npc: { t: '对了，要不要染个颜色？现在年轻人都流行！', p: 'Duì le, yào bu yào rǎn ge yánsè? Xiànzài niánqīngrén dōu liúxíng!', v: 'À này, có muốn nhuộm màu không? Giới trẻ giờ đang mốt lắm!' },
        choices: [
          { t: '不用了，我喜欢自然的黑色。', p: 'Bú yòng le, wǒ xǐhuan zìrán de hēisè.', v: 'Thôi ạ, tớ thích màu đen tự nhiên.', tone: 'smooth',
            reply: { t: '也对，黑色最百搭！', p: 'Yě duì, hēisè zuì bǎidā!', v: 'Cũng đúng, màu đen dễ phối nhất!' }, next: 'n6' },
          { t: '染什么颜色好看？给我推荐一个！', p: 'Rǎn shénme yánsè hǎokàn? Gěi wǒ tuījiàn yí ge!', v: 'Nhuộm màu gì đẹp? Gợi ý tớ một màu đi!', tone: 'ok',
            reply: { t: '你皮肤白，染个奶茶色绝对好看！', p: 'Nǐ pífū bái, rǎn ge nǎichá sè juéduì hǎokàn!', v: 'Da bạn sáng, nhuộm màu trà sữa chắc chắn đẹp!' }, next: 'n6' },
          { t: '先说多少钱，我再考虑。', p: 'Xiān shuō duōshao qián, wǒ zài kǎolǜ.', v: 'Nói giá trước đi, rồi tớ mới suy nghĩ.', tone: 'ok',
            reply: { t: '哈哈真实！染发三百八，会员打八折！', p: 'Hāhā zhēnshí! Rǎnfà sānbǎi bā, huìyuán dǎ bā zhé!', v: 'Haha thẳng thắn ghê! Nhuộm 380 tệ, hội viên giảm 20%!' }, next: 'n6' },
        ],
      },
      n6: {
        npc: { t: '好了！看看镜子，怎么样？', p: 'Hǎo le! Kànkan jìngzi, zěnmeyàng?', v: 'Xong rồi! Nhìn gương xem, thế nào?' },
        choices: [
          { t: '哇，太帅了！手艺真好！', p: 'Wā, tài shuài le! Shǒuyì zhēn hǎo!', v: 'Woa, đẹp trai quá! Tay nghề đỉnh thật!', tone: 'smooth',
            reply: { t: '哈哈满意就好！这就是Tony老师的实力！', p: 'Hāhā mǎnyì jiù hǎo! Zhè jiùshì Tony lǎoshī de shílì!', v: 'Haha hài lòng là được! Đây chính là thực lực của thầy Tony!' }, next: 'n7' },
          { t: '嗯…比我想的短，但是也不错。', p: 'Ǹg… bǐ wǒ xiǎng de duǎn, dànshì yě búcuò.', v: 'Ừm... ngắn hơn tớ nghĩ, nhưng cũng ổn.', tone: 'ok',
            reply: { t: '放心，头发长得快，两周后刚刚好！', p: 'Fàngxīn, tóufa zhǎng de kuài, liǎng zhōu hòu gānggāng hǎo!', v: 'Yên tâm, tóc mọc nhanh lắm, hai tuần sau là chuẩn đẹp!' }, next: 'n7' },
          { t: '这…这不是照片里的发型啊！', p: 'Zhè… zhè bú shì zhàopiàn lǐ de fàxíng a!', v: 'Đây... đây đâu phải kiểu trong ảnh!', tone: 'awkward',
            reply: { t: '发型是一样的呀！我说了，脸要看缘分嘛哈哈！', p: 'Fàxíng shì yíyàng de ya! Wǒ shuō le, liǎn yào kàn yuánfèn ma hāhā!', v: 'Kiểu tóc giống y mà! Anh nói rồi, cái mặt là tuỳ duyên haha!' }, next: 'n7' },
        ],
      },
      n7: {
        npc: { t: '一共八十八，扫码还是现金？', p: 'Yígòng bāshíbā, sǎo mǎ háishi xiànjīn?', v: 'Tổng 88 tệ, quét mã hay tiền mặt?' },
        choices: [
          { t: '扫码！谢谢Tony老师！', p: 'Sǎo mǎ! Xièxie Tony lǎoshī!', v: 'Quét mã! Cảm ơn thầy Tony!', tone: 'smooth',
            reply: { t: '客气客气！下个月再来修一下啊！', p: 'Kèqi kèqi! Xià ge yuè zài lái xiū yíxià a!', v: 'Khách sáo khách sáo! Tháng sau lại tới tỉa nha!' }, next: 'n8' },
          { t: '现金，给您，不用找了。', p: 'Xiànjīn, gěi nín, bú yòng zhǎo le.', v: 'Tiền mặt, gửi anh, khỏi thối.', tone: 'smooth',
            reply: { t: '哟，谢谢！你是我今天最爱的客人！', p: 'Yō, xièxie! Nǐ shì wǒ jīntiān zuì ài de kèrén!', v: 'Ồ, cảm ơn! Bạn là khách cưng nhất hôm nay của anh!' }, next: 'n8' },
          { t: '八十八？剪头发比吃火锅还贵！', p: 'Bāshíbā? Jiǎn tóufa bǐ chī huǒguō hái guì!', v: '88 tệ? Cắt tóc còn đắt hơn ăn lẩu!', tone: 'awkward',
            reply: { t: '哈哈，火锅吃完就没了，发型帅一个月呢！', p: 'Hāhā, huǒguō chī wán jiù méi le, fàxíng shuài yí ge yuè ne!', v: 'Haha, lẩu ăn xong là hết, còn kiểu tóc đẹp trai được cả tháng nhé!' }, next: 'n8' },
        ],
      },
      n8: {
        npc: { t: '慢走！记得给我们店五星好评啊！', p: 'Màn zǒu! Jìde gěi wǒmen diàn wǔ xīng hǎopíng a!', v: 'Đi thong thả! Nhớ đánh giá 5 sao cho tiệm nha!' },
        end: true,
      },
    },
  },
]

/** Tìm kịch bản phân nhánh theo id. */
export function getBranchDialogueById(id) {
  return branchDialogues.find((d) => d.id === id) || null
}
