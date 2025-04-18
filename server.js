// const express = require("express");
// const admin = require("firebase-admin");
// const dotenv = require("dotenv");
// const path = require("path");
// const cors = require("cors");

// // Load .env
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// // ✅ Use service account credentials
// const serviceAccount = require("./firebaseConfig.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// // ✅ POST /submit → Save to Firestore
// app.post("/submit", async (req, res) => {
//   try {
//     const { lastname, surname, phone, level, profile, topic } = req.body;

//     if (!lastname || !surname || !phone || !level || !profile || !topic) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     const docRef = await db.collection("applications").add({
//       lastname,
//       surname,
//       phone,
//       level,
//       profile,
//       topic,
//       submittedAt: new Date(),
//     });

//     res.status(200).json({ message: "Saved successfully", id: docRef.id });
//   } catch (err) {
//     console.error("Error saving to Firestore:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // ✅ GET /contacts → Load WhatsApp/Telegram/Email from .env
// app.get("/contacts", (req, res) => {
//   res.json({
//     whatsapp: process.env.WHATSAPP_LINK,
//     telegram: process.env.TELEGRAM_LINK,
//     email: process.env.CONTACT_EMAIL,
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`Server running at http://localhost:${PORT}`)
// );

const express = require("express");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// Load .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ✅ Use service account credentials
const serviceAccount = require("./firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ POST /submit → Save to Firestore
app.post("/submit", async (req, res) => {
  try {
    const { lastname, surname, phone, level, profile, topic } = req.body;

    if (!lastname || !surname || !phone || !level || !profile || !topic) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const docRef = await db.collection("applications").add({
      lastname,
      surname,
      phone,
      level,
      profile,
      topic,
      submittedAt: new Date(),
    });

    res.status(200).json({ message: "Saved successfully", id: docRef.id });
  } catch (err) {
    console.error("Error saving to Firestore:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET /contacts → Load WhatsApp/Telegram/Email from .env
app.get("/contacts", (req, res) => {
  res.json({
    whatsapp: process.env.WHATSAPP_LINK,
    telegram: process.env.TELEGRAM_LINK,
    email: process.env.CONTACT_EMAIL,
  });
});

// Middleware to serve static files from public and dashboard
app.use("/dashboard", express.static(path.join(__dirname, "dashboard")));
app.use(express.static(path.join(__dirname, "public")));

// Route for root - serve main landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route for dashboard view
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
