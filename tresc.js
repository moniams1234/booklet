/* =====================================================================
   TREŚĆ BOOKLETU — tu edytujesz wszystkie teksty.
   Kod (booklet.js, style.css) nie musi być ruszany.

   ⚠️ PODMIEŃ PONIŻSZY ADRES NA SWÓJ PROFIL LINKEDIN:
   ===================================================================== */

const LINKEDIN = "https://www.linkedin.com/in/monika-siurnicka-%C5%9Blusarczyk-3818b91a4/";

const TRESC = {
  /* ================================ POLSKI ============================ */
  pl: {
    ui: {
      langLabel: "EN",
      prev: "Poprzednia strona",
      next: "Następna strona",
      open: "Otwórz",
    },

    cover: {
      name: "Monika\nSiurnicka-Ślusarczyk",
      role: "Dyrektor Finansowy",
      creds: "Biegły rewident · FCCA · MBA",
      tagline: "15+ lat · Produkcja · Grupy międzynarodowe",
    },

    profil: {
      label: "O mnie",
      body:
        "Łączę strategię finansową z praktyką biznesową. Ponad 15 lat doświadczenia " +
        "w finansach w środowiskach międzynarodowych i wielopodmiotowych.",
      cechy: ["Myślenie strategiczne", "Rozumienie biznesu"],
      stats: [
        { v: "15+", l: "lat w finansach" },
        { v: "FCCA", l: "biegły rewident" },
        { v: "MBA", l: "Politechnika Gdańska" },
      ],
    },

    /* Chcesz więcej myśli? Dopisz kolejny obiekt do tablicy — kartka
       automatycznie pokaże je jedna pod drugą. */
    mysl: {
      label: "Moje podejście",
      cytaty: [
        {
          duze: "Dobry budżet nie ma przewidywać przyszłości.",
          male:
            "Ma przygotować organizację na różne scenariusze i wspierać lepsze " +
            "decyzje biznesowe.",
          stopka:
            "Fundamentem budżetowania jest rozumienie, jak zmienia się biznes, " +
            "jakie wyzwania stoją przed organizacją i na jakie scenariusze " +
            "musimy być gotowi.",
        },
        {
          duze:
            "Finanse to nie tylko liczby. To rozumienie biznesu, ludzi " +
            "i procesów w całej organizacji.",
        },
      ],
    },

    kompetencje: {
      label: "Obszary specjalizacji",
      lista: [
        "Strategia finansowa, budżetowanie i planowanie",
        "Zarządzanie wynikami i raportowanie zarządcze",
        "Zarządzanie płynnością i wartością przedsiębiorstwa",
        "Zarządzanie ryzykiem i kontrola wewnętrzna",
      ],
    },

    doswiadczenie: {
      label: "Doświadczenie",
      role: [
        {
          stanowisko: "Head of Finance",
          firma: "CCL Specialty Cartons",
          lata: "2024 – obecnie",
          hasla: [
            "Produkcja",
            "Płynność i finansowanie",
            "Budżety i KPI",
            "CAPEX",
            "MSSF",
            "Finanse korporacyjne",
            "Raportowanie",
            "Forecasty",
            "Biznesplany",
          ],
        },
        {
          stanowisko: "Dyrektor Finansowy",
          firma: "PGZ Stocznia Wojenna",
          lata: "2022 – 2023",
          hasla: [
            "Produkcja obronna",
            "Strategia finansowa",
            "Nadzór nad budżetowaniem",
            "Kontrola inwestycji",
            "Doradztwo biznesowe",
          ],
        },
        {
          stanowisko: "Dyrektor ds. Finansowo-Księgowych — Główny Księgowy",
          firma: "PRS SA",
          lata: "2018 – 2022",
          hasla: [
            "Centrala i spółki międzynarodowe",
            "Standaryzacja raportowania",
            "Usprawnianie procesów finansowych",
            "Budżety i ich realizacja",
            "Zgodność podatkowa",
          ],
        },
      ],
    },

    kwalifikacje: {
      label: "Kwalifikacje",
      grupy: [
        {
          tytul: "Wykształcenie",
          pozycje: [
            "MBA — Politechnika Gdańska",
            "Rachunkowość i finanse — Uniwersytet Gdański",
            "Matematyka finansowa — Politechnika Gdańska",
          ],
        },
        {
          tytul: "Certyfikaty",
          pozycje: ["FCCA", "Biegły rewident", "Ceny transferowe"],
        },
        {
          tytul: "Standardy",
          pozycje: ["MSSF", "Ustawa o rachunkowości", "CIT · VAT"],
        },
        {
          tytul: "Narzędzia i języki",
          pozycje: ["Power BI · Power Query · Excel", "Angielski C1"],
        },
      ],
    },

    kontakt: {
      label: "Kontakt",
      naglowek: "Bądźmy w kontakcie",
      tekst: "Najszybciej złapiesz mnie wiadomością na LinkedIn.",
      cta: "Skontaktuj się ze mną na LinkedIn",
      miasto: "Gdańsk, Polska",
    },
  },

  /* ================================ ENGLISH ===========================
     Tłumaczenie do Twojej weryfikacji — popraw, co uznasz za stosowne.
     ==================================================================== */
  en: {
    ui: {
      langLabel: "PL",
      prev: "Previous page",
      next: "Next page",
      open: "Open",
    },

    cover: {
      name: "Monika\nSiurnicka-Ślusarczyk",
      role: "Finance Director",
      creds: "Statutory Auditor · FCCA · MBA",
      tagline: "15+ years · Manufacturing · International groups",
    },

    profil: {
      label: "About me",
      body:
        "I connect financial strategy with business practice. Over 15 years of " +
        "experience in finance across international, multi-entity environments.",
      cechy: ["Strategic thinking", "Business acumen"],
      stats: [
        { v: "15+", l: "years in finance" },
        { v: "FCCA", l: "statutory auditor" },
        { v: "MBA", l: "Gdańsk Tech" },
      ],
    },

    mysl: {
      label: "My approach",
      cytaty: [
        {
          duze: "A good budget is not meant to predict the future.",
          male:
            "It is meant to prepare the organisation for different scenarios and " +
            "support better business decisions.",
          stopka:
            "Budgeting rests on understanding how the business is changing, what " +
            "challenges lie ahead and which scenarios we must be ready for.",
        },
        {
          duze:
            "Finance is not only numbers. It is understanding the business, " +
            "the people and the processes across the whole organisation.",
        },
      ],
    },

    kompetencje: {
      label: "Areas of expertise",
      lista: [
        "Financial strategy, budgeting and planning",
        "Performance management and management reporting",
        "Liquidity and enterprise value management",
        "Risk management and internal control",
      ],
    },

    doswiadczenie: {
      label: "Experience",
      role: [
        {
          stanowisko: "Head of Finance",
          firma: "CCL Specialty Cartons",
          lata: "2024 – present",
          hasla: [
            "Manufacturing",
            "Liquidity and funding",
            "Budgets and KPIs",
            "CAPEX",
            "IFRS",
            "Corporate finance",
            "Reporting",
            "Forecasting",
            "Business plans",
          ],
        },
        {
          stanowisko: "Finance Director",
          firma: "PGZ Naval Shipyard",
          lata: "2022 – 2023",
          hasla: [
            "Defence manufacturing",
            "Financial strategy",
            "Budgeting oversight",
            "Investment control",
            "Business advisory",
          ],
        },
        {
          stanowisko: "Finance & Accounting Director — Chief Accountant",
          firma: "PRS SA",
          lata: "2018 – 2022",
          hasla: [
            "Headquarters and international entities",
            "Reporting standardisation",
            "Finance process improvement",
            "Budgets and delivery",
            "Tax compliance",
          ],
        },
      ],
    },

    kwalifikacje: {
      label: "Qualifications",
      grupy: [
        {
          tytul: "Education",
          pozycje: [
            "MBA — Gdańsk University of Technology",
            "Accounting and Finance — University of Gdańsk",
            "Financial Mathematics — Gdańsk Tech",
          ],
        },
        {
          tytul: "Certifications",
          pozycje: ["FCCA", "Statutory Auditor", "Transfer Pricing"],
        },
        {
          tytul: "Standards",
          pozycje: ["IFRS", "Polish Accounting Act", "CIT · VAT"],
        },
        {
          tytul: "Tools and languages",
          pozycje: ["Power BI · Power Query · Excel", "English C1"],
        },
      ],
    },

    kontakt: {
      label: "Contact",
      naglowek: "Let's stay in touch",
      tekst: "A message on LinkedIn is the fastest way to reach me.",
      cta: "Connect with me on LinkedIn",
      miasto: "Gdańsk, Poland",
    },
  },
};
