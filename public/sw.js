/**
 * Service worker tối giản cho HanZi GenZ (PWA).
 * Chiến lược: network-first, rơi về cache khi mất mạng.
 * Đổi CACHE_VERSION khi cần ép làm mới toàn bộ cache.
 */
const CACHE_VERSION = 'hanzi-genz-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  // Chỉ cache GET cùng nguồn gốc (bỏ qua API/CDN bên ngoài như hanzi-writer data).
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Lưu bản sao vào cache để dùng khi offline.
        const copy = response.clone()
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy))
        return response
      })
      .catch(() =>
        caches.match(request).then(
          (cached) =>
            cached ||
            // SPA: khi offline mà điều hướng trang lạ, trả về index.html.
            (request.mode === 'navigate' ? caches.match('/index.html') : undefined),
        ),
      ),
  )
})
