const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

const cursor = document.querySelector(".custom-cursor");

if (cursor && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    if (Math.random() < 0.16) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.textContent = ["✦", "✧", "⋆", "·"][Math.floor(Math.random() * 4)];
      sparkle.style.left = `${e.clientX + (Math.random() * 12 - 6)}px`;
      sparkle.style.top = `${e.clientY + (Math.random() * 12 - 6)}px`;
      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 700);
    }
  });
}

document.querySelectorAll(".uni-card, .interest-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `perspective(700px) rotateX(${y * -2}deg) rotateY(${x * 2}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
