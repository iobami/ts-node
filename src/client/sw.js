self.addEventListener('push', (e) => {
  const data = e.data.json();
  
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'assets/badge.png',
    badge: 'assets/badge.png',
  });
});
