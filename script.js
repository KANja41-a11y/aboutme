/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


/* Close menu after clicking */

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* =========================
   CUSTOM SPARKLE CURSOR
========================= */

const cursor = document.querySelector(".custom-cursor");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", event => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

});


/* =========================
   SPARKLE TRAIL
========================= */

let lastSparkle = 0;

document.addEventListener("mousemove", event => {

  const now = Date.now();

  if (now - lastSparkle < 80) return;

  lastSparkle = now;

  const sparkle = document.createElement("span");

  const symbols = ["✦", "✧", "⋆", "·"];

  sparkle.className = "sparkle";

  sparkle.innerText =
    symbols[Math.floor(Math.random() * symbols.length)];

  sparkle.style.left = event.clientX + "px";
  sparkle.style.top = event.clientY + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 800);

});


/* =========================
   SUBTLE CARD TILT
========================= */

const cards = document.querySelectorAll(
  ".uni-card, .interest-card"
);

cards.forEach(card => {

  card.addEventListener("mousemove", event => {

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -3;

    const rotateY =
      ((x / rect.width) - 0.5) * 3;

    card.style.transform =
      `perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();
