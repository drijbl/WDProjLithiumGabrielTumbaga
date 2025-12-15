// vsepr.js
import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';

let isRotating = true;

// Scene & container
const container = document.getElementById('vseprCanvasContainer');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Atom creation
function createAtom(color, name) {
  const geometry = new THREE.SphereGeometry(0.3, 32, 32);
  const material = new THREE.MeshPhysicalMaterial({ color, clearcoat: 0.1 });
  const atom = new THREE.Mesh(geometry, material);
  atom.userData = { name };
  return atom;
}

// Bond creation
function createBond(start, end) {
  const dir = new THREE.Vector3().subVectors(end, start);
  const length = dir.length();
  const bondGeometry = new THREE.CylinderGeometry(0.06, 0.06, length, 16);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x888888, clearcoat: 0.1 });
  const bond = new THREE.Mesh(bondGeometry, material);
  bond.position.copy(start).lerp(end, 0.5);
  bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return bond;
}

// Molecule
const molecule = new THREE.Group();
const centralAtom = createAtom(0xff0000, 'Central Atom (A)');
const atom1 = createAtom(0x0000ff, 'Bonded Atom (X)');
const atom2 = createAtom(0x0000ff, 'Bonded Atom (X)');

centralAtom.position.set(0, 0, 0);
atom1.position.set(-1.5, 0, 0);
atom2.position.set(1.5, 0, 0);

molecule.add(centralAtom, atom1, atom2);
molecule.add(createBond(centralAtom.position, atom1.position));
molecule.add(createBond(centralAtom.position, atom2.position));

scene.add(molecule);

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  if (isRotating) molecule.rotation.y += 0.03;
    if (isRotating) molecule.rotation.x += 0.01;

  renderer.render(scene, camera);
}
animate();
