// app.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("applications")
  .orderBy("submittedAt", "desc")
  .get()
  .then((querySnapshot) => {
    const tableBody = document.getElementById("table-body");
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.lastname || ""}</td>
        <td>${data.surname || ""}</td>
        <td>${data.phone || ""}</td>
        <td>${data.level || ""}</td>
        <td>${data.profile || ""}</td>
        <td>${data.topic || ""}</td>
        <td>${data.submittedAt?.toDate().toLocaleString() || ""}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
