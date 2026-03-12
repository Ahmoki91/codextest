const modeCopy = document.querySelector("#modeCopy");
const chips = document.querySelectorAll(".chip");
const terminalLog = document.querySelector("#terminalLog");
const metricValues = document.querySelectorAll(".metric-value");
const runDemoButton = document.querySelector("#runDemo");
const planList = document.querySelector("#planList");

const modeText = {
  speed: "Schnelle Lieferung von Anfang bis Ende: aufsetzen, verfeinern, pruefen und uebergeben.",
  design: "Bewusste Praesentation: starkes Layout, individueller Charakter und Demo-reife Ausarbeitung.",
  clarity: "Klarer Spannungsbogen: der Nutzen ist selbst fuer Menschen sofort sichtbar, die Codex zum ersten Mal sehen.",
};

const demoLines = [
  "$ repo pruefen",
  "Leeres Repository bestaetigt. Eine statische App-Architektur wird gewaehlt.",
  "$ app-grundgeruest erstellen",
  "Landingpage, Kennzahlen, Workbench-Panels und Reveal-Animationen wurden hinzugefuegt.",
  "$ lokalen startpfad verifizieren",
  "Bereit fuer den Start in WSL mit Python oder jedem anderen statischen Dateiserver.",
];

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    modeCopy.textContent = modeText[chip.dataset.mode];
  });
});

function animateMetrics() {
  metricValues.forEach((metric) => {
    const target = Number(metric.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 24));

    const tick = () => {
      current += step;
      if (current >= target) {
        metric.textContent = target;
        return;
      }
      metric.textContent = current;
      requestAnimationFrame(tick);
    };

    tick();
  });
}

function playDemo() {
  terminalLog.innerHTML = "";
  demoLines.forEach((line, index) => {
    window.setTimeout(() => {
      const row = document.createElement("p");
      if (line.startsWith("$")) {
        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "$";
        row.appendChild(prompt);
        row.append(line.slice(1));
      } else {
        row.textContent = line;
      }
      terminalLog.appendChild(row);
    }, index * 420);
  });

  window.setTimeout(() => {
    planList.innerHTML = [
      '<li class="done">Repo pruefen und einen Stack ohne Abhaengigkeiten waehlen</li>',
      '<li class="done">Layout, Visuals und Interaktionsmodell erstellen</li>',
      '<li class="done">Lokalen Startpfad in WSL verifizieren</li>'
    ].join("");
  }, demoLines.length * 420);
}

runDemoButton.addEventListener("click", playDemo);

const metricObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateMetrics();
        metricObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

metricObserver.observe(document.querySelector(".metrics"));
