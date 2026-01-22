// subatomic.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/controls/OrbitControls.js';

export function initSubatomic(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  // ---------- Scene ----------
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // ---------- Camera ----------
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 8);

  // ---------- Renderer ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // ---------- Controls ----------
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;

  // ---------- Box ----------
  const boxGeometry = new THREE.BoxGeometry(6, 6, 6);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  // ---------- Particles ----------
  const particleGeometry = new THREE.SphereGeometry(0.25, 32, 32);
  const particleMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // proton
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // neutron
    new THREE.MeshBasicMaterial({ color: 0xffff00 })  // electron
  ];

  const particles = [];

  for (let i = 0; i < 10; i++) {
    const type = Math.floor(Math.random() * 3);
    const particle = new THREE.Mesh(particleGeometry, particleMaterials[type]);
    particle.userData = { type: ['Proton', 'Neutron', 'Electron'][type] };
    particle.position.set(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5
    );
    scene.add(particle);
    particles.push(particle);
  }

  // ---------- Raycaster ----------
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseClick(event) {
    const bounds = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(particles);

    if (intersects.length > 0) {
      const particle = intersects[0].object;
      showTooltip(particle, event.clientX, event.clientY);
    }
  }

  window.addEventListener('click', onMouseClick);

  // ---------- Tooltip ----------
  let tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.background = 'rgba(0,0,0,0.8)';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '6px 10px';
  tooltip.style.borderRadius = '5px';
  tooltip.style.fontFamily = 'Poppins, sans-serif';
  tooltip.style.fontSize = '14px';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = 1000;
  document.body.appendChild(tooltip);

  let tooltipTimeout;
  function showTooltip(particle, x, y) {
    tooltip.innerHTML = `Particle: ${particle.userData.type}`;
    tooltip.style.left = x + 10 + 'px';
    tooltip.style.top = y + 10 + 'px';
    tooltip.style.display = 'block';
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
      tooltip.style.display = 'none';
    }, 2000);
  }

  // ---------- Animate ----------
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // ---------- Handle resize ----------
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
