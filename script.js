// ========================================
// MOBILE NAVIGATION
// ========================================

const menuButton =
  document.querySelector(".menu-button");

const navLinks =
  document.querySelector(".nav-links");


menuButton.addEventListener("click", () => {

  const isOpen =
    navLinks.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    isOpen
  );

  menuButton.textContent =
    isOpen ? "✕" : "☰";

});


// Close menu after clicking navigation

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.textContent = "☰";

    });

  });



// ========================================
// SCROLL REVEAL
// ========================================

const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {

    revealObserver.observe(element);

  });



// ========================================
// BOTANICAL CURSOR
// ========================================

const leafCursor =
  document.querySelector(".leaf-cursor");


let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


window.addEventListener(
  "mousemove",
  event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  }
);


function animateCursor() {

  cursorX +=
    (mouseX - cursorX) * 0.15;

  cursorY +=
    (mouseY - cursorY) * 0.15;


  leafCursor.style.left =
    `${cursorX}px`;

  leafCursor.style.top =
    `${cursorY}px`;


  requestAnimationFrame(
    animateCursor
  );

}


animateCursor();



// ========================================
// LITTLE LEAF TRAIL
// ========================================

let lastLeaf = 0;


window.addEventListener(
  "mousemove",
  event => {

    const now =
      Date.now();


    if (
      now - lastLeaf < 180
    ) {
      return;
    }


    lastLeaf = now;


    const leaf =
      document.createElement("span");


    const symbols = [
      "·",
      "✦",
      "❧",
      "⌁"
    ];


    leaf.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    leaf.style.position =
      "fixed";

    leaf.style.left =
      `${event.clientX}px`;

    leaf.style.top =
      `${event.clientY}px`;

    leaf.style.pointerEvents =
      "none";

    leaf.style.zIndex =
      "9998";

    leaf.style.color =
      "#77806c";

    leaf.style.fontSize =
      `${8 + Math.random() * 8}px`;

    leaf.style.opacity =
      "0.55";

    leaf.style.transition =
      "all 1s ease";


    document.body.appendChild(
      leaf
    );


    requestAnimationFrame(() => {

      leaf.style.transform =
        `translate(
          ${(Math.random() - 0.5) * 35}px,
          -35px
        ) rotate(120deg)`;

      leaf.style.opacity =
        "0";

    });


    setTimeout(() => {

      leaf.remove();

    }, 1100);

  }
);



// ========================================
// CURRENT YEAR
// ========================================

document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();



// ========================================
// CARD TILT — VERY SUBTLE
// ========================================

const cards =
  document.querySelectorAll(
    ".university-card, .interest-box"
  );


cards.forEach(card => {

  card.addEventListener(
    "mousemove",
    event => {

      if (
        window.innerWidth < 850
      ) {
        return;
      }


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const rotateX =
        ((y / rect.height) - 0.5) * -3;


      const rotateY =
        ((x / rect.width) - 0.5) * 3;


      card.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        "";

    }
  );

});
