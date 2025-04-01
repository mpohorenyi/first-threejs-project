import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_6");

// Scenes
const scene = new THREE.Scene();

/**
 * Debug
 */
const gui = new GUI({
  width: 300,
  container: document.querySelector(".debug_scene_6_container"),
  title: "Scene 6 Debug",
  closeFolders: true,
});

const groupFolder = gui.addFolder("Group");
const cylinderFolder = gui.addFolder("Cylinder");
const cubeFolder = gui.addFolder("Cube");
const sphereFolder = gui.addFolder("Sphere");

const debugObject = {
  cylinder: {
    color: "#451278",
  },
  cube: {
    color: "#952247",
  },
  sphere: {
    color: "#127845",
  },
};

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

groupFolder.add(group, "visible");

groupFolder.add(group.scale, "x").min(1).max(10).step(0.01).name("Scale X");
groupFolder.add(group.scale, "y").min(1).max(10).step(0.01).name("Scale Y");
groupFolder.add(group.scale, "z").min(1).max(10).step(0.01).name("Scale Z");

groupFolder
  .add(group.position, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position X");
groupFolder
  .add(group.position, "y")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Y");
groupFolder
  .add(group.position, "z")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Z");

groupFolder
  .add(group.rotation, "x")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation X");
groupFolder
  .add(group.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Y");
groupFolder
  .add(group.rotation, "z")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Z");

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1),
  new THREE.MeshBasicMaterial({ color: "#451278" })
);

cylinderFolder.add(cylinder, "visible");
cylinderFolder.add(cylinder.material, "wireframe");

cylinderFolder
  .add(cylinder.scale, "x")
  .min(1)
  .max(10)
  .step(0.01)
  .name("Scale X");
cylinderFolder
  .add(cylinder.scale, "y")
  .min(1)
  .max(10)
  .step(0.01)
  .name("Scale Y");
cylinderFolder
  .add(cylinder.scale, "z")
  .min(1)
  .max(10)
  .step(0.01)
  .name("Scale Z");

cylinderFolder
  .add(cylinder.position, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position X");

cylinderFolder
  .add(cylinder.position, "y")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Y");

cylinderFolder
  .add(cylinder.position, "z")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Z");

cylinderFolder
  .add(cylinder.rotation, "x")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation X");

cylinderFolder
  .add(cylinder.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Y");

cylinderFolder
  .add(cylinder.rotation, "z")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Z");

cylinderFolder.addColor(debugObject.cylinder, "color").onChange(() => {
  cylinder.material.color.set(debugObject.cylinder.color);
});

cylinder.position.x = -1.5;
group.add(cylinder);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#952247" })
);

cube.position.x = 0;
group.add(cube);

cubeFolder.add(cube, "visible");
cubeFolder.add(cube.material, "wireframe");

cubeFolder.add(cube.scale, "x").min(1).max(10).step(0.01).name("Scale X");
cubeFolder.add(cube.scale, "y").min(1).max(10).step(0.01).name("Scale Y");
cubeFolder.add(cube.scale, "z").min(1).max(10).step(0.01).name("Scale Z");

cubeFolder
  .add(cube.position, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position X");
cubeFolder
  .add(cube.position, "y")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Y");
cubeFolder
  .add(cube.position, "z")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Z");

cubeFolder
  .add(cube.rotation, "x")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation X");
cubeFolder
  .add(cube.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Y");
cubeFolder
  .add(cube.rotation, "z")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Z");

cubeFolder.addColor(debugObject.cube, "color").onChange(() => {
  cube.material.color.set(debugObject.cube.color);
});

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#127845" })
);

sphere.position.x = 1.5;
group.add(sphere);

sphereFolder.add(sphere, "visible");
sphereFolder.add(sphere.material, "wireframe");

sphereFolder.add(sphere.scale, "x").min(1).max(10).step(0.01).name("Scale X");
sphereFolder.add(sphere.scale, "y").min(1).max(10).step(0.01).name("Scale Y");
sphereFolder.add(sphere.scale, "z").min(1).max(10).step(0.01).name("Scale Z");

sphereFolder
  .add(sphere.position, "x")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position X");
sphereFolder
  .add(sphere.position, "y")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Y");
sphereFolder
  .add(sphere.position, "z")
  .min(-10)
  .max(10)
  .step(0.01)
  .name("Position Z");

sphereFolder
  .add(sphere.rotation, "x")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation X");
sphereFolder
  .add(sphere.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Y");
sphereFolder
  .add(sphere.rotation, "z")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.01)
  .name("Rotation Z");

sphereFolder.addColor(debugObject.sphere, "color").onChange(() => {
  sphere.material.color.set(debugObject.sphere.color);
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, SIZES.ASPECT_RATIO, 0.1, 100);
camera.position.set(0, 0, 3);

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

// Animations
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
