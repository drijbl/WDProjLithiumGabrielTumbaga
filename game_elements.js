// DATA
const REACTIONS = [
  { name: "Table Salt", formula: "NaCl", elements: { Na: 1, Cl: 1 }, dmg: 25 },
  { name: "Sodium Oxide", formula: "Na2O", elements: { Na: 2, O: 1 }, dmg: 29 },
  { name: "Carbon Dioxide", formula: "CO2", elements: { C: 1, O: 2 }, dmg: 30 },
  { name: "Carbon Monoxide", formula: "CO", elements: { C: 1, O: 1 }, dmg: 40 },
  {
    name: "Ferric Oxide",
    formula: "Fe2O3",
    elements: { Fe: 2, O: 3 },
    dmg: 45,
  },
  { name: "Ferrous Oxide", formula: "FeO", elements: { Fe: 1, O: 1 }, dmg: 37 },
  {
    name: "Hydrochloric Acid",
    formula: "HCl",
    elements: { H: 1, Cl: 1 },
    dmg: 35,
  },
  {
    name: "Magnesium Oxide",
    formula: "MgO",
    elements: { Mg: 1, O: 1 },
    dmg: 28,
  },
  { name: "Cupric Oxide", formula: "CuO", elements: { Cu: 1, O: 1 }, dmg: 32 },
  {
    name: "Cuprous Oxide",
    formula: "Cu2O",
    elements: { Cu: 2, O: 1 },
    dmg: 36,
  },
  { name: "Sulfur Dioxide", formula: "SO2", elements: { S: 1, O: 2 }, dmg: 35 },
  { name: "Ammonia", formula: "NH3", elements: { N: 1, H: 3 }, dmg: 30 },
  { name: "Methane", formula: "CH4", elements: { C: 1, H: 4 }, dmg: 40 },
  {
    name: "Magnesium Chloride",
    formula: "MgCl2",
    elements: { Mg: 1, Cl: 2 },
    dmg: 38,
  },
  {
    name: "Nitrogen Dioxide",
    formula: "NO2",
    elements: { N: 1, O: 2 },
    dmg: 42,
  },
  {
    name: "Sodium Nitrate",
    formula: "NaNO3",
    elements: { Na: 1, N: 1, O: 3 },
    dmg: 36,
  },
  {
    name: "Sodium Nitrite",
    formula: "NaNO2",
    elements: { Na: 1, N: 1, O: 2 },
    dmg: 29,
  },
  { name: "Sulfur Monoxide", formula: "SO", elements: { S: 1, O: 1 }, dmg: 22 },
  {
    name: "Sulfur Trioxide",
    formula: "SO3",
    elements: { S: 1, O: 3 },
    dmg: 41,
  },
  {
    name: "Hydrosulfuric Acid",
    formula: "H2S",
    elements: { H: 2, S: 1 },
    dmg: 35,
  },
  {
    name: "Sulfuric Acid",
    formula: "H2SO4",
    elements: { H: 2, S: 1, O: 4 },
    dmg: 55,
  },
  {
    name: "Sulfurous Acid",
    formula: "H2SO3",
    elements: { H: 2, S: 1, O: 3 },
    dmg: 48,
  },
  {
    name: "Nitric Acid",
    formula: "HNO3",
    elements: { H: 1, N: 1, O: 3 },
    dmg: 50,
  },
  {
    name: "Nitrous Acid",
    formula: "HNO2",
    elements: { H: 1, N: 1, O: 2 },
    dmg: 42,
  },
  {
    name: "Acetic Acid",
    formula: "C2H4O2",
    elements: { C: 2, H: 4, O: 2 },
    dmg: 40,
  },
  {
    name: "Sodium Acetate",
    formula: "NaC2H3O2",
    elements: { Na: 1, C: 2, H: 3, O: 2 },
    dmg: 52,
  },
  {
    name: "Magnesium Acetate",
    formula: "MgC4H6O4",
    elements: { Mg: 1, C: 4, H: 6, O: 4 },
    dmg: 52,
  },
  {
    name: "Sodium Bicarbonate",
    formula: "NaHCO3",
    elements: { Na: 1, H: 1, C: 1, O: 3 },
    heal: 40,
  },
  { name: "Iron Sulfide", formula: "FeS", elements: { Fe: 1, S: 1 }, dmg: 30 },
  {
    name: "Iron (III) Chloride",
    formula: "FeCl3",
    elements: { Fe: 1, Cl: 3 },
    dmg: 30,
  },
  { name: "Water", formula: "H2O", elements: { H: 2, O: 1 }, heal: 20 },
  { name: "Helium Shield", formula: "He", elements: { He: 1 }, heal: 15 },
  { name: "Neon Buffer", formula: "Ne", elements: { Ne: 1 }, heal: 15 },
];

