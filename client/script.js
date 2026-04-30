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