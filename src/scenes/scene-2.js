import * as THREE from "three";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_2");

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
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = Math.PI / 10;
group.rotation.x = Math.PI / 8;
scene.add(group);

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1),
  new THREE.MeshBasicMaterial({ color: "#451278" })
);

cylinder.position.x = -1.5;
group.add(cylinder);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#952247" })
);

cube.position.x = 0;
group.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#127845" })
);

sphere.position.x = 1.5;
group.add(sphere);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, SIZES.ASPECT_RATIO);
camera.position.z = 4;

scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
renderer.render(scene, camera);
