document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      navLinks.forEach((item) => item.classList.remove("active"));
      if (link.closest(".main-nav")) {
        link.classList.add("active");
      }
    });
  });

  const sections = document.querySelectorAll("main section[id]");
  const menuLinks = document.querySelectorAll(".main-nav a");

  const setActiveLink = () => {
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollPosition = window.scrollY + headerHeight + 40;

    let currentSectionId = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    menuLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    if (window.scrollY < 120) {
      menuLinks.forEach((link) => link.classList.remove("active"));
      const homeLink = document.querySelector('.main-nav a[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
    }
  };

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);
  setActiveLink();
});