const ELEMENTS = [
  { s: "C", n: "Carbon" },
  { s: "Cl", n: "Chlorine" },
  { s: "Cu", n: "Copper" },
  { s: "Fe", n: "Iron" },
  { s: "H", n: "Hydrogen" },
  { s: "Mg", n: "Magnesium" },
  { s: "N", n: "Nitrogen" },
  { s: "Na", n: "Sodium" },
  { s: "O", n: "Oxygen" },
  { s: "S", n: "Sulfur" },
  { s: "He", n: "Helium" },
  { s: "Ne", n: "Neon" },
];

// SYNCING PROFILE WITH LOCAL STORAGE
let currentUser = localStorage.getItem("chemivis_current_user");
let globalUserData = {};

let userProfile = {
  discoveredFormulae: [],
};

function loadGlobalProfile() {
  if (currentUser) {
    const savedData = localStorage.getItem("chemivis_user_data");
    if (savedData) {
      globalUserData = JSON.parse(savedData);
    }
    // Create alchemy compartment if it doesn't exist
    if (!globalUserData.alchemyStats) {
      globalUserData.alchemyStats = { discoveredFormulae: [] };
    }
    // Sync to local game state
    userProfile.discoveredFormulae =
      globalUserData.alchemyStats.discoveredFormulae || [];
    console.log("Profile Synced:", currentUser);
  }
}

function saveGlobalProfile() {
  if (currentUser) {
    if (!globalUserData.alchemyStats) globalUserData.alchemyStats = {};
    globalUserData.alchemyStats.discoveredFormulae =
      userProfile.discoveredFormulae;
    localStorage.setItem("chemivis_user_data", JSON.stringify(globalUserData));
    console.log("Global Data Saved");
  }
}

// GAME STATE
let pHP = 100;
let eHP = 100;
let selEls = [];
let selQuants = {};
let locked = false;

// DOM ELEMENTS
const grid = document.getElementById("element-grid");
const bLock = document.getElementById("btn-lock");
const bTrans = document.getElementById("btn-transmute");
const bCancel = document.getElementById("btn-cancel");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const quantList = document.getElementById("quant-items");
const recList = document.getElementById("rec-list");
const fName = document.getElementById("formula-name");
const fTxt = document.getElementById("formula-txt");
const turnTxt = document.getElementById("turn-txt");
const synthBox = document.getElementById("synth-box");
const bFill = document.getElementById("beaker-fill");
const sTxt = document.getElementById("synth-text");
const vicScr = document.getElementById("vic-scr");
const defScr = document.getElementById("def-scr");
const pokedexBtn = document.getElementById("pokedexBtn");
const pokedexOverlay = document.getElementById("pokedexOverlay");
const pokedexClose = document.getElementById("pokedexClose");
const pokedexGrid = document.getElementById("pokedexGrid");
const discoveryOverlay = document.getElementById("discoveryOverlay");
const discoveryFormula = document.getElementById("discoveryFormula");
const discoveryName = document.getElementById("discoveryName");
const discoveryNext = document.getElementById("discoveryNext");
const discoverySound = new Audio("./assets/alchemy_discovery.mp3");

// INITIALIZATION
function init() {
  loadGlobalProfile(); // Load user profile first
  renderElementGrid();
}

function renderElementGrid() {
  grid.innerHTML = "";
  ELEMENTS.forEach((el) => {
    const btn = document.createElement("div");
    btn.className = "el-btn";
    btn.innerHTML = `<span class="sym">${el.s}</span><span class="name">${el.n}</span>`;
    btn.onclick = () => toggleElement(el.s, btn);
    grid.appendChild(btn);
  });
}

function toggleElement(symbol, el) {
  if (locked) return;
  if (selEls.includes(symbol)) {
    selEls = selEls.filter((s) => s !== symbol);
    el.classList.remove("active");
  } else {
    if (selEls.length < 4) {
      selEls.push(symbol);
      el.classList.add("active");
    }
  }
  updateLockBtn();
}

