import * as THREE from "three";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_1");

// Scenes
const scene = new THREE.Scene();

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#309911" });
const mesh = new THREE.Mesh(geometry, material);

// Position
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;

// Scale
mesh.scale.x = 2;
mesh.scale.y = 0.25;
mesh.scale.z = 0.5;

// Rotate
mesh.rotation.x = Math.PI * 0.3;
mesh.rotation.y = Math.PI * 0.15;
mesh.rotation.z = Math.PI * -0.25;

scene.add(mesh);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, SIZES.WIDTH / SIZES.HEIGHT);
camera.position.z = 3;

// Look At
camera.lookAt(mesh.position);

scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
renderer.render(scene, camera);
