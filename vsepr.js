// =======================
// VSEPR LOGIC CONTROLLER
// =======================

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

const resetBtn = document.getElementById('resetSimulation');

// Limits
const MIN_BONDS = 2;
const MAX_BONDS = 6;
const MAX_LONE = 4;
const MAX_DOMAINS = 6;

// =======================
// VSEPR TABLE
// =======================
const vseprTable = {
  AX2:   { edg: 'Linear', mg: 'Linear' },

  AX3:   { edg: 'Trigonal Planar', mg: 'Trigonal Planar' },
  AX2E1: { edg: 'Trigonal Planar', mg: 'Bent' },

  AX4:   { edg: 'Tetrahedral', mg: 'Tetrahedral' },
  AX3E1: { edg: 'Tetrahedral', mg: 'Trigonal Pyramidal' },
  AX2E2: { edg: 'Tetrahedral', mg: 'Bent' },

  AX5:   { edg: 'Trigonal Bipyramidal', mg: 'Trigonal Bipyramidal' },
  AX4E1: { edg: 'Trigonal Bipyramidal', mg: 'See-Saw' },
  AX3E2: { edg: 'Trigonal Bipyramidal', mg: 'T-Shaped' },
  AX2E3: { edg: 'Trigonal Bipyramidal', mg: 'Linear' },

  AX6:   { edg: 'Octahedral', mg: 'Octahedral' },
  AX5E1: { edg: 'Octahedral', mg: 'Square Pyramidal' },
  AX4E2: { edg: 'Octahedral', mg: 'Square Planar' }
};

// =======================
// AXE FORMATTER
// =======================
function formatAXE(bonds, lonePairs) {
  let text = `AX<sub>${bonds}</sub>`;
  if (lonePairs > 0) text += `E<sub>${lonePairs}</sub>`;
  return text;
}

// =======================
// BUTTON STATE HANDLER
// =======================
function updateButtonState(button, disabled) {
  button.disabled = disabled;
  button.style.background = disabled ? '#888888' : '#008080';
}

// =======================
// THREE.JS SETUP
// =======================
let scene, camera, renderer, centralAtom, bondAtoms = [];

function initThreeJS() {
  const container = document.getElementById('vseprCanvasContainer');
  // Clear previous canvas
  container.innerHTML = '';

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xddeeff);

  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.6);
  directional.position.set(5, 5, 5);
  scene.add(directional);
}

// =======================
// CREATE ATOMS
// =======================
function createAtom(radius = 0.3, color = 0xff0000) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color });
  return new THREE.Mesh(geometry, material);
}

// =======================
// UPDATE 3D MODEL
// =======================
function updateVSEPRModel(config) {
  /*
    config = {
      bonds: number,
      lonePairs: number,
      axeKey: string,
      electronGeometry: string,
      molecularGeometry: string
    }
  */

  if (!scene) initThreeJS();

  // Remove old atoms
  if (centralAtom) scene.remove(centralAtom);
  bondAtoms.forEach(atom => scene.remove(atom));
  bondAtoms = [];

  // Central atom
  centralAtom = createAtom(0.35, 0x0088ff);
  scene.add(centralAtom);

  // =======================
  // LINEAR GEOMETRY (AX2)
  // =======================
  if (config.axeKey === 'AX2') {
    const distance = 1.5;
    const positions = [
      new THREE.Vector3(-distance, 0, 0),
      new THREE.Vector3(distance, 0, 0)
    ];

    positions.forEach(pos => {
      const atom = createAtom();
      atom.position.copy(pos);
      scene.add(atom);
      bondAtoms.push(atom);
    });
  } else {
    // Placeholder for other geometries
    console.log('Geometry placeholder:', config.axeKey);
  }

  renderer.render(scene, camera);
}

// =======================
// MAIN UPDATE FUNCTION
// =======================
function updateSimulation() {
  let bonds = parseInt(bondValueEl.textContent);
  let lonePairs = parseInt(loneValueEl.textContent);

  // Enforce bounds
  bonds = Math.max(MIN_BONDS, Math.min(MAX_BONDS, bonds));
  lonePairs = Math.max(0, Math.min(MAX_LONE, lonePairs));

  // Enforce total domain limit
  if (bonds + lonePairs > MAX_DOMAINS) {
    lonePairs = MAX_DOMAINS - bonds;
  }

  bondValueEl.textContent = bonds;
  loneValueEl.textContent = lonePairs;

  const axeKey = lonePairs === 0
    ? `AX${bonds}`
    : `AX${bonds}E${lonePairs}`;

  const vsepr = vseprTable[axeKey] || { edg: 'Unknown', mg: 'Unknown' };

  // Update UI
  axeEl.innerHTML = formatAXE(bonds, lonePairs);
  edgEl.textContent = vsepr.edg;
  mgEl.textContent = vsepr.mg;

  // Button states
  updateButtonState(bondPlus, bonds >= MAX_BONDS || bonds + lonePairs >= MAX_DOMAINS);
  updateButtonState(bondMinus, bonds <= MIN_BONDS);
  updateButtonState(lonePlus, lonePairs >= MAX_LONE || bonds + lonePairs >= MAX_DOMAINS);
  updateButtonState(loneMinus, lonePairs <= 0);

  // Update 3D model
  updateVSEPRModel({
    bonds,
    lonePairs,
    axeKey,
    electronGeometry: vsepr.edg,
    molecularGeometry: vsepr.mg
  });
}

// =======================
// EVENT LISTENERS
// =======================
bondPlus.onclick = () => { bondValueEl.textContent++; updateSimulation(); };
bondMinus.onclick = () => { bondValueEl.textContent--; updateSimulation(); };
lonePlus.onclick = () => { loneValueEl.textContent++; updateSimulation(); };
loneMinus.onclick = () => { loneValueEl.textContent--; updateSimulation(); };
resetBtn.onclick = () => {
  bondValueEl.textContent = 2;
  loneValueEl.textContent = 0;
  updateSimulation();
};

// =======================
// INITIALIZE
// =======================
updateSimulation();
