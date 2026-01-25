import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';

const container = document.getElementById('atom-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 18, 0);
camera.lookAt(0, 0, 0);
camera.up.set(0, 0, -1);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.9));
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 20);
scene.add(light);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const modal = document.getElementById('particle-modal');
const modalTitle = document.getElementById('modal-title');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.getElementById('closeModal');

function createParticle(color, radius, data) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData = {
    ...data,
    baseColor: color
  };
  return mesh;
}

const nucleus = new THREE.Group();

const nucleusLayout = [
  [0, 0, 0],

  [0.65, 0, 0],
  [-0.65, 0, 0],
  [0, 0.65, 0],
  [0, -0.65, 0],

  [0.35, 0.35, 0.55],
  [-0.35, -0.35, 0.55],

  [0.35, -0.35, -0.55],
  [-0.35, 0.35, -0.55]
];

for (let i = 0; i < 3; i++) {
  const p = createParticle(0xff4d4d, 0.65, {
    name: 'Proton',
    charge: '+1',
    location: 'Nucleus'
  });

  p.position.set(...nucleusLayout[i]);
  nucleus.add(p);
}

for (let i = 3; i < 6; i++) {
  const n = createParticle(0xaaaaaa, 0.65, {
    name: 'Neutron',
    charge: '0',
    location: 'Nucleus'
  });

  n.position.set(...nucleusLayout[i]);
  nucleus.add(n);
}

scene.add(nucleus);

function createOrbit(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2);
  const points = curve.getPoints(200);
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color: 0x444444 });
  const orbit = new THREE.Line(geo, mat);
  orbit.rotation.x = Math.PI / 2;
  return orbit;
}

scene.add(createOrbit(4));
scene.add(createOrbit(7));

const electrons = [];

function addElectron(radius, startAngle) {
  const e = createParticle(0x4da6ff, 0.4, {
    name: 'Electron',
    charge: '-1',
    location: 'Electron cloud'
  });
  e.userData.angle = startAngle;
  e.userData.radius = radius;
  scene.add(e);
  electrons.push(e);
}

addElectron(4, 0);
addElectron(4, Math.PI);
addElectron(7, 0);
addElectron(7, Math.PI / 2);
addElectron(7, Math.PI);
addElectron(7, (3 * Math.PI) / 2);

let hovered = null;

container.addEventListener('mousemove', e => {
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([
    ...nucleus.children,
    ...electrons
  ]);

  if (hovered) {
    hovered.material.color.setHex(hovered.userData.baseColor);
    hovered = null;
  }

  if (intersects.length) {
    hovered = intersects[0].object;
    hovered.material.color.offsetHSL(0, 0, 0.25);
  }
});

container.addEventListener('click', e => {
  const rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([
    ...nucleus.children,
    ...electrons
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
  if (type === 'Proton') return 'Protons determine the identity of an element.';
  if (type === 'Neutron') return 'Neutrons stabilize the nucleus.';
  if (type === 'Electron') return 'Electrons control bonding and chemical reactions.';
  return '';
}

closeModal.addEventListener('click', () => modal.classList.add('hidden'));

function animate() {
  requestAnimationFrame(animate);

  electrons.forEach(e => {
    e.userData.angle += 0.015;
    e.position.x = Math.cos(e.userData.angle) * e.userData.radius;
    e.position.z = Math.sin(e.userData.angle) * e.userData.radius;
    e.position.y = 0;
  });

  renderer.render(scene, camera);
}

animate();
scene.scale.set(1.25, 1.25, 1.25);

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
