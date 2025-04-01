import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_4");

// Scenes
const scene = new THREE.Scene();

/**
 * Objects
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  new THREE.MeshBasicMaterial({ color: "#840015" })
);
scene.add(cube);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.25, 0.1),
  new THREE.MeshBasicMaterial({ color: "#9ba224" })
);
torus.position.set(0, 0, -2);
scene.add(torus);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, SIZES.ASPECT_RATIO, 0.1, 100);
camera.position.set(3, 0, 3);
camera.lookAt(0, 0, 0);

scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
// renderer.render(scene, camera);

// Clock
const clock = new THREE.Clock();

// GSAP
gsap.to(torus.position, {
  z: 2,
  duration: 1,
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true,
});

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  cube.position.set(Math.sin(elapsedTime) * 1.5, Math.cos(elapsedTime) * 1.5);
  cube.rotation.set(elapsedTime * 2, elapsedTime * 2, elapsedTime);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
