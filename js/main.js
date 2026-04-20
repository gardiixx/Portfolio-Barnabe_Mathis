(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 900px)").matches) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();

(function () {
  var grid = document.querySelector(".skills-grid");
  if (!grid) return;

  var cards = grid.querySelectorAll(".skill-item");
  if (!cards.length) return;

  function closeAll() {
    cards.forEach(function (c) {
      c.classList.remove("is-expanded");
      c.setAttribute("aria-expanded", "false");
    });
  }

  cards.forEach(function (card, index) {
    var panel = card.querySelector(".skill-more");
    if (!panel) return;

    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");
    if (!panel.id) {
      panel.id = "skill-more-" + (index + 1);
    }
    card.setAttribute("aria-controls", panel.id);

    panel.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    card.addEventListener("click", function (e) {
      e.stopPropagation();
      var wasOpen = card.classList.contains("is-expanded");
      closeAll();
      if (!wasOpen) {
        card.classList.add("is-expanded");
        card.setAttribute("aria-expanded", "true");
      }
    });

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  document.addEventListener("click", function () {
    closeAll();
  });
})();

(function () {
  var btn = document.getElementById("contact-submit");
  if (!btn) return;

  btn.addEventListener("click", function () {
    var nom     = document.getElementById("contact-nom").value.trim();
    var email   = document.getElementById("contact-email").value.trim();
    var message = document.getElementById("contact-message").value.trim();

    if (!nom || !email || !message) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    var destinataire = "mathisbarnabe.pro@gmail.com";
    var sujet        = encodeURIComponent("Contact Portfolio — " + nom);
    var corps        = encodeURIComponent(
      "Nom : " + nom + "\n" +
      "Email : " + email + "\n\n" +
      "Message :\n" + message
    );

    window.location.href = "mailto:" + destinataire + "?subject=" + sujet + "&body=" + corps;
  });
})();
