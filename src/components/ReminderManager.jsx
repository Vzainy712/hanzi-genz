import { useEffect } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import {
  getReminderSettings,
  saveReminderSettings,
  fireReminderNotification,
  todayKey,
} from '../utils/reminder.js'

/**
 * Bộ theo dõi giờ nhắc học: mỗi 30 giây so giờ hiện tại với giờ đã đặt.
 * Tới giờ (và hôm nay chưa nhắc) thì hiện Notification hệ thống,
 * kèm toast trong app. Không render gì cả.
 */
export default function ReminderManager() {
  const { showToast } = useToast()

  useEffect(() => {
    function check() {
      const settings = getReminderSettings()
      if (!settings.enabled) return
      const now = new Date()
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      if (hhmm !== settings.time) return
      if (settings.lastFired === todayKey()) return // hôm nay nhắc rồi

      saveReminderSettings({ ...settings, lastFired: todayKey() })
      fireReminderNotification()
      showToast('Tới giờ học rồi! Vào giữ chuỗi 🔥 nào!', { emoji: '⏰', type: 'badge', duration: 5000 })
    }

    check() // kiểm tra ngay khi mở app
    const timer = setInterval(check, 30000)
    return () => clearInterval(timer)
  }, [showToast])

  return null
}
