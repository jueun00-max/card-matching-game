// 캐시 이름 및 파일 설정
const CACHE_NAME = 'card-matching-game-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/.well-known/assetlinks.json',
  '/icons/icon-192x192.png', // 예시: 아이콘 추가
  '/icons/icon-512x512.png'  // 예시: 아이콘 추가
];

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache...', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching resource: ', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
