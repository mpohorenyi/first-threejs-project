import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import { SIZES } from "../constants";

// Get a random coordinate offset
const getCoordinateOffset = (coordinate) => {
  const max = 10;
  return (
    Math.random() * (max - coordinate) +
    (Math.floor(Math.random() * 2) * (max + coordinate) - max)
  );
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl_scene_9");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

fontLoader.load("./fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello World  ", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });

  const text = new THREE.Mesh(textGeometry, material);
  textGeometry.center();
  scene.add(text);

  textGeometry.computeBoundingBox();
  console.log(textGeometry.boundingBox);

  Array.from({ length: 100 }).forEach(() => {
    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.set(
      getCoordinateOffset(textGeometry.boundingBox.max.x),
      getCoordinateOffset(textGeometry.boundingBox.max.y),
      getCoordinateOffset(textGeometry.boundingBox.max.z)
    );

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random() + 0.5;
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  });
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, SIZES.ASPECT_RATIO, 0.1, 100);
camera.position.set(1, 1, 2);
scene.add(camera);

// Controls
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
