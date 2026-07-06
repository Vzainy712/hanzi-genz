/**
 * Phát âm tiếng Trung bằng Web Speech API (miễn phí, có sẵn trong trình duyệt).
 * Về sau có thể thay bằng file audio giọng người bản xứ.
 */

let cachedVoice = null

/** Tìm giọng đọc tiếng Trung phổ thông (zh-CN) tốt nhất có sẵn. */
function pickChineseVoice() {
  if (cachedVoice) return cachedVoice
  const voices = window.speechSynthesis?.getVoices?.() || []
  cachedVoice =
    voices.find((v) => /zh[-_]CN/i.test(v.lang)) ||
    voices.find((v) => /^zh/i.test(v.lang)) ||
    null
  return cachedVoice
}

// Danh sách giọng nạp bất đồng bộ ở một số trình duyệt.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null
    pickChineseVoice()
  }
}

/**
 * Đọc to một đoạn chữ Hán.
 * @param {string} text - Chữ Hán cần đọc
 * @returns {boolean} true nếu trình duyệt hỗ trợ
 */
export function speakChinese(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false
  window.speechSynthesis.cancel() // dừng câu đang đọc (nếu có)
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'zh-CN'
  utter.rate = 0.85 // đọc chậm lại cho người mới nghe rõ
  const voice = pickChineseVoice()
  if (voice) utter.voice = voice
  window.speechSynthesis.speak(utter)
  return true
}

/** Kiểm tra trình duyệt có hỗ trợ đọc tiếng Trung không. */
export function isSpeechSupported() {
  return typeof window !== 'undefined' && !!window.speechSynthesis
}
