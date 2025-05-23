import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";

import { SIZES } from "../constants";

// Canvas
const canvas = document.querySelector("canvas.webgl_scene_8");

// Scenes
const scene = new THREE.Scene();

/**
 * Debug
 */
const gui = new GUI({
  width: 300,
  container: document.querySelector(".debug_scene_8_container"),
  title: "Scene 8 Debug",
  closeFolders: true,
});

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/8.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight("white", 0.3);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight("white", 30);
// pointLight.position.set(2, 3, 4);
// scene.add(pointLight);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Objects
 */
// // MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;
// material.color = new THREE.Color("#ff0000");
// material.wireframe = true;

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// // MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.side = THREE.DoubleSide;

// // MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("#1188ff");

// // MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// // MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, "metalness").min(0).max(1).step(0.0001);
// gui.add(material, "roughness").min(0).max(1).step(0.0001);

/**
 * MeshPhysicalMaterial
 */
// Base material
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

// // Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);

// // Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, "sheen").min(0).max(1).step(0.0001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.addColor(material, "sheenColor");

// // Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence").min(0).max(1).step(0.0001);
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(1).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

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

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
