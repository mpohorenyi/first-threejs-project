import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_5");

// Scenes
const scene = new THREE.Scene();

/**
 * Geometry
 */
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry();

// Create 50 triangles (450 values)
const count = 500;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: "#7700ff",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, SIZES.ASPECT_RATIO, 0.1, 100);
camera.position.set(4, 3, 4);
camera.rotation.y = Math.PI / 4;

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

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
