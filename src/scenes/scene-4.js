import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { SIZES } from "../constants";

const toggleCanvasFullscreen = () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  // Toggle fullscreen
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }

    // Update sizes after requesting fullscreen
    const width = window.screen.width;
    const height = window.screen.height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_4");

// Fullscreen
const fullscreenIcon = document.querySelector(".fullscreen-icon");

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

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

// Fullscreen
fullscreenIcon.addEventListener("click", toggleCanvasFullscreen);
canvas.addEventListener("dblclick", toggleCanvasFullscreen);

window.addEventListener("fullscreenchange", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    // Reset to original size
    camera.aspect = SIZES.ASPECT_RATIO;
    camera.updateProjectionMatrix();

    renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
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
