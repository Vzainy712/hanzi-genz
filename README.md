# 字 HanZi GenZ — Học tiếng Trung HSK cho GenZ

Nền tảng học chữ Hán (HSK 1-6) tương tác, thiết kế trẻ trung dành cho người học 18-35 tuổi.
Giao diện **hoàn toàn bằng tiếng Việt**.

> Đây là bản **MVP (Phase 1)** — web app chạy hoàn toàn ở trình duyệt, lưu tiến độ bằng
> `localStorage`, chưa cần backend hay database.

## ✨ Tính năng hiện có

- 🀄 **Thẻ chữ Hán tương tác**: chữ lớn, tô màu theo thanh điệu, nghĩa tiếng Việt.
- 🖌️ **Thứ tự nét (笔顺)**: hoạt hình từng nét + chế độ tập viết (thư viện `hanzi-writer`).
- 🧩 **Bộ thủ (部首)**: hiển thị bộ thủ, tên Hán Việt và ý nghĩa.
- 🔊 **Phát âm**: nghe giọng đọc tiếng Trung (Web Speech API của trình duyệt).
- 📝 **Câu ví dụ**: từ ghép và cụm từ thông dụng cho mỗi chữ.
- 🔤 **Ngữ pháp & Câu**: 9 mẫu câu HSK (是, 吗, 的, 不/没, 很, 有, lượng từ 个, 在…) kèm câu ví dụ có audio.
- 🗣️ **Module Phát âm**: giải thích 4 thanh điệu, bảng thanh mẫu/vận mẫu khó, và **trò chơi đoán thanh điệu**.
- 🎯 **Quiz trắc nghiệm**: kiểm tra nghĩa của chữ, chấm điểm, pháo giấy chúc mừng.
- 🎉 **Phản hồi động viên**: thông báo nổi (toast) khi được điểm, mở khoá huy hiệu, đoán đúng/sai.
- 🏆 **Gamification**: điểm, chuỗi ngày (streak), huy hiệu.
- 📊 **Theo dõi tiến độ**: theo từng cấp độ HSK, lưu tự động.
- 📱 **Mobile-first**: tối ưu cho điện thoại, có thanh điều hướng dưới.

Nội dung hiện tại: **~50 chữ** (HSK 1-2, 9 bài) + **9 điểm ngữ pháp** + module phát âm.

## 🛠️ Công nghệ

- **React 18** + **Vite** (build nhanh)
- **Tailwind CSS** (thiết kế GenZ: gradient, bo góc, hiệu ứng)
- **React Router** (điều hướng)
- **hanzi-writer** (hoạt hình nét chữ)
- **Web Speech API** (phát âm — miễn phí)

## 🚀 Cách chạy

```bash
npm install     # cài dependencies (chỉ cần lần đầu)
npm run dev      # chạy server phát triển tại http://localhost:5173
```

Mở trình duyệt tại địa chỉ hiện ra (thường là `http://localhost:5173`).

Các lệnh khác:

```bash
npm run build    # đóng gói bản production vào thư mục dist/
npm run preview  # xem thử bản production
```

## 📁 Cấu trúc thư mục

```
src/
├── data/hskData.js          # Dữ liệu chữ Hán HSK 1-2 (chữ, pinyin, bộ thủ, ví dụ)
├── context/ProgressContext  # Quản lý điểm/streak/huy hiệu (localStorage)
├── utils/speech.js          # Phát âm tiếng Trung
├── components/              # CharacterCard, StrokeAnimation, Navbar, Confetti
├── pages/                  # HomePage, LessonsPage, LessonDetailPage, QuizPage, ProgressPage
├── App.jsx                 # Định tuyến
└── main.jsx                # Điểm khởi động
```

## 🗺️ Lộ trình tiếp theo

- [ ] **Phase 2**: bổ sung đủ HSK 1-6, chế độ luyện viết chấm điểm, dashboard chi tiết.
- [ ] **Backend**: xác thực người dùng (Firebase hoặc JWT + MongoDB), đồng bộ tiến độ đám mây.
- [ ] **Audio bản xứ**: thay TTS bằng file thu âm giọng người bản xứ.
- [ ] **Phase 3**: app iOS (React Native + Expo), bảng xếp hạng, nhóm học, thông báo nhắc học.

---

Made with 💜 for GenZ learners.
