/* Opens the full-screen contact overlay when "contact" in the menu is clicked,
   and closes it via the X, a backdrop click, or Escape. */
(function () {
  function init() {
    var overlay = document.getElementById("contact-overlay");
    if (!overlay) return;
    var closeBtn = overlay.querySelector(".contact-close");

    function open(e) {
      if (e) e.preventDefault();
      // close the burger menu first if it happens to be open
      var menuBtn = document.querySelector(".w-nav-button.w--open");
      if (menuBtn) menuBtn.click();
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
    }

    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
    }

    document.querySelectorAll(".js-contact-link").forEach(function (a) {
      a.addEventListener("click", open);
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    // allow deep-linking to the contact screen, e.g. index.html#contact
    if (location.hash === "#contact") open();
    window.addEventListener("hashchange", function () {
      if (location.hash === "#contact") open();
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
