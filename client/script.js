// ===== SELECT FORM =====
const form = document.getElementById("form");

// ===== SUBMIT HANDLER =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const slot = document.querySelector('input[name="slot"]:checked')?.value;

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
if (!slot) {
  alert("Please select a slot ⏰");
  return;
}
  try {
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

    // ===== SHOW SUCCESS POPUP =====
    showPopup();

    // ===== RESET FORM =====
    form.reset();

  } catch (err) {
    console.log(err);
    alert("Server error ❌");
  }
});


// ===== SUCCESS POPUP FUNCTIONS =====
function showPopup() {
  document.getElementById("successPopup").style.display = "flex";

  burstConfetti();  // 🎉 THIS LINE
}

function closePopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "none";
}
function burstConfetti() {
  const container = document.getElementById("confetti");

  for (let i = 0; i < 60; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti-piece");

    // random direction
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

  courseSelect.innerHTML = ""; // clear

  if (["Grade 3", "Grade 4", "Grade 5"].includes(grade)) {
    // only game dev
    courseSelect.innerHTML = `
      <option value="Game Development">Game Development</option>
    `;
  } else {
    // all courses
    courseSelect.innerHTML = `
     
      <option value="Block-Coding">Block-Coding</option>
      <option value="Game Development">Game Development</option>
    `;
  }
});