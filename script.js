let rating = 0;

// 🔊 SOUND
const sound = new Audio("click.mp3");
sound.preload = "auto";

const stars = document.querySelectorAll(".stars span");
const emoji = document.getElementById("emoji");
const live = document.getElementById("liveRating");

const emojis = ["😡","😕","😐","😊","😍"];

// ⭐ STAR CLICK
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    rating = index + 1;

    // stars update
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("active");
    }

    // sound
    sound.currentTime = 0;
    sound.play().catch(()=>{});

    // emoji
    emoji.textContent = emojis[rating - 1];

    // animation
    emoji.classList.remove("animate");
    void emoji.offsetWidth;
    emoji.classList.add("animate");

    // live rating
    live.innerText = `⭐ ${rating} / 5`;
  });
});


// 🚀 SUBMIT FUNCTION
function submitFeedback() {

  const text = document.getElementById("text").value;

  if (!rating || !text) {
    alert("Please fill all fields!");
    return;
  }

  // 🤖 TELEGRAM (same as attendance bot)
  const token = "8658392704:AAGPui4abxdTL1HjNdmJxJhTVLT6Um3Og-Y";
  const chat_id = "5083324379";

  const message = `
📩 NEW FEEDBACK

⭐ Rating: ${rating}/5
💬 Message: ${text}
`;

  // 📤 SEND
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`)
  .then(() => {

    alert("Feedback Submitted 🎉");

    // reset
    rating = 0;
    live.innerText = "⭐ 0 / 5";
    document.getElementById("text").value = "";
    stars.forEach(s => s.classList.remove("active"));
    emoji.textContent = "😐";

  })
  .catch(() => {
    alert("Error sending feedback ❌");
  });
}
