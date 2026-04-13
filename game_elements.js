// DATA
const REACTIONS = [
	{
		name: "Table Salt",
		formula: "NaCl",
		elements: { Na: 1, Cl: 1 },
		dmg: 25,
	},
	{
		name: "Sodium Oxide",
		formula: "Na2O",
		elements: { Na: 2, O: 1 },
		dmg: 29,
	},
	{
		name: "Carbon Dioxide",
		formula: "CO2",
		elements: { C: 1, O: 2 },
		dmg: 30,
	},
	{
		name: "Carbon Monoxide",
		formula: "CO",
		elements: { C: 1, O: 1 },
		dmg: 40,
	},
	{
		name: "Ferric Oxide",
		formula: "Fe2O3",
		elements: { Fe: 2, O: 3 },
		dmg: 45,
	},
	{
		name: "Ferrous Oxide",
		formula: "FeO",
		elements: { Fe: 1, O: 1 },
		dmg: 37,
	},
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
	{
		name: "Cupric Oxide",
		formula: "CuO",
		elements: { Cu: 1, O: 1 },
		dmg: 32,
	},
	{
		name: "Cuprous Oxide",
		formula: "Cu2O",
		elements: { Cu: 2, O: 1 },
		dmg: 36,
	},
	{
		name: "Sulfur Dioxide",
		formula: "SO2",
		elements: { S: 1, O: 2 },
		dmg: 35,
	},
	{
		name: "Ammonia",
		formula: "NH3",
		elements: { N: 1, H: 3 },
		dmg: 30,
	},
	{
		name: "Methane",
		formula: "CH4",
		elements: { C: 1, H: 4 },
		dmg: 40,
	},
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
  {
		name: "Sulfur Monoxide",
		formula: "SO",
		elements: { S: 1, O: 1 },
		dmg: 22,
	},
  {
		name: "Sulfur Dioxide",
		formula: "SO2",
		elements: { S: 1, O: 2 },
		dmg: 26,
	},
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
		elements: { H: 2, S: 1, O: 3},
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
	{
		name: "Iron Sulfide",
		formula: "FeS",
		elements: { Fe: 1, S: 1 },
		dmg: 30,
	},
	{
		name: "Iron (III) Chloride",
		formula: "FeCl3",
		elements: { Fe: 1, Cl: 3 },
		dmg: 30,
	},
	{
		name: "Water",
		formula: "H2O",
		elements: { H: 2, O: 1 },
		heal: 20,
	},
	{
		name: "Helium Shield",
		formula: "He",
		elements: { He: 1 },
		heal: 15,
	},
	{
		name: "Neon Buffer",
		formula: "Ne",
		elements: { Ne: 1 },
		heal: 15,
	},
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

// GAME STATE AND PROFILE
let pHP = 100;
let eHP = 100;
let selEls = [];
let selQuants = {};
let locked = false;

let userProfile = {
	discoveredFormulae: [], 
};

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
const stabTag = document.getElementById("stab-tag");
const synthBox = document.getElementById("synth-box");
const bFill = document.getElementById("beaker-fill");
const sTxt = document.getElementById("synth-text");
const vicScr = document.getElementById("vic-scr");
const defScr = document.getElementById("def-scr");
const btnRetryV = document.getElementById("btn-retry-v");
const btnRetryD = document.getElementById("btn-retry-d");

const pokedexBtn = document.getElementById("pokedexBtn");
const pokedexOverlay = document.getElementById("pokedexOverlay");
const pokedexClose = document.getElementById("pokedexClose");
const pokedexGrid = document.getElementById("pokedexGrid");

// INITIALIZATION
function init() {
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
			reaction.formula
		);
		const tile = document.createElement("div");
		tile.className = "pokedexTile";

		if (isDiscovered) {
			// Formula is the "Big Star", Name is the sub-text
			tile.innerHTML = `
                <div class="sym">${formatFormula(reaction.formula)}</div>
                <div class="name">${reaction.name}</div>
            `;
			tile.style.borderColor = "var(--magic-blue)";
			tile.style.background = "rgba(0, 229, 255, 0.05)";
		} else {
			// Locked State
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
		// UI notification can be added here
		console.log(`New discovery added to Pokedex: ${formula}`);
	}
}

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
	// 1. Find a matching reaction
	const match = REACTIONS.find((r) => {
		const rEls = Object.keys(r.elements);
		const sEls = Object.keys(selQuants);

		// Must have same number of elements
		if (rEls.length !== sEls.length) return false;

		// Every element and quantity must match
		return rEls.every((symbol) => r.elements[symbol] === selQuants[symbol]);
	});

	// 2. Start Animation Sequence
	startSynthesis(match);
};

function startSynthesis(match) {
	locked = true; // Prevent clicking while animating
	synthBox.style.display = "flex";
	bFill.style.height = "0%";
	sTxt.innerText = "SYNTHESIZING...";

	// Animate beaker filling
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

		// Reset for next turn
		resetTurn();
	}, 2000);
}

function handleResult(reaction) {
	const isHeal = !!reaction.heal;
	const val = isHeal ? reaction.heal : reaction.dmg;

	// Add to Pokedex
	recordDiscovery(reaction.formula);

	if (isHeal) {
		pHP = Math.min(100, pHP + val);
		addLog("You", `Synthesized ${reaction.name}! Healed ${val} HP.`, "p");
	} else {
		eHP = Math.max(0, eHP - val);
		addLog("You", `Cast ${reaction.name}! Dealt ${val} damage.`, "p");
		shake("p2");
	}

	updateUI();

	if (eHP <= 0) {
		vicScr.style.display = "flex";
	} else {
		setTimeout(enemyTurn, 1000);
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
	recList.prepend(card); // Newest on top
}

function updateUI() {
	// Update HP Bars
	document.getElementById("p1-bar").style.width = pHP + "%";
	document.getElementById("p2-bar").style.width = eHP + "%";
	document.getElementById("p1-hp-txt").innerText = `${pHP}/100`;
	document.getElementById("p2-hp-txt").innerText = `${eHP}/100`;
}

function resetTurn() {
	locked = false;
	selEls = [];
	selQuants = {};
	renderElementGrid(); // Refresh grid colors
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

	// Update UI to show it's the enemy's turn
	turnTxt.innerText = "ENEMY'S TURN";
	fName.innerText = "- PREPARING -";
	fTxt.innerText = "";

	// Brief pause for "thinking"
	await new Promise((r) => setTimeout(r, 1000));

	// Filter only offensive moves for the enemy
	const offensiveMoves = REACTIONS.filter((r) => r.dmg);

	// Randomly select an offensive move
	const chosen =
		offensiveMoves[Math.floor(Math.random() * offensiveMoves.length)];

	// Reveal the move in the HUD
	fName.innerText = chosen.name.toUpperCase();
	fName.style.color = "var(--fail)"; // Reddish color for enemy moves
	fTxt.innerHTML = formatFormula(chosen.formula);

	// Apply damage after a short delay to sync with the reveal
	pHP = Math.max(0, pHP - chosen.dmg);
	addLog("Enemy", `Cast ${chosen.name}! Dealt ${chosen.dmg} damage.`, "e");
	shake("p1");

	updateUI();

	if (pHP <= 0) {
		setTimeout(() => {
			defScr.style.display = "flex";
		}, 500);
	} else {
		// Return control to the player after a delay
		setTimeout(() => {
			unlockNextTurn();
		}, 1500);
	}
}

// Helper to reset state and return control to player after enemy turn
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

// START THE GAME
init();
