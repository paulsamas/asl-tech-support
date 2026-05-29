self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(list => {
    if (list.length) return list[0].focus();
    return clients.openWindow('/');
  }));
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE') {
    const { title, body, delay } = e.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body: body,
        icon: '/ASL_icon.png',
        badge: '/ASL_icon.png',
        vibrate: [500, 200, 500, 200, 500],
        requireInteraction: true,
        tag: 'asl-call-' + Date.now()
      });
    }, delay);
  }
});
