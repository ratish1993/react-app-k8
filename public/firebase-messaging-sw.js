// // Scripts for firebase and firebase messaging
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.11.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging-compat.js"
// );

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyCnlRFFnROFk4f_gfQsBBwiYf8Z6w7DPFQ",
//   authDomain: "avijitsamanta-class12.firebaseapp.com",
//   projectId: "avijitsamanta-class12",
//   storageBucket: "avijitsamanta-class12.appspot.com",
//   messagingSenderId: "822484338282",
//   appId: "1:822484338282:web:86d581e6f0bd049d5c2c13",
//   measurementId: "G-4391EW9Y03",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message ", payload);

//   //   const notificationTitle = payload.data.title;
//   const notificationTitle = "Title";
//   const notificationOptions = {
//     body: "payload.data.description",
//     icon: "payload.data.icon",
//     data: "payload.data",
//   };
//   //   const notificationOptions = {
//   //     body: payload.data.description,
//   //     icon: payload.data.icon,
//   //     data: payload.data,
//   //   };
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });

// self.addEventListener("notificationclick", (event) => {
//   let url = "";
//   let { data } = event.notification;
//   switch (data.type) {
//     case "my_assigned_list":
//       if (data.call_from && data.call_from === "my_assigned_list") {
//         url = `/feedback-history/${data.lead_id}/${data.lead_assignee_activity_id}/${data.call_from}/${data.dashboard_id}`;
//         break;
//       }
//       url = "/my-assigned-lead";
//       break;
//     case "assigned_list":
//       url = `/feedback-history/${data.lead_id}/${data.lead_assignee_activity_id}/${data.call_from}/${data.dashboard_id}`;
//       break;
//     default:
//       url = "/dashboard";
//       break;
//   }

//   event.notification.close();
//   event.waitUntil(
//     clients.matchAll({ type: "window" }).then((windowClients) => {
//       // Check if there is already a window/tab open with the target URL
//       for (let i = 0; i < windowClients.length; i++) {
//         let client = windowClients[i];
//         // If so, just focus it.
//         if (client.url === url && "focus" in client) {
//           return client.focus();
//         }
//       }
//       // If not, then open the target URL in a new window/tab.
//       if (clients.openWindow) {
//         return clients.openWindow(url);
//       }
//     })
//   );
// });
