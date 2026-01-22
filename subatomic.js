import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';

const container = document.getElementById('atom-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(6, 6, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const modal = document.getElementById('particle-modal');
const modalTitle = document.getElementById('modal-title');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.getElementById('closeModal');

const nucleus = new THREE.Group();

function createParticle(color, radius, data) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData = data;
  return mesh;
}

// helper: tightly pack particles
function randomOffset(maxRadius) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = Math.random() * maxRadius;
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  return [x, y, z];
}

// Protons
for (let i = 0; i < 3; i++) {
  const proton = createParticle(0xff4d4d, 0.5, {
    name: 'Proton',
    charge: '+1',
    location: 'Nucleus'
  });
  const [x, y, z] = randomOffset(0.7);
  proton.position.set(x, y, z);
  nucleus.add(proton);
}

// Neutrons
for (let i = 0; i < 3; i++) {
  const neutron = createParticle(0xaaaaaa, 0.5, {
    name: 'Neutron',
    charge: '0',
    location: 'Nucleus'
  });
  const [x, y, z] = randomOffset(0.7);
  neutron.position.set(x, y, z);
  nucleus.add(neutron);
}

scene.add(nucleus);

const electrons = new THREE.Group();
const orbits = [];

function createOrbit(radius, tiltX = 0, tiltY = 0, tiltZ = 0) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2);
  const points = curve.getPoints(120);
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color: 0x66ccff });
  const line = new THREE.Line(geo, mat);

  const orbit = new THREE.Object3D();
  orbit.add(line);

  orbit.rotation.set(tiltX, tiltY, tiltZ);
  scene.add(orbit);

  return orbit;
}

orbits.push(createOrbit(4, Math.PI / 6, Math.PI / 4, 0));

for (let i = 0; i < 2; i++) {
  const electron = createParticle(0x4da6ff, 0.3, {
    name: 'Electron',
    charge: '-1',
    location: 'Electron cloud'
  });

  electron.userData.angle = Math.random() * Math.PI * 2;
  electron.userData.orbit = orbits[0];
  electrons.add(electron);
}

scene.add(electrons);

container.addEventListener('click', e => {
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([
    ...nucleus.children,
    ...electrons.children
  ]);

  if (!intersects.length) return;

  const d = intersects[0].object.userData;

  modalTitle.textContent = d.name;
  modalInfo.innerHTML = `
    <strong>Charge:</strong> ${d.charge}<br><br>
    <strong>Location:</strong> ${d.location}<br><br>
    ${getDescription(d.name)}
  `;

  modal.classList.remove('hidden');
});

function getDescription(type) {
  if (type === 'Proton')
    return 'Protons determine the identity of an element. Changing the number of protons changes the element itself.';
  if (type === 'Neutron')
    return 'Neutrons help stabilize the nucleus by reducing repulsion between positively charged protons.';
  if (type === 'Electron')
    return 'Electrons are responsible for chemical bonding and reactions. They move around the nucleus in energy levels.';
  return '';
}

closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

function animate() {
  requestAnimationFrame(animate);

  electrons.children.forEach(e => {
    e.userData.angle += 0.02;

    // move electron along its orbit
    const r = 4;
    const x = Math.cos(e.userData.angle) * r;
    const y = Math.sin(e.userData.angle) * r * 0.9;
    const z = Math.sin(e.userData.angle) * 0.5;

    // apply orbit orientation
    e.position.copy(new THREE.Vector3(x, y, z).applyEuler(e.userData.orbit.rotation));
  });

  nucleus.rotation.y += 0.004;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
