/* =====================================================================
   Mechanika bookletu — przewracanie kartek, język, nawigacja.
   Treść edytujesz w tresc.js, wygląd w style.css.
   ===================================================================== */

(function () {
  "use strict";

  var LEAF_COUNT = 4;   // 4 kartki = 8 stron
  var MAX_LEAF = 3;     // ostatnia rozkładówka: Kwalifikacje | Kontakt
  var MAX_PAGE = 6;     // ostatnia strona na telefonie: Kontakt

  var book = document.getElementById("book");
  var dotsBox = document.getElementById("dots");
  var btnPrev = document.getElementById("prev");
  var btnNext = document.getElementById("next");
  var btnLang = document.getElementById("lang");
  var homeLink = document.getElementById("home-link");

  var lang = localStorage.getItem("booklet-lang") || "pl";
  var leaf = 0;   // ile kartek przewróconych (widok komputera)
  var page = 0;   // która strona (widok telefonu)
  var leaves = [];
  var faces = [];
  var wasDesktop = null;

  /* ------------------------------ pomocnicze ----------------------- */

  function isDesktop() {
    return window.matchMedia("(min-width: 860px)").matches;
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : (v > hi ? hi : v);
  }

  function flipMs() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--flip");
    return parseFloat(raw) || 900;
  }

  var IKONA_LINKEDIN =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.7 8.65 22 11 22 14.4V21h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21H9z"/></svg>';

  /* --------------------------- budowa stron ------------------------ */

  function stronaOkladka(t) {
    return '' +
      '<div class="pg cover">' +
        '<img class="cover__photo" src="foto.jpg" alt="' + t.cover.name.replace("\n", " ") + '">' +
        '<h1 class="cover__name">' + t.cover.name + '</h1>' +
        '<div class="cover__rule"></div>' +
        '<p class="cover__role">' + t.cover.role + '</p>' +
        '<p class="cover__creds">' + t.cover.creds + '</p>' +
        '<p class="cover__tag">' + t.cover.tagline + '</p>' +
        '<button class="cover__open" type="button" data-open>' + t.ui.open + '</button>' +
      '</div>';
  }

  function stronaProfil(t) {
    var statsy = t.profil.stats.map(function (s) {
      return '<div class="stat"><div class="stat__v">' + s.v + '</div>' +
             '<div class="stat__l">' + s.l + '</div></div>';
    }).join("");

    var cechy = (t.profil.cechy || []).map(function (c) {
      return '<span class="cecha">' + c + '</span>';
    }).join("");

    return '' +
      '<div class="pg">' +
        '<div class="pg__label">' + t.profil.label + '</div>' +
        '<p class="profil__body">' + t.profil.body + '</p>' +
        (cechy ? '<div class="cechy">' + cechy + '</div>' : '') +
        '<div class="stats">' + statsy + '</div>' +
        '<div class="pg__num">2</div>' +
      '</div>';
  }

  function stronaMysl(t) {
    var cytaty = t.mysl.cytaty.map(function (c) {
      return '<div class="cytat">' +
               '<span class="cytat__mark">&ldquo;</span>' +
               '<p class="cytat__duze">' + c.duze + '</p>' +
               (c.male ? '<p class="cytat__male">' + c.male + '</p>' : '') +
               (c.stopka ? '<p class="cytat__stopka">' + c.stopka + '</p>' : '') +
             '</div>';
    }).join("");

    var gesto = t.mysl.cytaty.length > 1 ? " mysl--multi" : "";

    return '' +
      '<div class="pg mysl' + gesto + '">' +
        '<div class="pg__label">' + t.mysl.label + '</div>' +
        cytaty +
        '<div class="pg__num">3</div>' +
      '</div>';
  }

  function stronaKompetencje(t) {
    var kafelki = t.kompetencje.lista.map(function (k) {
      return '<div class="komp__item">' + k + '</div>';
    }).join("");

    return '' +
      '<div class="pg">' +
        '<div class="pg__label">' + t.kompetencje.label + '</div>' +
        '<div class="komp">' + kafelki + '</div>' +
        '<div class="pg__num">4</div>' +
      '</div>';
  }

  function stronaDoswiadczenie(t) {
    var role = t.doswiadczenie.role.map(function (r) {
      var hasla = r.hasla.map(function (h) {
        return '<span class="haslo">' + h + '</span>';
      }).join("");

      return '<div class="rola">' +
               '<div class="rola__top">' +
                 '<span class="rola__stanowisko">' + r.stanowisko + '</span>' +
                 '<span class="rola__lata">' + r.lata + '</span>' +
               '</div>' +
               '<div class="rola__firma">' + r.firma + '</div>' +
               '<div class="hasla">' + hasla + '</div>' +
             '</div>';
    }).join("");

    return '' +
      '<div class="pg">' +
        '<div class="pg__label">' + t.doswiadczenie.label + '</div>' +
        '<div class="role">' + role + '</div>' +
        '<div class="pg__num">5</div>' +
      '</div>';
  }

  function stronaKwalifikacje(t) {
    var grupy = t.kwalifikacje.grupy.map(function (g) {
      var poz = g.pozycje.map(function (p) { return '<li>' + p + '</li>'; }).join("");
      return '<div class="kwal__grupa">' +
               '<div class="kwal__tytul">' + g.tytul + '</div>' +
               '<ul class="kwal__lista">' + poz + '</ul>' +
             '</div>';
    }).join("");

    return '' +
      '<div class="pg">' +
        '<div class="pg__label">' + t.kwalifikacje.label + '</div>' +
        '<div class="kwal">' + grupy + '</div>' +
        '<div class="pg__num">6</div>' +
      '</div>';
  }

  function stronaKontakt(t) {
    return '' +
      '<div class="pg kontakt">' +
        '<div class="pg__label">' + t.kontakt.label + '</div>' +
        '<h2 class="kontakt__h">' + t.kontakt.naglowek + '</h2>' +
        '<p class="kontakt__t">' + t.kontakt.tekst + '</p>' +
        '<a class="kontakt__cta" href="' + LINKEDIN + '" target="_blank" rel="noopener">' +
          IKONA_LINKEDIN + t.kontakt.cta +
        '</a>' +
        '<div class="kontakt__miasto">' + t.kontakt.miasto + '</div>' +
        '<div class="pg__num">7</div>' +
      '</div>';
  }

  function stronaTyl() {
    return '<div class="pg tyl"><div class="tyl__mono">M</div></div>';
  }

  function zbudujStrony(t) {
    return [
      stronaOkladka(t),
      stronaProfil(t),
      stronaMysl(t),
      stronaKompetencje(t),
      stronaDoswiadczenie(t),
      stronaKwalifikacje(t),
      stronaKontakt(t),
      stronaTyl()
    ];
  }

  /* ----------------------------- budowa DOM ------------------------ */

  function build() {
    var t = TRESC[lang];
    var strony = zbudujStrony(t);

    book.innerHTML = "";
    leaves = [];
    faces = [];

    for (var i = 0; i < LEAF_COUNT; i++) {
      var l = document.createElement("div");
      l.className = "leaf";
      l.innerHTML =
        '<div class="face face--front">' + strony[i * 2] + '</div>' +
        '<div class="face face--back">' + strony[i * 2 + 1] + '</div>';
      book.appendChild(l);
      leaves.push(l);
      faces.push(l.children[0], l.children[1]);
    }

    document.documentElement.lang = lang;
    btnLang.textContent = t.ui.langLabel;
    btnPrev.setAttribute("aria-label", t.ui.prev);
    btnNext.setAttribute("aria-label", t.ui.next);
    homeLink.querySelector("span").textContent = lang === "pl" ? "Strona główna" : "Home";
    homeLink.setAttribute("aria-label", lang === "pl" ? "Wróć do strony głównej" : "Return to home page");
  }

  function buildDots() {
    var n = isDesktop() ? MAX_LEAF + 1 : MAX_PAGE + 1;
    dotsBox.innerHTML = "";
    for (var i = 0; i < n; i++) {
      var d = document.createElement("button");
      d.className = "dot";
      d.type = "button";
      d.dataset.i = i;
      d.setAttribute("aria-label", String(i + 1));
      dotsBox.appendChild(d);
    }
  }

  /* ------------------------------ render --------------------------- */

  function setZ() {
    leaves.forEach(function (l, i) {
      l.style.zIndex = (i < leaf) ? (i + 1) : (LEAF_COUNT - i);
    });
  }

  function render(flippedIndex) {
    var desktop = isDesktop();

    if (desktop) {
      book.classList.toggle("is-closed", leaf === 0);
      leaves.forEach(function (l, i) {
        l.classList.toggle("is-flipped", i < leaf);
      });
      setZ();
      if (typeof flippedIndex === "number" && leaves[flippedIndex]) {
        leaves[flippedIndex].style.zIndex = 50;   // kartka w locie nad resztą
        setTimeout(setZ, flipMs());
      }
      faces.forEach(function (f) { f.classList.remove("is-current"); });
    } else {
      book.classList.remove("is-closed");
      leaves.forEach(function (l) { l.classList.remove("is-flipped"); });
      faces.forEach(function (f, i) { f.classList.toggle("is-current", i === page); });
    }

    var idx = desktop ? leaf : page;
    var max = desktop ? MAX_LEAF : MAX_PAGE;
    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === max;

    Array.prototype.forEach.call(dotsBox.children, function (d, i) {
      d.classList.toggle("is-on", i === idx);
    });
  }

  function go(delta) {
    if (isDesktop()) {
      var next = clamp(leaf + delta, 0, MAX_LEAF);
      if (next === leaf) return;
      var moving = delta > 0 ? leaf : next;   // która kartka się obraca
      leaf = next;
      render(moving);
    } else {
      var np = clamp(page + delta, 0, MAX_PAGE);
      if (np === page) return;
      page = np;
      render();
    }
  }

  function goTo(i) {
    if (isDesktop()) {
      var next = clamp(i, 0, MAX_LEAF);
      if (next === leaf) return;
      var moving = next > leaf ? leaf : next;
      leaf = next;
      render(moving);
    } else {
      page = clamp(i, 0, MAX_PAGE);
      render();
    }
  }

  /* ---------------------------- zdarzenia -------------------------- */

  btnPrev.addEventListener("click", function () { go(-1); });
  btnNext.addEventListener("click", function () { go(1); });

  dotsBox.addEventListener("click", function (e) {
    var d = e.target.closest(".dot");
    if (d) goTo(Number(d.dataset.i));
  });

  btnLang.addEventListener("click", function () {
    lang = (lang === "pl") ? "en" : "pl";
    localStorage.setItem("booklet-lang", lang);
    build();
    render();
  });

  book.addEventListener("click", function (e) {
    if (e.target.closest("[data-open]")) { go(1); return; }
    if (e.target.closest("a, button")) return;
    if (isDesktop()) go(1);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "PageDown") { go(1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { go(-1); }
    else if (e.key === "Home") { goTo(0); }
    else if (e.key === "End") { goTo(99); }
  });

  var tx = 0, ty = 0;
  book.addEventListener("touchstart", function (e) {
    tx = e.changedTouches[0].clientX;
    ty = e.changedTouches[0].clientY;
  }, { passive: true });

  book.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  window.addEventListener("resize", function () {
    var d = isDesktop();
    if (d === wasDesktop) return;
    if (d) {
      leaf = clamp(Math.ceil(page / 2), 0, MAX_LEAF);
    } else {
      page = clamp(leaf === 0 ? 0 : leaf * 2 - 1, 0, MAX_PAGE);
    }
    wasDesktop = d;
    buildDots();
    render();
  });

  /* ------------------------------ start ---------------------------- */

  wasDesktop = isDesktop();
  build();
  buildDots();
  render();
})();
