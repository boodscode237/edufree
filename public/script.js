
document.addEventListener("DOMContentLoaded", function () {
  const educationProfiles = {
    bachelor: {
      "Applied Mathematics & Artificial Intelligence": [
        "01.03.02 Applied Mathematics and Computer Science",
        "01.03.04 Applied Mathematics",
        "02.03.01 Mathematics and Computer Sciences",
        "02.03.02 Fundamental Computer Science and Information Technologies",
        "02.03.03 Mathematical Support and Administration of Information Systems",
        "09.03.01 Informatics and Computer Technology",
        "09.03.02 Information Systems and Technologies",
        "09.03.03 Applied Informatics",
        "09.03.04 Software Engineering",
      ],
      "Biology & Biotechnology": [
        "05.03.06 Environmental Studies and Natural Resources Management",
        "06.03.01 Biology",
        "12.03.04 Biotechnology Systems and Technologies",
      ],
      "Business & Management": ["38.03.02 Management", "38.03.06 Trade"],
      "Clinical Medicine & Public Health": [
        "31.03.01 General Medicine",
        "31.03.02 Dentistry",
        "31.03.03 Pediatrics",
        "31.03.04 Medical Prevention",
      ],
      "Computer & Data Science": [
        "01.03.02 Applied Mathematics and Computer Science",
        "01.03.04 Applied Mathematics",
        "02.03.01 Mathematics and Computer Sciences",
        "02.03.02 Fundamental Computer Science and Information Technologies",
        "02.03.03 Mathematical Support and Administration of Information Systems",
        "09.03.01 Informatics and Computer Technology",
        "09.03.02 Information Systems and Technologies",
        "09.03.03 Applied Informatics",
        "09.03.04 Software Engineering",
      ],
    },
    master: {
      "Applied Mathematics & Artificial Intelligence": [
        "01.04.02 Applied Mathematics",
        "09.04.01 Applied Informatics",
      ],
      "Biology & Biotechnology": ["06.04.01 Biology", "19.04.01 Biotechnology"],
      "Business & Management": [
        "38.04.01 Economics",
        "38.04.05 Business Informatics",
        "38.04.06 Trade",
        "38.04.08 Finance and Credit",
        "38.04.09 State Audit",
      ],
      "Clinical Medicine & Public Health": ["32.04.01 Public Health"],
      "Computer & Data Science": [
        "01.04.02 Applied Mathematics",
        "09.04.01 Applied Informatics",
      ],
    },
    doctorate: {
      "Applied Mathematics & Artificial Intelligence": [
        "5.13.1 Applied Mathematics",
        "5.13.2 Mathematical Modeling and Computational Mathematics",
        "5.13.3 Information Systems and Technologies",
      ],
      "Biology & Biotechnology": [
        "1.5.3 Molecular Biology",
        "1.5.6 Biotechnology",
        "1.5.7 Genetics",
        "1.5.10 Virology",
        "1.5.11 Microbiology",
        "1.5.15 Ecology",
        "1.5.22 Cell Biology",
      ],
      "Business & Management": [
        "5.2.1 Economic Theory",
        "5.2.2 Mathematical, Statistical, and Instrumental Methods in Economics",
        "5.2.3 Regional and Sectoral Economics",
        "5.2.4 Finance",
        "5.2.5 World Economy",
      ],
      "Clinical Medicine & Public Health": [
        "3.3.1 Anatomy and Anthropology",
        "3.3.3 Pathological Physiology",
        "3.3.2 Pathological Anatomy",
        "3.3.6 Pharmacology, Clinical Pharmacology",
        "1.5.5 Human and Animal Physiology",
        "3.1.30 Gastroenterology and Dietetics",
        "3.1.28 Hematology and Blood Transfusion",
        "3.1.29 Pulmonology",
        "3.1.20 Cardiology",
        "3.1.2 Maxillofacial Surgery",
        "3.1.7 Dentistry",
        "3.1.18 Internal Medicine",
        "3.1.32 Nephrology",
        "3.1.9 Surgery",
        "3.1.19 Endocrinology",
        "3.1.22 Infectious Diseases",
        "3.2.2 Epidemiology",
        "3.2.3 Public Health, Organization, and Sociology of Healthcare; Medical and Social Expertise",
      ],
      "Computer & Data Science": [
        "5.13.1 Applied Mathematics",
        "5.13.2 Mathematical Modeling and Computational Mathematics",
        "5.13.3 Information Systems and Technologies",
      ],
    },
  };

  const form = document.getElementById("application-form");
  const contactDiv = document.getElementById("contact");

  const lastname = document.getElementById("lastname");
  const surname = document.getElementById("surname");
  const phone = document.getElementById("phone");
  const level = document.getElementById("education-level");
  const profile = document.getElementById("profile");
  const topic = document.getElementById("topic");

  level.addEventListener("change", () => {
    const selected = level.value;
    profile.innerHTML = "<option value=''>Select...</option>";
    if (educationProfiles[selected]) {
      for (let p of Object.keys(educationProfiles[selected])) {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        profile.appendChild(option);
      }
    }
    topic.innerHTML = "<option value=''>Select...</option>";
  });

  profile.addEventListener("change", () => {
    const selectedLevel = level.value;
    const selectedProfile = profile.value;
    topic.innerHTML = "<option value=''>Select...</option>";
    if (educationProfiles[selectedLevel]?.[selectedProfile]) {
      for (let t of educationProfiles[selectedLevel][selectedProfile]) {
        const option = document.createElement("option");
        option.value = t;
        option.textContent = t;
        topic.appendChild(option);
      }
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Form submitted");

    const data = {
      lastname: lastname.value.trim(),
      surname: surname.value.trim(),
      phone: phone.value.trim(),
      level: level.value,
      profile: profile.value,
      topic: topic.value,
    };

    console.log("Sending data:", data);

    const res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const contact = await fetch("/contacts").then((r) => r.json());

      contactDiv.style.display = "block";
      document.getElementById(
        "whatsapp"
      ).innerHTML = `📞 WhatsApp: <a href="${contact.whatsapp}" target="_blank">Chat</a>`;
      document.getElementById(
        "telegram"
      ).innerHTML = `📨 Telegram: <a href="${contact.telegram}" target="_blank">${contact.telegram}</a>`;
      document.getElementById(
        "email"
      ).innerHTML = `📧 Email: <a href="mailto:${contact.email}">${contact.email}</a>`;

      form.reset();
      profile.innerHTML = "<option value=''>Select...</option>";
      topic.innerHTML = "<option value=''>Select...</option>";
    } else {
      alert("Something went wrong. Please try again.");
    }
  });
});
