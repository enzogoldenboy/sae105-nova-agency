/* ==================================================
   MENU BURGER
================================================== */

const burgerBtn = document.getElementById("burger-btn");
const navLinks = document.getElementById("nav-links");

burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("header__links--active");
});


/* ==================================================
   FERMER LE MENU MOBILE APRÈS UN CLIC SUR UN LIEN
================================================== */

const menuLinks = document.querySelectorAll(".header__link");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("header__links--active");
  });
});


/* ==================================================
   ANIMATION DES STATISTIQUES
================================================== */

const stats = document.querySelectorAll(".stat__number");

function animateStats() {

  stats.forEach(stat => {

    const target = Number(stat.dataset.target);

    let current = 0;

    const increment = target / 100;

    const timer = setInterval(() => {

      current += increment;

      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }

    }, 20);

  });

}


/* ==================================================
   LANCEMENT DE L'ANIMATION QUAND LA SECTION APPARAÎT
================================================== */

const aboutSection = document.querySelector(".about");

let statsAnimated = false;

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting && !statsAnimated) {

      animateStats();

      statsAnimated = true;
    }

  });

}, {
  threshold: 0.4
});

observer.observe(aboutSection);


/* ==================================================
   FILTRES DU PORTFOLIO
================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("filter-btn--active");
    });

    button.classList.add("filter-btn--active");

    const filter = button.dataset.filter;

    projects.forEach(project => {

      const category = project.dataset.category;

      if (filter === "all" || category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }

    });

  });

});


/* ==================================================
   VALIDATION DU FORMULAIRE
================================================== */

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

form.addEventListener("submit", (event) => {

  event.preventDefault();

  let isValid = true;

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Veuillez entrer votre nom.";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Veuillez entrer votre email.";
    isValid = false;
  } else if (!emailInput.value.includes("@")) {
    emailError.textContent = "Adresse email invalide.";
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent =
      "Votre message doit contenir au moins 10 caractères.";
    isValid = false;
  }

  if (isValid) {

    alert("Message envoyé avec succès !");

    form.reset();

  }

});


/* ==================================================
   HEADER QUI CHANGE AU SCROLL
================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }

});


/* ==================================================
   SCROLL FLUIDE POUR TOUS LES LIENS INTERNES
================================================== */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {

  link.addEventListener("click", (e) => {

    const targetId = link.getAttribute("href");

    if (targetId === "#") return;

    e.preventDefault();

    const targetSection = document.querySelector(targetId);

    if (targetSection) {

      targetSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});