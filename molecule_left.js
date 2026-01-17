// main_skeletal.js
import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const container = document.getElementById('scene2-three');
container.appendChild(renderer.domElement);

// Lights (minimal for wireframe)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Create skeletal atom (wireframe sphere)
function createAtomWireframe(color, radius = 0.2) {
  const geometry = new THREE.SphereGeometry(radius, 12, 12);
  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    opacity: 0.6,
    transparent: true
  });
  const atom = new THREE.Mesh(geometry, material);
  return atom;
}

// Create skeletal bond (thin cylinder)
function createBondWireframe(start, end) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const bondRadius = 0.03;

  const geometry = new THREE.CylinderGeometry(bondRadius, bondRadius, length, 8, 1, true);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    opacity: 0.5,
    transparent: true
  });

  const bond = new THREE.Mesh(geometry, material);
  bond.position.copy(start).lerp(end, 0.5);
  bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return bond;
}

// Molecule group
const molecule = new THREE.Group();

// Ethanol skeletal atoms
const atoms = {
  C1: createAtomWireframe(0xffaaaa),
  C2: createAtomWireframe(0xffaaaa),
  O: createAtomWireframe(0xff77ff),
  H1: createAtomWireframe(0xaaaaff, 0.15),
  H2: createAtomWireframe(0xaaaaff, 0.15),
  H3: createAtomWireframe(0xaaaaff, 0.15),
  H4: createAtomWireframe(0xaaaaff, 0.15),
  H5: createAtomWireframe(0xaaaaff, 0.15),
  H6: createAtomWireframe(0xaaaaff, 0.15)
};

// Position atoms (same as main.js)
atoms.C1.position.set(0, 0, 0);
atoms.C2.position.set(1.54, 0, 0);
atoms.H1.position.set(-0.5, -0.9, 0);
atoms.H2.position.set(-0.5, 0.45, 0.7);
atoms.H3.position.set(-0.5, 0.45, -0.7);
atoms.H4.position.set(1.9, -0.45, 0.7);
atoms.H5.position.set(1.9, -0.45, -0.7);
atoms.O.position.set(2, 0.9, 0);
atoms.H6.position.set(2.5, 1.2, -0.7);

Object.values(atoms).forEach(atom => molecule.add(atom));

// Bonds
const bonds = [
  createBondWireframe(atoms.C1.position, atoms.C2.position),
  createBondWireframe(atoms.C2.position, atoms.O.position),
  createBondWireframe(atoms.C1.position, atoms.H1.position),
  createBondWireframe(atoms.C1.position, atoms.H2.position),
  createBondWireframe(atoms.C1.position, atoms.H3.position),
  createBondWireframe(atoms.C2.position, atoms.H4.position),
  createBondWireframe(atoms.C2.position, atoms.H5.position),
  createBondWireframe(atoms.O.position, atoms.H6.position)
];

bonds.forEach(bond => molecule.add(bond));

// Slightly smaller and floating
molecule.scale.set(3, 3, 3);
molecule.position.set(5.5, 0, 0);
scene.add(molecule);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Slow rotation + gentle floating
  molecule.rotation.y += 0.005;
  molecule.rotation.x += 0.003;

  renderer.render(scene, camera);
}

animate();
