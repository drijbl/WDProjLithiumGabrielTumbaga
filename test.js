// molecule.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/controls/OrbitControls.js';

export function initMolecule() {
  const c = document.getElementById('molecule-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, c.clientWidth / c.clientHeight, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true });
  renderer.setSize(c.clientWidth, c.clientHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 5, 5);
  scene.add(light);

  const atom = (color) =>
    new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), new THREE.MeshStandardMaterial({ color }));

  const bond = (a, b) => {
    const d = new THREE.Vector3().subVectors(b, a);
    const g = new THREE.CylinderGeometry(0.06, 0.06, d.length(), 16);
    const m = new THREE.MeshStandardMaterial({ color: 0xffcbe5 });
    const c = new THREE.Mesh(g, m);
    c.position.copy(a).lerp(b, 0.5);
    c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return c;
  };

  const group = new THREE.Group();
  const C1 = atom(0xff96ca), C2 = atom(0xff96ca), O = atom(0xff69b4);
  const H = [...Array(6)].map(() => atom(0x20cbec));

  C1.position.set(0, 0, 0);
  C2.position.set(1.54, 0, 0);
  O.position.set(2, 0.9, 0);

  H[0].position.set(-0.5, -0.9, 0);
  H[1].position.set(-0.5, 0.45, 0.7);
  H[2].position.set(-0.5, 0.45, -0.7);
  H[3].position.set(1.9, -0.45, 0.7);
  H[4].position.set(1.9, -0.45, -0.7);
  H[5].position.set(2.5, 1.2, -0.7);

  [C1, C2, O, ...H].forEach(a => group.add(a));
  [
    bond(C1.position, C2.position),
    bond(C2.position, O.position),
    ...H.map((h, i) => bond(i < 3 ? C1.position : i < 5 ? C2.position : O.position, h.position))
  ].forEach(b => group.add(b));

  group.scale.set(1.8, 1.8, 1.8);
  scene.add(group);

  function animate() {
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
