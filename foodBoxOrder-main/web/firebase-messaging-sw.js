importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
 apiKey: "AIzaSyBWofnMrfJFaD2Lq9zGqAlrFC15WxL1ILU",
  authDomain: "box-v2.firebaseapp.com",
  projectId: "box-v2",
  storageBucket: "box-v2.appspot.com",
  messagingSenderId: "608675073408",
  appId: "1:608675073408:web:71fef6e00eeddfe2b4c565",
  databaseURL: "https://box-v2-default-rtdb.firebaseio.com/",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});