function updateLockBtn() {
  if (selEls.length > 0) {
    bLock.disabled = false;
    bLock.classList.replace("btn-inactive", "btn-ready");
  } else {
    bLock.disabled = true;
    bLock.classList.replace("btn-ready", "btn-inactive");
  }
}

// POKEDEX LOGIC
function formatFormula(formula) {
  return formula.replace(/(\d+)/g, "<sub>$1</sub>");
}

pokedexBtn.addEventListener("click", () => {
  pokedexOverlay.style.display = "flex";
  renderPokedex();
});

pokedexClose.addEventListener("click", () => {
  pokedexOverlay.style.display = "none";
});

function renderPokedex() {
  pokedexGrid.innerHTML = "";
  REACTIONS.forEach((reaction) => {
    const isDiscovered = userProfile.discoveredFormulae.includes(
      reaction.formula,
    );
    const tile = document.createElement("div");
    tile.className = "pokedexTile";
    if (isDiscovered) {
      tile.innerHTML = `
                <div class="sym">${formatFormula(reaction.formula)}</div>
                <div class="name">${reaction.name}</div>
            `;
      tile.style.borderColor = "var(--magic-blue)";
      tile.style.background = "rgba(0, 229, 255, 0.05)";
    } else {
      tile.innerHTML = `
                <div class="sym" style="opacity: 0.2;">?</div>
                <div class="name" style="opacity: 0.5; font-size: 0.8rem;">Unknown Compound</div>
            `;
      tile.style.cursor = "default";
      tile.style.borderStyle = "dashed";
    }
    pokedexGrid.appendChild(tile);
  });
}

function recordDiscovery(formula) {
  if (!userProfile.discoveredFormulae.includes(formula)) {
    userProfile.discoveredFormulae.push(formula);
    saveGlobalProfile();

    const reaction = REACTIONS.find((r) => r.formula === formula);
    triggerDiscoverySequence(reaction);
    return true; // A new discovery happened, game is "paused"
  }
  return false; // Already discovered, game continues as normal
}

function triggerDiscoverySequence(reaction) {
  locked = true; // Pause game interactions

  // Sound Effect
  discoverySound.currentTime = 0; // Rewind to start
  discoverySound.play().catch((err) => {
    console.warn("Audio playback was blocked or file not found:", err);
  });

  discoveryFormula.innerHTML = formatFormula(reaction.formula);
  discoveryName.innerText = reaction.name.toUpperCase();
  discoveryOverlay.classList.remove("discovery-hidden");

  // Set text
  discoveryFormula.innerHTML = formatFormula(reaction.formula);
  discoveryName.innerText = reaction.name.toUpperCase();

  // Show overlay
  discoveryOverlay.classList.remove("discovery-hidden");

  // Sound Effect
  const sfx = new Audio("assets/discovery_flare.mp3"); // You'll need to add a cool 'ding' or 'magical flare' sound
  sfx.volume = 0.6;
  sfx
    .play()
    .catch((e) => console.log("Audio play blocked until user interacts"));
}

discoveryNext.onclick = () => {
  discoveryOverlay.classList.add("discovery-hidden");

  // Check what happens next
  if (eHP <= 0) {
    // If the enemy died during the discovery, show victory screen now
    vicScr.style.display = "flex";
  } else {
    // If the game is still going, trigger the enemy's turn after a brief delay
    setTimeout(enemyTurn, 800);
  }
};

// STEP TRANSITIONS
bLock.onclick = () => {
  step1.style.display = "none";
  step2.style.display = "flex";
  renderQuantities();
};

bCancel.onclick = () => {
  step2.style.display = "none";
  step1.style.display = "block";
  selQuants = {};
};

function renderQuantities() {
  quantList.innerHTML = "";
  selEls.forEach((s) => {
    selQuants[s] = 1;
    const box = document.createElement("div");
    box.className = "quant-box";
    box.innerHTML = `
            <div class="sym">${s}</div>
            <div class="quant-btns">
                <button class="q-button q-sub" onclick="changeQuant('${s}', -1)">-</button>
                <div class="q-num" id="q-${s}">1</div>
                <button class="q-button q-add" onclick="changeQuant('${s}', 1)">+</button>
            </div>
        `;
    quantList.appendChild(box);
  });
}

window.changeQuant = (s, delta) => {
  selQuants[s] = Math.max(1, Math.min(9, (selQuants[s] || 1) + delta));
  document.getElementById(`q-${s}`).innerText = selQuants[s];
};

