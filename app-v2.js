(function () {
  "use strict";

  var copy = {
    pl: {
      profile: "Profil", experience: "Doświadczenie", qualifications: "Kwalifikacje", contact: "Kontakt",
      heroLead: "Strategiczne finanse dla organizacji produkcyjnych i grup międzynarodowych.",
      primary: "Zobacz doświadczenie", booklet: "Otwórz booklet", profileTitle: "Finanse blisko biznesu",
      approachTitle: "Zasady, które prowadzą do lepszych decyzji", experienceTitle: "Doświadczenie zawodowe",
      qualificationsTitle: "Wiedza i narzędzia", back: "Do góry ↑", unavailable: "Profil LinkedIn — uzupełnij adres"
    },
    en: {
      profile: "Profile", experience: "Experience", qualifications: "Qualifications", contact: "Contact",
      heroLead: "Strategic finance for manufacturing businesses and international groups.",
      primary: "View experience", booklet: "Open booklet", profileTitle: "Finance close to the business",
      approachTitle: "Principles behind better decisions", experienceTitle: "Professional experience",
      qualificationsTitle: "Knowledge and tools", back: "Back to top ↑", unavailable: "LinkedIn profile — add address"
    }
  };

  var lang = "pl";
  try { lang = localStorage.getItem("profile-lang") || localStorage.getItem("booklet-lang") || "pl"; } catch (_) {}
  if (!TRESC[lang]) lang = "pl";

  function el(id) { return document.getElementById(id); }
  function text(id, value) { el(id).textContent = value; }

  function render() {
    var t = TRESC[lang];
    var c = copy[lang];
    document.documentElement.lang = lang;
    document.title = t.cover.name.replace("\n", " ") + " — " + t.cover.role;

    document.querySelectorAll("[data-nav]").forEach(function (node) {
      node.textContent = c[node.dataset.nav];
    });
    text("lang-v2", lang === "pl" ? "EN" : "PL");
    text("hero-role", t.cover.role);
    text("hero-name", t.cover.name.replace("\n", " "));
    text("hero-lead", c.heroLead);
    text("hero-primary", c.primary);
    text("hero-booklet", c.booklet);
    text("profile-label", t.profil.label);
    text("profile-title", c.profileTitle);
    text("profile-copy", t.profil.body);
    text("approach-label", t.mysl.label);
    text("approach-title", c.approachTitle);
    text("experience-label", t.doswiadczenie.label);
    text("experience-title", c.experienceTitle);
    text("qualifications-label", t.kwalifikacje.label);
    text("qualifications-title", c.qualificationsTitle);
    text("contact-label", t.kontakt.label);
    text("contact-title", t.kontakt.naglowek);
    text("contact-copy", t.kontakt.tekst);
    text("location", t.kontakt.miasto);
    text("back-top", c.back);

    el("credentials").innerHTML = t.cover.creds.split("·").map(function (item) {
      return "<li>" + item.trim() + "</li>";
    }).join("");
    el("stats").innerHTML = t.profil.stats.map(function (s) {
      return '<div class="stat"><strong>' + s.v + '</strong><span>' + s.l + "</span></div>";
    }).join("");
    el("expertise").innerHTML = t.kompetencje.lista.map(function (item, i) {
      return '<article><span>0' + (i + 1) + "</span><h3>" + item + "</h3></article>";
    }).join("");
    el("quotes").innerHTML = t.mysl.cytaty.map(function (q) {
      return '<blockquote><p class="quote-main">' + q.duze + "</p>" +
        (q.male ? "<p>" + q.male + "</p>" : "") +
        (q.stopka ? '<footer class="quote-note">' + q.stopka + "</footer>" : "") + "</blockquote>";
    }).join("");
    el("timeline").innerHTML = t.doswiadczenie.role.map(function (r) {
      return '<article class="job"><div class="job__date">' + r.lata + '</div><div><h3>' + r.stanowisko +
        '</h3><p class="job__company">' + r.firma + '</p><ul class="tags">' + r.hasla.map(function (h) {
          return "<li>" + h + "</li>";
        }).join("") + "</ul></div></article>";
    }).join("");
    el("qualification-grid").innerHTML = t.kwalifikacje.grupy.map(function (g) {
      return "<article><h3>" + g.tytul + "</h3><ul>" + g.pozycje.map(function (p) {
        return "<li>" + p + "</li>";
      }).join("") + "</ul></article>";
    }).join("");

    var linkedin = el("linkedin");
    if (/TWOJ-PROFIL/.test(LINKEDIN)) {
      linkedin.removeAttribute("href");
      linkedin.setAttribute("aria-disabled", "true");
      linkedin.textContent = c.unavailable;
    } else {
      linkedin.href = LINKEDIN;
      linkedin.removeAttribute("aria-disabled");
      linkedin.textContent = t.kontakt.cta;
    }
  }

  el("lang-v2").addEventListener("click", function () {
    lang = lang === "pl" ? "en" : "pl";
    try { localStorage.setItem("profile-lang", lang); } catch (_) {}
    render();
  });

  el("year").textContent = new Date().getFullYear();
  render();
})();
