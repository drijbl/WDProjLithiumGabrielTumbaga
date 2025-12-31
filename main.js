// main.js
import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';

let isRotating = true;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.domElement.style.display = 'block';
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight1 = new THREE.PointLight(0xffffff, 0.6);
pointLight1.position.set(-5, -5, -5);
scene.add(pointLight1);

// Raycaster & tooltip
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.querySelector('.tooltip');

// Create atoms 
function createAtom(color, name, properties = {}) {
  const radius = 0.3;
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    clearcoat: 0.1,
  });
  const atom = new THREE.Mesh(geometry, material);
  atom.castShadow = true;
  atom.receiveShadow = true;
  atom.userData = { ...properties, name, type: 'atom' };
  return atom;
}

// Create bonds 
function createBond(start, end) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const bondRadius = 0.06;

  const geometry = new THREE.CylinderGeometry(bondRadius, bondRadius, length, 16);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffcbe5,
    clearcoat: 0.1,
  });

  const bond = new THREE.Mesh(geometry, material);
  bond.position.copy(start).lerp(end, 0.5);
  bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  bond.castShadow = true;
  bond.receiveShadow = true;

  return bond;
}

const molecule = new THREE.Group();

// Ethanol atoms: C2H5OH
const atoms = {
  C1: createAtom(0xff96ca, 'Carbon (C)', { atomicNumber: 6, atomicWeight: '12.01 g/mol' }),
  C2: createAtom(0xff96ca, 'Carbon (C)', { atomicNumber: 6, atomicWeight: '12.01 g/mol' }),
  O: createAtom(0xFF69B4, 'Oxygen (O)', { atomicNumber: 8, atomicWeight: '16.00 g/mol' }),
  H1: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
  H2: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
  H3: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
  H4: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
  H5: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
  H6: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }) // hydroxyl hydrogen
};

// Carbon atoms
atoms.C1.position.set(0, 0, 0);
atoms.C2.position.set(1.54, 0, 0);  // C–C bond

// Hydrogens on C1 (tetrahedral)
atoms.H1.position.set(-0.5, -0.9, 0);
atoms.H2.position.set(-0.5, 0.45, 0.7);
atoms.H3.position.set(-0.5, 0.45, -0.7);

// Hydrogens on C2 (tetrahedral, angled slightly backward/right)
atoms.H4.position.set(1.9, -0.45, 0.7);
atoms.H5.position.set(1.9, -0.45, -0.7);

// Oxygen atom (C2–O bond, angled upward/right)
atoms.O.position.set(2, 0.9, 0);

// Hydrogen on OH (bonded to oxygen)
atoms.H6.position.set(2.5, 1.2, -0.7);

Object.values(atoms).forEach(atom => molecule.add(atom));

// Bonds
const bonds = [
  createBond(atoms.C1.position, atoms.C2.position),
  createBond(atoms.C2.position, atoms.O.position),
  createBond(atoms.C1.position, atoms.H1.position),
  createBond(atoms.C1.position, atoms.H2.position),
  createBond(atoms.C1.position, atoms.H3.position),
  createBond(atoms.C2.position, atoms.H4.position),
  createBond(atoms.C2.position, atoms.H5.position),
  createBond(atoms.O.position, atoms.H6.position)
];

bonds.forEach(bond => molecule.add(bond));

molecule.scale.set(1.8, 1.8, 1.8); // Scaling up the molecule
molecule.position.set(0, -1.0, 0); // Centering the molecule

scene.add(molecule);

// Interaction
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(Object.values(atoms));

  if (intersects.length > 0) {
    const atom = intersects[0].object;
    const data = atom.userData;

    tooltip.style.display = 'block';
    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY + 10 + 'px';
    tooltip.innerHTML = `
      ${data.name}<br>
      Atomic Number: ${data.atomicNumber}<br>
      Atomic Weight: ${data.atomicWeight}
    `;

    atom.material.emissive.setHex(0x666666);
  } else {
    tooltip.style.display = 'none';
    Object.values(atoms).forEach(atom => atom.material.emissive.setHex(0x000000));
  }
}

document.addEventListener('mousemove', onMouseMove);

// Touch support for mobile devices
document.addEventListener('touchstart', e => {
  const touch = e.touches[0];

  mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(Object.values(atoms));

  if (intersects.length > 0) {
    const atom = intersects[0].object;
    const data = atom.userData;

    tooltip.style.display = 'block';
    tooltip.style.left = touch.clientX + 10 + 'px';
    tooltip.style.top = touch.clientY + 10 + 'px';
    tooltip.innerHTML = `
      ${data.name}<br>
      Atomic Number: ${data.atomicNumber}<br>
      Atomic Weight: ${data.atomicWeight}
    `;
  } else {
    tooltip.style.display = 'none';
  }
});

// Rotation
function toggleRotation() {
  isRotating = !isRotating;
}

// Mouse controls (left click only)
let mouseDown = false;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousedown', e => {
  if (e.button === 0) mouseDown = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseup', e => {
  if (e.button === 0) mouseDown = false;
});

document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('mousemove', e => {
  const deltaX = e.clientX - mouseX;
  const deltaY = e.clientY - mouseY;

  if (mouseDown) {
    molecule.rotation.y += deltaX * 0.01;
    molecule.rotation.x += deltaY * 0.01;
  }

  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('dblclick', () => {
  molecule.rotation.set(0, 0, 0);
  camera.position.set(0, 0, 8);
});

document.addEventListener('wheel', e => {
  camera.position.z += e.deltaY * 0.01;
  camera.position.z = Math.max(4, Math.min(camera.position.z, 20));
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Phone touch controls
let touchDown = false;
let lastTouchX = 0;
let lastTouchY = 0;

document.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    touchDown = true;
    lastTouchX = e.touches[0].clientX;
    lastTouchY = e.touches[0].clientY;
  }
});

document.addEventListener('touchend', () => {
  touchDown = false;
});

document.addEventListener('touchmove', e => {
  if (!touchDown) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - lastTouchX;
  const deltaY = touch.clientY - lastTouchY;

  molecule.rotation.y += deltaX * 0.01;
  molecule.rotation.x += deltaY * 0.01;

  lastTouchX = touch.clientX;
  lastTouchY = touch.clientY;
});

let lastPinchDistance = null;

document.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (lastPinchDistance !== null) {
      const delta = distance - lastPinchDistance;
      camera.position.z -= delta * 0.01;
      camera.position.z = Math.max(4, Math.min(camera.position.z, 20));
    }

    lastPinchDistance = distance;
  }
});

document.addEventListener('touchend', () => {
  lastPinchDistance = null;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotation speed
  if (isRotating && !mouseDown && !touchDown) {
    molecule.rotation.y += 0.03;
    molecule.rotation.x += 0.02;
  }

  renderer.render(scene, camera);
}

animate();

window.toggleRotation = toggleRotation;
