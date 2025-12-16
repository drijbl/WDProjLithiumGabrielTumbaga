import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';
 
// HTML Elements
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
const MAX_TOTAL = 6; 

// VSEPR Information
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

let bondPairs = 2;
let lonePairs = 0;

// Three.js Setup
const container = document.getElementById("vseprCanvasContainer");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.domElement.style.pointerEvents = 'none'; // <--- allow clicks through canvas
container.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5,5,5);
scene.add(dirLight);

let molecule = new THREE.Group();
scene.add(molecule);

const centralMat = new THREE.MeshPhongMaterial({ color: 0xff5555 });
const atomMat = new THREE.MeshPhongMaterial({ color: 0x3399ff });
const bondMat = new THREE.MeshPhongMaterial({ color: 0x888888 });
const loneMat = new THREE.MeshPhongMaterial({ color: 0xffff00, transparent: true, opacity: 0.35 });

function sphere(radius, material){
    return new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), material);
}

function bond(a, b){
    const dir = new THREE.Vector3().subVectors(b,a);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(a,b).multiplyScalar(0.5);
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, len, 16), bondMat);
    cyl.position.copy(mid);
    cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.normalize());
    return cyl;
}

// VSEPR Positions
const POSITIONS = {
    2: [[1,0,0],[-1,0,0]],
    3: [[1,0,0],[-0.5,0.87,0],[-0.5,-0.87,0]],
    4: [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]],
    5: [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1]],
    6: [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]
};

function buildModel(bonds, lone){
    molecule.clear();
    const total = bonds + lone;
    const base = POSITIONS[total];
    if(!base) return;

    const vectors = base.map(v => new THREE.Vector3(...v).normalize().multiplyScalar(1.6));
    const central = sphere(0.3, centralMat);
    molecule.add(central);

    for(let i=0;i<bonds;i++){
        const pos = vectors[i];
        const atom = sphere(0.22, atomMat);
        atom.position.copy(pos);
        molecule.add(atom);
        molecule.add(bond(new THREE.Vector3(), pos));
    }

    for(let i=bonds;i<total;i++){
        const lp = sphere(0.18, loneMat);
        lp.position.copy(vectors[i]);
        molecule.add(lp);
    }
}

function formatAXE(bonds, lone) {
  let str = `AX<sub>${bonds}</sub>`;
  if (lone > 0) str += `E<sub>${lone}</sub>`;
  return str;
}

// Button state
function updateButtonState(button, disabled) {
  button.disabled = disabled;
  button.style.background = disabled ? '#888888' : '#008080';
}

function updateDisplay() {
  bondValueEl.textContent = bondPairs;
  loneValueEl.textContent = lonePairs;
}

// Update model
function updateModel() {
  if (bondPairs < MIN_BONDS) bondPairs = MIN_BONDS;
  if (bondPairs > MAX_BONDS) bondPairs = MAX_BONDS;
  if (lonePairs < 0) lonePairs = 0;
  if (lonePairs > MAX_LONE) lonePairs = MAX_LONE;
  if (bondPairs + lonePairs > MAX_TOTAL) lonePairs = MAX_TOTAL - bondPairs;

  updateDisplay();

  const axeKey = lonePairs === 0 ? `AX${bondPairs}` : `AX${bondPairs}E${lonePairs}`;
  const result = vseprTable[axeKey];
  axeEl.innerHTML = formatAXE(bondPairs, lonePairs);
  edgEl.textContent = result ? result.edg : 'Unknown';
  mgEl.textContent = result ? result.mg : 'Unknown';

  updateButtonState(bondPlus, bondPairs >= MAX_BONDS || bondPairs + lonePairs >= MAX_TOTAL);
  updateButtonState(bondMinus, bondPairs <= MIN_BONDS);
  updateButtonState(lonePlus, lonePairs >= MAX_LONE || bondPairs + lonePairs >= MAX_TOTAL);
  updateButtonState(loneMinus, lonePairs <= 0);

  buildModel(bondPairs, lonePairs);
}

// Button events
bondPlus.onclick = () => { bondPairs++; updateModel(); };
bondMinus.onclick = () => { bondPairs--; updateModel(); };
lonePlus.onclick = () => { lonePairs++; updateModel(); };
loneMinus.onclick = () => { lonePairs--; updateModel(); };
document.getElementById('resetSimulation').onclick = () => { bondPairs=2; lonePairs=0; updateModel(); };

// Model aniamtions
function animate(){
    requestAnimationFrame(animate);
    molecule.rotation.y += 0.004;
    renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

updateModel();
