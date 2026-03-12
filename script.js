const modeCopy = document.querySelector("#modeCopy");
const chips = document.querySelectorAll(".chip");
const terminalLog = document.querySelector("#terminalLog");
const metricValues = document.querySelectorAll(".metric-value");
const runDemoButton = document.querySelector("#runDemo");
const planList = document.querySelector("#planList");

const modeText = {
  speed: "Fast end-to-end delivery: scaffold, refine, verify, and hand off.",
  design: "Intentional presentation: strong layout, custom feel, and demo-ready polish.",
  clarity: "Clear story arc: the value is obvious even to someone seeing Codex for the first time.",
};

const demoLines = [
  "$ inspect repo",
  "Empty repository confirmed. Choosing static app architecture.",
  "$ create app shell",
  "Landing page, metrics, workbench panels, and reveal motion added.",
  "$ verify local run path",
  "Ready to serve inside WSL with Python or any static file server.",
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
      '<li class="done">Inspect repo and choose a zero-dependency stack</li>',
      '<li class="done">Create layout, visuals, and interaction model</li>',
      '<li class="done">Verify local run path inside WSL</li>'
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