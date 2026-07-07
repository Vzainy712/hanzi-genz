# 字 HanZi GenZ — Học tiếng Trung HSK cho GenZ

🌐 **Dùng ngay**: https://vzainy712.github.io/hanzi-genz/
📱 **Cài lên iPhone**: mở link bằng Safari → nút Chia sẻ → "Thêm vào MH chính" → dùng như app thật.

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
- 🧠 **Mẹo nhớ GenZ**: mỗi chữ có mẹo ghi nhớ dí dỏm, liên kết hình dạng/bộ thủ/âm với nghĩa.
- 🃏 **Flashcard nhớ mặt chữ**: lật thẻ, tự đánh giá "đã nhớ / chưa nhớ" (chữ chưa nhớ được ôn lại).
- 🎧 **Luyện nghe câu**: nghe câu tiếng Trung → chọn nghĩa đúng.
- 🎓 **Giáo trình từ vựng chuẩn HSK**: 60 bài học sinh tự động từ kho từ thật (HSK 1: 15 bài, HSK 2: 15 bài, HSK 3: 30 bài) — mỗi bài ~10 từ với thẻ từ song ngữ Việt–Anh, nét chữ, phát âm, quiz riêng và câu trending kèm theo.
- 🎤 **Góc giải trí tiếng Trung**: 39 nội dung — meme mạng (躺平, YYDS…), **trend Douyin** (栓Q, 尊嘟假嘟, 科目三…), **thoại phim/drama** (Tây Du Ký, Chân Hoàn Truyện, Cuồng Phong…) và lời nhạc hot (孤勇者, 小幸运…) kèm nguồn gốc + link ngữ pháp liên quan.
- ⏰ **Nhắc học mỗi ngày**: đặt giờ nhắc trong trang Tiến độ, thông báo hệ thống + banner trong app.
- 🧱 **Trò chơi Xếp câu**: ghép mảnh từ thành câu đúng thứ tự, chấm điểm + đọc to khi đúng.
- 📖 **Từ điển HSK đầy đủ**: tra cứu **~4.991 từ HSK 1-6** (nhập từ dữ liệu mở), tìm theo chữ Hán/pinyin/nghĩa, lọc theo cấp. Hiển thị **song song Việt–Anh** — **HSK 1-3 đã phủ 100% tiếng Việt (595 từ)**, HSK 4-6 bổ sung dần.
- 🧩 **Module Bộ thủ (部首)**: học các bộ chữ gốc kèm ví dụ chữ chứa bộ đó.
- 🔤 **Ngữ pháp & Câu**: 9 mẫu câu HSK (是, 吗, 的, 不/没, 很, 有, lượng từ 个, 在…) kèm câu ví dụ có audio.
- 🗣️ **Module Phát âm**: giải thích 4 thanh điệu, bảng thanh mẫu/vận mẫu khó, và **trò chơi đoán thanh điệu**.
- 🎯 **Quiz trắc nghiệm**: kiểm tra nghĩa của chữ, chấm điểm, pháo giấy chúc mừng.
- 🎉 **Phản hồi động viên**: thông báo nổi (toast) khi được điểm, mở khoá huy hiệu, đoán đúng/sai.
- 🏆 **Gamification**: điểm, chuỗi ngày (streak), huy hiệu.
- 📊 **Theo dõi tiến độ**: theo từng cấp độ HSK, lưu tự động.
- 📱 **Mobile-first**: điều hướng gọn 4 mục (Trang chủ · Bài học · Luyện tập · Tiến độ).

Nội dung hiện tại:
- **Giáo trình từ vựng chuẩn**: 595 từ HSK 1-3 (60 bài, 100% nghĩa tiếng Việt + tiếng Anh đối chiếu)
- **Bài học chọn lọc** (có mẹo nhớ GenZ, ví dụ chi tiết): ~70 chữ HSK 1-3, 13 bài
- **Từ điển tra cứu**: ~4.991 từ HSK 1-6
- **39 nội dung giải trí** (trend Douyin, thoại phim, MV) + **12 điểm ngữ pháp** (có mẫu câu trong phim/nhạc) + **15 bộ thủ** + module phát âm + nhắc học hằng ngày

> Dữ liệu từ vựng đầy đủ lấy từ nguồn mở [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary)
> (chữ Hán + pinyin + nghĩa Anh + bộ thủ). Nghĩa tiếng Việt do dự án tự biên soạn, bổ sung dần
> qua lớp phủ `src/data/viOverlay.js`.

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
