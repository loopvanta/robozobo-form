// ===== SELECT FORM =====
const form = document.getElementById("form");
const submitBtn = document.querySelector("button[type='submit']");

// ===== SUBMIT HANDLER =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const slot = document.querySelector('input[name="slot"]:checked')?.value;

  if (!slot) {
    alert("Please select a slot ⏰");
    return;
  }

  // ===== GET VALUES =====
  const data = {
    phone: document.getElementById("countryCode").value +
           document.getElementById("phone").value,
    email: document.getElementById("email").value,
    name: document.getElementById("name").value,
    parent: document.getElementById("parent").value,
    grade: document.getElementById("grade").value,
    course: document.getElementById("course").value,
    slot: slot
  };

  console.log(data);

  try {
    // 🔄 DISABLE BUTTON + SHOW LOADING
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting... ⏳";

    // ===== SEND TO BACKEND =====
    const res = await fetch("https://robozobo-form.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.text();
    console.log(result);

    // ✅ SUCCESS ONLY IF RESPONSE OK
    if (res.ok) {
      showPopup();  // success popup
      form.reset();
    } else {
      throw new Error("Server error");
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong ❌\nPlease try again!");
  }

  // 🔁 RESET BUTTON
  submitBtn.disabled = false;
  submitBtn.innerText = "Register Now 🚀";
});
// ===== SUCCESS POPUP FUNCTION =====
// ===== SUCCESS POPUP FUNCTIONS =====
function showPopup() {
  const popup = document.getElementById("successPopup");
  if (popup) {
    popup.style.display = "flex";
    burstConfetti(); // optional 🎉
  }
}

function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}

function burstConfetti() {
  const container = document.getElementById("confetti");

  for (let i = 0; i < 60; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti-piece");

    const x = (Math.random() - 0.5) * 300 + "px";
    const y = (Math.random() - 0.5) * 300 + "px";

    conf.style.setProperty("--x", x);
    conf.style.setProperty("--y", y);

    container.appendChild(conf);

    setTimeout(() => conf.remove(), 1000);
  }
}

const gradeSelect = document.getElementById("grade");
const courseSelect = document.getElementById("course");

gradeSelect.addEventListener("change", () => {
  const grade = gradeSelect.value;

  // clear previous options
  courseSelect.innerHTML = "";

  // extract number from "Grade 3"
  const gradeNumber = parseInt(grade.replace(/\D/g, ""));

  if (gradeNumber >= 3 && gradeNumber <= 5) {
    // only Game Development
    courseSelect.innerHTML = `
      <option value="Game Development">Game Development</option>
    `;
  } else if (gradeNumber > 5) {
    // both courses
    courseSelect.innerHTML = `
      <option value="Block-Coding">Block Coding</option>
      <option value="Game Development">Game Development</option>
    `;
  } else {
    // fallback (optional)
    courseSelect.innerHTML = `
      <option value="">Select Course</option>
    `;
  }
});