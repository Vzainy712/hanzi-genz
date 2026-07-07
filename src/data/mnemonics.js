/**
 * "Mẹo nhớ GenZ" - phương pháp ghi nhớ chữ Hán sáng tạo, dí dỏm.
 * Mỗi mẹo liên kết hình dạng / bộ thủ / âm đọc của chữ với nghĩa,
 * bằng giọng văn trẻ trung, gần gũi để nhớ lâu hơn.
 *
 * Cấu trúc: { [chữ Hán]: { tip: 'mẹo nhớ', vibe: 'liên tưởng ngữ cảnh GenZ' } }
 * - tip:  mẹo ghép hình/bộ thủ với nghĩa
 * - vibe: một câu tình huống đời thường/trending để "đóng đinh" trí nhớ
 */

export const mnemonics = {
  你: {
    tip: '亻(người) + 尔 → phải có "người" bên cạnh mới gọi là "bạn" (nǐ).',
    vibe: 'Bestie là người luôn đứng cạnh bạn, không để bạn cô đơn 🫶',
  },
  好: {
    tip: '女 (con gái) + 子 (con trai) ghép lại = "tốt, hay". Ghép đôi là quá good!',
    vibe: 'Match đúng cạ cứng thì mọi thứ đều "hǎo" — perfect combo 💕',
  },
  我: {
    tip: '扌(tay) cầm 戈 (giáo) để bảo vệ = "tôi". Cái tôi phải được giữ vững!',
    vibe: 'Main character energy: "tôi" là số một, không ai flex hơn 😎',
  },
  是: {
    tip: '日 (mặt trời) chiếu xuống 正 = chân lý sáng tỏ = "là, đúng".',
    vibe: 'Chuẩn không cần chỉnh, "đúng là" vậy đó, no cap ☀️',
  },
  不: {
    tip: 'Một nét chặn ngang phía dưới = cấm cửa = "không".',
    vibe: 'Vẽ dấu gạch chéo lên mọi thứ bạn từ chối: "không là không" 🙅',
  },
  人: {
    tip: 'Hai nét như hai chân đang bước = "người".',
    vibe: 'Hình que đơn giản nhất vũ trụ — ai cũng vẽ được 🚶',
  },
  大: {
    tip: '人 dang rộng cả hai tay = "to, lớn".',
    vibe: 'Khi flex "con cá tôi câu to như này này" 🙌',
  },
  小: {
    tip: 'Một nét ở giữa, hai chấm nhỏ hai bên = "nhỏ, bé".',
    vibe: 'Bé xíu iu, mini size, cute lũn 🐣',
  },
  家: {
    tip: '宀 (mái nhà) che 豕 (con heo) = nhà nông xưa nuôi heo trong nhà = "nhà".',
    vibe: 'Nay là "về nhà nằm nuôi thú cưng, tránh xa deadline" 🐷🏠',
  },
  学: {
    tip: 'Đứa 子 (con) đội "mũ kiến thức" lên đầu = "học".',
    vibe: 'Level up cái não mỗi ngày, XP tăng đều 🧠✨',
  },
  中: {
    tip: 'Một nét sổ xuyên qua chính giữa ô vuông = "giữa, trung tâm".',
    vibe: 'Trúng hồng tâm bullseye, ngay chính giữa 🎯',
  },
  吃: {
    tip: '口 (miệng) + 乞 = đưa vào miệng = "ăn".',
    vibe: 'Cứ mở 口 (miệng) ra là biết sắp "măm măm" rồi 🍜',
  },
  喝: {
    tip: '口 (miệng) + 曷 = "uống". Cứ có bộ 口 là liên quan tới miệng.',
    vibe: 'Ngụm trà sữa đầu tiên: "khà~" (hē) đã gì đâu 🧋',
  },
  水: {
    tip: 'Hình dòng suối có nhánh chảy hai bên = "nước".',
    vibe: 'Uống đủ 2 lít mỗi ngày nha, skin care số 1 💧',
  },
  火: {
    tip: 'Hình ngọn lửa bùng lên với tàn bay hai bên = "lửa".',
    vibe: 'Cái gì hot trend thì gọi là "on fire" 🔥',
  },
  日: {
    tip: 'Ô vuông có nét ngang giữa = mặt trời tròn = "ngày, mặt trời".',
    vibe: 'Story mỗi "ngày" một tấm, mặt trời lên là đăng 🌞',
  },
  月: {
    tip: 'Hình vầng trăng khuyết = "tháng, mặt trăng".',
    vibe: 'Mỗi "tháng" ngắm trăng một lần, chill phết 🌙',
  },
  好吃: { tip: '好 (tốt) + 吃 (ăn) = "ngon".', vibe: 'Review đồ ăn: "ngon xỉu, 10 điểm" 😋' },
  多: {
    tip: 'Hai chữ 夕 (buổi tối) chồng lên nhau = nhiều ngày = "nhiều".',
    vibe: 'Nhiều tới mức đếm không xuể, "sương sương" vậy thôi 📚',
  },
  少: {
    tip: '小 (nhỏ) thêm một nét bị "gạch bớt" = còn ít = "ít".',
    vibe: 'Pin còn "ít" xíu, sắp tụt mood 🔋',
  },
  冷: {
    tip: '冫(hai giọt băng) + 令 = "lạnh".',
    vibe: 'Lạnh tới mức phải quấn chăn thành cuộn spring roll 🥶',
  },
  热: {
    tip: '灬 (bốn chấm lửa) ở dưới = nóng rực = "nóng".',
    vibe: 'Trời nóng như lò nướng, chỉ muốn tan chảy 🥵',
  },
  快: {
    tip: '忄(trái tim) đập thình thịch + 夬 = tim nhanh = "nhanh".',
    vibe: 'Lướt cho lẹ, tốc độ "vèo vèo" như wifi 5G ⚡',
  },
  谁: {
    tip: '讠(lời nói) + 隹 (chim) = đang hỏi "ai đó?".',
    vibe: 'Tin nhắn lạ: "ai vậy ta?" — 谁 shéi 🕵️',
  },
  几: {
    tip: 'Hình cái ghế nhỏ, đếm "được mấy cái?" = "mấy, bao nhiêu".',
    vibe: 'Còn "mấy" ngày nữa tới cuối tuần đây trời 📅',
  },
  爸: { tip: '父 (cha) + 巴 (âm "ba") = "bố".', vibe: 'Gọi "ba ơi" là ra 爸爸 (bàba) liền 👨' },
  妈: { tip: '女 (nữ) + 马 (âm "ma") = "mẹ".', vibe: 'Con gái 女 gọi "ma~ma" = mẹ, dễ nhớ xỉu 👩' },
  红: {
    tip: '纟(sợi tơ) nhuộm màu = "đỏ".',
    vibe: 'Màu đỏ = màu của trend, của lì xì, của crush đỏ mặt ❤️',
  },
  钱: {
    tip: '钅(kim loại) + 戋 = tiền xu bằng kim loại = "tiền".',
    vibe: 'Nghe tới 钱 (qián) là ví tự động khóc 💸',
  },
  累: {
    tip: '田 (ruộng) đè lên 糸 (sợi tơ) = gánh nặng = "mệt".',
    vibe: 'Mood cuối tuần deadline: "mệt xỉu, sạc lại pin đi" 😮‍💨',
  },
  笑: {
    tip: '竹 (tre) rung + 夭 nghiêng như người ngả người ra = "cười".',
    vibe: 'Cười lăn cười bò, "haha kịch trần" 😂',
  },
  哭: {
    tip: '两个 口 (hai con mắt) + 犬 chấm như giọt lệ = "khóc".',
    vibe: 'Hai con mắt rơi lệ như vòi = 哭 (kū), mít ướt ghê 😭',
  },
  忙: {
    tip: '忄(trái tim) + 亡 (mất) = bận tới mức "quên cả tim" = "bận".',
    vibe: 'Lịch kín mít, "bận xỉu, để mai rep tin nhắn" 🏃',
  },
  帮: {
    tip: 'Chung tay đỡ nhau lên = "giúp đỡ".',
    vibe: 'Bạn thân là để "cứu net" nhau lúc khó 🤝',
  },
  忘: {
    tip: '亡 (mất) + 心 (tim) = trái tim để lạc mất = "quên".',
    vibe: 'Não cá vàng: "ơ mình định làm gì ấy nhỉ?" 🐠',
  },
}

/** Lấy mẹo nhớ cho một chữ (nếu có). */
export function getMnemonic(hanzi) {
  return mnemonics[hanzi] || null
}
