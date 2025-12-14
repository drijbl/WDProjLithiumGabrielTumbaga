// VSEPR JS

// DOM Elements
const bondValueEl = document.getElementById('bondValue');
const loneValueEl = document.getElementById('loneValue');
const bondPlus = document.getElementById('bondPlus');
const bondMinus = document.getElementById('bondMinus');
const lonePlus = document.getElementById('lonePlus');
const loneMinus = document.getElementById('loneMinus');
const axeEl = document.getElementById('axe');
const edgEl = document.getElementById('electronDomain');
const mgEl = document.getElementById('molecularGeometry');

const MAX_BONDS = 6;
const MIN_BONDS = 2;
const MAX_LONE = 4;
const MAX_TOTAL = 6; // total electron domains limit

// Sample VSEPR table
const vseprTable = {
  'AX2': { edg: 'Linear', mg: 'Linear' },
  'AX3': { edg: 'Trigonal Planar', mg: 'Trigonal Planar' },
  'AX2E1': { edg: 'Trigonal Planar', mg: 'Bent' },
  'AX4': { edg: 'Tetrahedral', mg: 'Tetrahedral' },
  'AX3E1': { edg: 'Tetrahedral', mg: 'Trigonal Pyramidal' },
  'AX2E2': { edg: 'Tetrahedral', mg: 'Bent' },
  'AX5': { edg: 'Trigonal Bipyramidal', mg: 'Trigonal Bipyramidal' },
  'AX4E1': { edg: 'Trigonal Bipyramidal', mg: 'See-Saw' },
  'AX3E2': { edg: 'Trigonal Bipyramidal', mg: 'T-Shaped' },
  'AX2E3': { edg: 'Trigonal Bipyramidal', mg: 'Linear' },
  'AX6': { edg: 'Octahedral', mg: 'Octahedral' },
  'AX5E1': { edg: 'Octahedral', mg: 'Square Pyramidal' },
  'AX4E2': { edg: 'Octahedral', mg: 'Square Planar' }
};

// Format AXE with subscripts and no E0
function formatAXE(bonds, lone) {
  let str = `AX<sub>${bonds}</sub>`;
  if (lone > 0) str += `E<sub>${lone}</sub>`;
  return str;
}

// Enable/disable buttons and change color
function updateButtonState(button, disabled) {
  button.disabled = disabled;
  button.style.background = disabled ? '#888888' : '#008080';
}

// Update simulation info
function updateModel() {
  let bondPairs = parseInt(bondValueEl.textContent);
  let lonePairs = parseInt(loneValueEl.textContent);

  // Ensure limits
  if (bondPairs < MIN_BONDS) bondPairs = MIN_BONDS;
  if (bondPairs > MAX_BONDS) bondPairs = MAX_BONDS;
  if (lonePairs < 0) lonePairs = 0;
  if (lonePairs > MAX_LONE) lonePairs = MAX_LONE;

  let totalDomains = bondPairs + lonePairs;
  if (totalDomains > MAX_TOTAL) {
    lonePairs = MAX_TOTAL - bondPairs;
    loneValueEl.textContent = lonePairs;
    totalDomains = MAX_TOTAL;
  }

  const axeKey = lonePairs === 0 ? `AX${bondPairs}` : `AX${bondPairs}E${lonePairs}`;
  const result = vseprTable[axeKey];
  let edg = result ? result.edg : 'Unknown';
  let mg = result ? result.mg : 'Unknown';

  axeEl.innerHTML = formatAXE(bondPairs, lonePairs);
  edgEl.textContent = edg;
  mgEl.textContent = mg;

  // Enable/disable buttons dynamically and adjust color
  updateButtonState(bondPlus, bondPairs >= MAX_BONDS || totalDomains >= MAX_TOTAL);
  updateButtonState(bondMinus, bondPairs <= MIN_BONDS);
  updateButtonState(lonePlus, lonePairs >= MAX_LONE || totalDomains >= MAX_TOTAL);
  updateButtonState(loneMinus, lonePairs <= 0);
}

// Button events
bondPlus.onclick = () => { bondValueEl.textContent = parseInt(bondValueEl.textContent)+1; updateModel(); };
bondMinus.onclick = () => { bondValueEl.textContent = parseInt(bondValueEl.textContent)-1; updateModel(); };
lonePlus.onclick = () => { loneValueEl.textContent = parseInt(loneValueEl.textContent)+1; updateModel(); };
loneMinus.onclick = () => { loneValueEl.textContent = parseInt(loneValueEl.textContent)-1; updateModel(); };

document.getElementById('resetSimulation').onclick = () => {
  bondValueEl.textContent = 2; // start at 2
  loneValueEl.textContent = 0;
  updateModel();
};

// Initial update
updateModel();
