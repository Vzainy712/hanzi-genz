/**
 * Cài đặt nhắc lịch học hằng ngày (lưu localStorage).
 * Khi app đang mở (kể cả tab nền trên máy tính), tới giờ sẽ hiện
 * thông báo hệ thống (nếu được cấp quyền) hoặc toast trong app.
 */

const STORAGE_KEY = 'hanzi-genz-reminder'

/** @returns {{enabled:boolean, time:string, lastFired:string|null}} */
export function getReminderSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return { enabled: false, time: '20:00', lastFired: null, ...(raw ? JSON.parse(raw) : {}) }
  } catch {
    return { enabled: false, time: '20:00', lastFired: null }
  }
}

export function saveReminderSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

/** Trình duyệt có hỗ trợ Notification API không. */
export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window
}

/** Xin quyền thông báo. @returns {'granted'|'denied'|'default'|'unsupported'} */
export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return 'unsupported'
  if (Notification.permission === 'granted') return 'granted'
  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

/** Bắn một thông báo nhắc học. @returns {boolean} true nếu đã hiện Notification hệ thống */
export function fireReminderNotification() {
  if (isNotificationSupported() && Notification.permission === 'granted') {
    try {
      new Notification('字 HanZi GenZ', {
        body: 'Tới giờ học tiếng Trung rồi! Vào giữ chuỗi 🔥 nào bestie!',
        icon: `${import.meta.env.BASE_URL}icon-192.png`,
        tag: 'hanzi-genz-daily',
      })
      return true
    } catch {
      return false
    }
  }
  return false
}

/** Khoá ngày hôm nay dạng YYYY-MM-DD (giờ địa phương). */
export function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
