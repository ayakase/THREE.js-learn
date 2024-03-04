import './style.css'
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);
camera.position.setY(10);

renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({
//   color: 0xff6347,
// });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 3000, 2000);
pointLight.position.set(40, 40, 40);
scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);
const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
)
moon.position.set(20, 0, 0)
scene.add(moon);

const earthTexture = new THREE.TextureLoader().load('./assets/earth.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
)
scene.add(earth);
const sunTexture = new THREE.TextureLoader().load('./assets/sun.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(30, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture
  })
)
scene.add(sun);
sun.position.set(40, 40, 40);

function addRandomStar() {
  const geometry = new THREE.SphereGeometry(0.3, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const x = THREE.MathUtils.randFloatSpread(300)
  const y = THREE.MathUtils.randFloatSpread(300)
  const z = THREE.MathUtils.randFloatSpread(300)

  star.position.set(x, y, z)
  scene.add(star)
}
Array(200).fill().forEach(addRandomStar)
let t = 0
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.02
  moon.rotation.y += 0.005
  t += -0.005
  moon.position.x = 20 * Math.cos(t) + 0;
  moon.position.z = 20 * Math.sin(t) + 0;

  controls.update()
  renderer.render(scene, camera);
}
animate();

