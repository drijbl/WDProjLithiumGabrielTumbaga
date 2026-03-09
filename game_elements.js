// ===== DATA =====
const REACTIONS = [
    { name: 'Table Salt', formula: 'NaCl', elements: { Na: 1, Cl: 1 }, dmg: 25 },
    { name: 'Carbon Dioxide', formula: 'CO2', elements: { C: 1, O: 2 }, dmg: 30 },
    { name: 'Ferric Oxide', formula: 'Fe2O3', elements: { Fe: 2, O: 3 }, dmg: 45 },
    { name: 'Hydrochloric Acid', formula: 'HCl', elements: { H: 1, Cl: 1 }, dmg: 35 },
    { name: 'Magnesium Oxide', formula: 'MgO', elements: { Mg: 1, O: 1 }, dmg: 28 },
    { name: 'Copper Oxide', formula: 'CuO', elements: { Cu: 1, O: 1 }, dmg: 32 },
    { name: 'Sulfur Dioxide', formula: 'SO2', elements: { S: 1, O: 2 }, dmg: 35 },
    { name: 'Ammonia', formula: 'NH3', elements: { N: 1, H: 3 }, dmg: 30 },
    { name: 'Methane', formula: 'CH4', elements: { C: 1, H: 4 }, dmg: 40 },
    { name: 'Magnesium Chloride', formula: 'MgCl2', elements: { Mg: 1, Cl: 2 }, dmg: 38 },
    { name: 'Nitrogen Dioxide', formula: 'NO2', elements: { N: 1, O: 2 }, dmg: 42 },
    { name: 'Hydrogen Sulfide', formula: 'H2S', elements: { H: 2, S: 1 }, dmg: 35 },
    { name: 'Sulfuric Acid', formula: 'H2SO4', elements: { H: 2, S: 1, O: 4 }, dmg: 55 },
    { name: 'Nitric Acid', formula: 'HNO3', elements: { H: 1, N: 1, O: 3 }, dmg: 50 },
    { name: 'Acetic Acid', formula: 'C2H4O2', elements: { C: 2, H: 4, O: 2 }, dmg: 40 },
    { name: 'Sodium Acetate', formula: 'NaC2H3O2', elements: { Na: 1, C: 2, H: 3, O: 2 }, dmg: 52 },
    { name: 'Sodium Bicarbonate', formula: 'NaHCO3', elements: { Na: 1, H: 1, C: 1, O: 3 }, heal: 40 },
    { name: 'Iron Sulfide', formula: 'FeS', elements: { Fe: 1, S: 1 }, dmg: 30 },
    { name: 'Iron (III) Chloride', formula: 'FeCl3', elements: { Fe: 1, Cl: 3 }, dmg: 30 },
    { name: 'Water', formula: 'H2O', elements: { H: 2, O: 1 }, heal: 20 },
    { name: 'Helium Shield', formula: 'He', elements: { He: 1 }, heal: 15 },
    { name: 'Neon Buffer', formula: 'Ne', elements: { Ne: 1 }, heal: 15 }
];

const ELEMENTS = [
    { s: 'C', n: 'Carbon' }, { s: 'Cl', n: 'Chlorine' }, { s: 'Cu', n: 'Copper' },
    { s: 'Fe', n: 'Iron' }, { s: 'H', n: 'Hydrogen' }, { s: 'Mg', n: 'Magnesium' },
    { s: 'N', n: 'Nitrogen' }, { s: 'Na', n: 'Sodium' }, { s: 'O', n: 'Oxygen' },
    { s: 'S', n: 'Sulfur' }, { s: 'He', n: 'Helium' }, { s: 'Ne', n: 'Neon' }
];

// ===== GAME STATE =====
let pHP = 100, eHP = 100;
let selEls = [], selQuants = {};
let locked = false;

// ===== ELEMENT GRID =====
const grid = document.getElementById('element-grid');
const bLock = document.getElementById('btn-lock');
const bTrans = document.getElementById('btn-transmute');
const bCancel = document.getElementById('btn-cancel');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const quantList = document.getElementById('quant-items');
const recList = document.getElementById('rec-list');
const fName = document.getElementById('formula-name');
const fTxt = document.getElementById('formula-txt');
const turnTxt = document.getElementById('turn-txt');
const stabTag = document.getElementById('stab-tag');
const synthBox = document.getElementById('synth-box');
const bFill = document.getElementById('beaker-fill');
const sTxt = document.getElementById('synth-text');
const vicScr = document.getElementById('vic-scr');
const defScr = document.getElementById('def-scr');
const btnRetryV = document.getElementById('btn-retry-v');
const btnRetryD = document.getElementById('btn-retry-d');

// ===== POKEDEX LOGIC =====
const pokedexBtn = document.getElementById('pokedexBtn');
const pokedexOverlay = document.getElementById('pokedexOverlay');
const pokedexClose = document.getElementById('pokedexClose');
const pokedexGrid = document.getElementById('pokedexGrid');

// Show overlay
pokedexBtn.addEventListener('click', () => {
  pokedexOverlay.style.display = 'flex';
  renderPokedex();
});

// Hide overlay
pokedexClose.addEventListener('click', () => {
  pokedexOverlay.style.display = 'none';
});

// Render all elements (for now, all of them)
function renderPokedex() {
  pokedexGrid.innerHTML = '';
  ELEMENTS.forEach(el => {
    const tile = document.createElement('div');
    tile.className = 'pokedexTile';
    tile.innerHTML = `<div class="sym">${el.s}</div><div class="name">${el.n}</div>`;
    
    // Example click event
    tile.addEventListener('click', () => {
      alert(`Clicked on ${el.n} (${el.s})`);
    });

    pokedexGrid.appendChild(tile);
  });
}

function renderPokedex() {
    pokedexGrid.innerHTML = '';
  
    // Repeat ELEMENTS 3 times for testing scroll
    const displayElements = [...ELEMENTS, ...ELEMENTS, ...ELEMENTS];
  
    displayElements.forEach((el, idx) => {
      const tile = document.createElement('div');
      tile.className = 'pokedexTile';
  
      // Placeholder: undiscovered
      tile.innerHTML = `<div class="sym">?</div><div class="name">???</div>`;
  
      tile.addEventListener('click', () => {
        alert("This element is still undiscovered!");
      });
  
      pokedexGrid.appendChild(tile);
    });
  }
init();