// TRANSMUTE ACTION
bTrans.onclick = () => {
  const match = REACTIONS.find((r) => {
    const rEls = Object.keys(r.elements);
    const sEls = Object.keys(selQuants);
    if (rEls.length !== sEls.length) return false;
    return rEls.every((symbol) => r.elements[symbol] === selQuants[symbol]);
  });
  startSynthesis(match);
};

function startSynthesis(match) {
  locked = true;
  synthBox.style.display = "flex";
  bFill.style.height = "0%";
  sTxt.innerText = "SYNTHESIZING...";

  setTimeout(() => {
    bFill.style.height = "100%";
  }, 100);

  setTimeout(() => {
    synthBox.style.display = "none";
    if (match) {
      handleResult(match);
    } else {
      addLog("System", "Transmutation Failed: Unstable proportions.", "e");
      enemyTurn();
    }
    resetTurn();
  }, 2000);
}

function handleResult(reaction) {
  const isHeal = !!reaction.heal;
  const val = isHeal ? reaction.heal : reaction.dmg;

  // Capture whether a popup is about to show
  const isNew = recordDiscovery(reaction.formula);

  if (isHeal) {
    pHP = Math.min(100, pHP + val);
    addLog("You", `Synthesized ${reaction.name}! Healed ${val} HP.`, "p");
  } else {
    eHP = Math.max(0, eHP - val);
    addLog("You", `Cast ${reaction.name}! Dealt ${val} damage.`, "p");
    shake("p2");
  }

  updateUI();

  // Check win condition
  if (eHP <= 0) {
    // If discovery happened, wait for "Next" to show victory.
    // If not, show victory immediately.
    if (!isNew) vicScr.style.display = "flex";
  } else {
    // Only  move to enemy turn if there's no discovery popup blocking the way
    if (!isNew) {
      setTimeout(enemyTurn, 1000);
    }
  }
}

function addLog(who, msg, type) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const card = document.createElement("div");
  card.className = `rec-card rec-${type}`;
  card.innerHTML = `
        <div class="rec-label">${who}</div>
        <div class="rec-msg">${msg}</div>
        <div class="rec-time">${time}</div>
    `;
  recList.prepend(card);
}

function updateUI() {
  document.getElementById("p1-bar").style.width = pHP + "%";
  document.getElementById("p2-bar").style.width = eHP + "%";
  document.getElementById("p1-hp-txt").innerText = `${pHP}/100`;
  document.getElementById("p2-hp-txt").innerText = `${eHP}/100`;
}

function resetTurn() {
  locked = false;
  selEls = [];
  selQuants = {};
  renderElementGrid();
  updateLockBtn();
  step2.style.display = "none";
  step1.style.display = "block";
}

function shake(id) {
  const el = document.getElementById(`${id}-wrap`);
  el.classList.add("damage");
  setTimeout(() => el.classList.remove("damage"), 400);
}

// ENEMY AI
async function enemyTurn() {
  if (eHP <= 0) return;
  turnTxt.innerText = "ENEMY'S TURN";
  fName.innerText = "- PREPARING -";
  fTxt.innerText = "";

  await new Promise((r) => setTimeout(r, 1000));
  const offensiveMoves = REACTIONS.filter((r) => r.dmg);
  const chosen =
    offensiveMoves[Math.floor(Math.random() * offensiveMoves.length)];

  fName.innerText = chosen.name.toUpperCase();
  fName.style.color = "var(--fail)";
  fTxt.innerHTML = formatFormula(chosen.formula);

  pHP = Math.max(0, pHP - chosen.dmg);
  addLog("Enemy", `Cast ${chosen.name}! Dealt ${chosen.dmg} damage.`, "e");
  shake("p1");

  updateUI();
  if (pHP <= 0) {
    setTimeout(() => {
      defScr.style.display = "flex";
    }, 500);
  } else {
    setTimeout(() => {
      unlockNextTurn();
    }, 1500);
  }
}

function unlockNextTurn() {
  locked = false;
  selEls = [];
  selQuants = {};
  turnTxt.innerText = "YOUR TURN, ALCHEMIST";
  fName.innerText = "- SCANNING -";
  fName.style.color = "#fff";
  fTxt.innerText = "";
  renderElementGrid();
  updateLockBtn();
}

init();
