import gsap from "gsap";
import * as THREE from "three";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_3");

// Scenes
const scene = new THREE.Scene();

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Objects
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  new THREE.MeshBasicMaterial({ color: "#007aff" })
);
scene.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
sphere.position.set(0, 0, -2);
scene.add(sphere);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, SIZES.WIDTH / SIZES.HEIGHT);
camera.position.set(3, 0, 3);
camera.rotation.y = Math.PI / 4;

scene.add(camera);

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
gsap.to(sphere.position, {
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

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
