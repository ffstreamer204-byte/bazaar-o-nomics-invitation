let rating = 0;

// 🔊 LOCAL SOUND (same folder me click.mp3 hona chahiye)
const sound = new Audio("click.mp3");
sound.preload = "auto";

const stars = document.querySelectorAll(".stars span");
const emoji = document.getElementById("emoji");
const live = document.getElementById("liveRating");

const emojis = ["😡","😕","😐","😊","😍"];

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    rating = index + 1;

    // ⭐ stars update
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("active");
    }

    // 🔊 SOUND PLAY (LOCAL - ALWAYS WORK)
    sound.currentTime = 0;
    sound.play().catch(() => {
      console.log("Sound issue ❌");
    });

    // 😀 emoji update
    emoji.textContent = emojis[rating - 1];

    // ✨ emoji animation restart
    emoji.classList.remove("animate");
    void emoji.offsetWidth;
    emoji.classList.add("animate");

    // ⭐ live rating update
    live.innerText = `⭐ ${rating} / 5`;
  });
});

function submitFeedback() {
  const text = document.getElementById("text").value;

  if (!rating || !text) {
    alert("Please fill all fields!");
    return;
  }

  alert("Feedback Submitted 🎉");

  // reset
  rating = 0;
  live.innerText = "⭐ 0 / 5";
  document.getElementById("text").value = "";
  stars.forEach(s => s.classList.remove("active"));
  emoji.textContent = "😐";
}