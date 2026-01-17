import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';

function createMolecule(position) {
  const molecule = new THREE.Group();

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

  // Define atoms and bonds
  const atoms = {
    C1: createAtom(0xff96ca, 'Carbon (C)', { atomicNumber: 6, atomicWeight: '12.01 g/mol' }),
    C2: createAtom(0xff96ca, 'Carbon (C)', { atomicNumber: 6, atomicWeight: '12.01 g/mol' }),
    O: createAtom(0xFF69B4, 'Oxygen (O)', { atomicNumber: 8, atomicWeight: '16.00 g/mol' }),
    H1: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
    H2: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
    H3: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
    H4: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
    H5: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
    H6: createAtom(0x20cbec, 'Hydrogen (H)', { atomicNumber: 1, atomicWeight: '1.008 g/mol' }),
  };

  // Set positions for atoms
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

  const bonds = [
    createBond(atoms.C1.position, atoms.C2.position),
    createBond(atoms.C2.position, atoms.O.position),
    createBond(atoms.C1.position, atoms.H1.position),
    createBond(atoms.C1.position, atoms.H2.position),
    createBond(atoms.C1.position, atoms.H3.position),
    createBond(atoms.C2.position, atoms.H4.position),
    createBond(atoms.C2.position, atoms.H5.position),
    createBond(atoms.O.position, atoms.H6.position),
  ];

  bonds.forEach(bond => molecule.add(bond));

  molecule.scale.set(0.8, 0.8, 0.8);
  molecule.position.set(...position);

  return molecule;
}

// Main scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
const container = document.getElementById('scene2-three');
container.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add molecules to the scene
const molecule1 = createMolecule([4, 2, 0]);
const molecule2 = createMolecule([-2, 3, 0]);
const molecule3 = createMolecule([3, -4, 0]);
const molecule4 = createMolecule([0, 1, 0]);

scene.add(molecule1);
scene.add(molecule2);
scene.add(molecule3);
scene.add(molecule4);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  molecule1.rotation.y += 0.03;
  molecule2.rotation.y += 0.03;

  renderer.render(scene, camera);
}

animate();
