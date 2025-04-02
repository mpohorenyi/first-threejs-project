import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_7");

// Scenes
const scene = new THREE.Scene();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
};
loadingManager.onProgress = () => {
  console.log("loading progressing");
};
loadingManager.onError = () => {
  console.log("loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const diamondOreTexture = textureLoader.load("/textures/ores/diamond_ore.png");
diamondOreTexture.colorSpace = THREE.SRGBColorSpace;
diamondOreTexture.generateMipmaps = false;
diamondOreTexture.minFilter = THREE.NearestFilter;
diamondOreTexture.magFilter = THREE.NearestFilter;
const goldOreTexture = textureLoader.load("/textures/ores/gold_ore.png");
goldOreTexture.colorSpace = THREE.SRGBColorSpace;
goldOreTexture.generateMipmaps = false;
goldOreTexture.minFilter = THREE.NearestFilter;
goldOreTexture.magFilter = THREE.NearestFilter;
const ironOreTexture = textureLoader.load("/textures/ores/iron_ore.png");
ironOreTexture.colorSpace = THREE.SRGBColorSpace;
ironOreTexture.generateMipmaps = false;
ironOreTexture.minFilter = THREE.NearestFilter;
ironOreTexture.magFilter = THREE.NearestFilter;
const redstoneOreTexture = textureLoader.load(
  "/textures/ores/redstone_ore.png"
);
redstoneOreTexture.colorSpace = THREE.SRGBColorSpace;
redstoneOreTexture.minFilter = THREE.NearestFilter;
redstoneOreTexture.magFilter = THREE.NearestFilter;

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.MeshBasicMaterial({ map: redstoneOreTexture })
);
cylinder.position.x = -1.5;
group.add(cylinder);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: diamondOreTexture })
);
cube.position.x = 0;
group.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshBasicMaterial({ map: goldOreTexture })
);
sphere.position.x = 1.5;
group.add(sphere);

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
