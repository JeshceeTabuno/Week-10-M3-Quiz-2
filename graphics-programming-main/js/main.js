import * as THREE from './three.module.js';
import {FontLoader} from './FontLoader.js';
import {TextGeometry} from './TextGeometry.js';

let textMesh = new THREE.Mesh();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let cubeMesh = new THREE.Mesh();
let stars, starGeo;

const woodname = new THREE.TextureLoader().load('assets/textures/wooden.jpg');
lighting();
particles();
name();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.z -= 0.9;
  }



function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function name(){
  const fontLoader = new FontLoader();
  fontLoader.load('./Fonts/TextFontsJSON/Roboto_Medium_Regular.json',function (Font){
    const textGeometry= new TextGeometry('JESHCEE',{ 
      height: 2,
      size: 5,
      font: Font,}
   );
   textGeometry.center();
   const textMaterial= new THREE.MeshPhongMaterial({map: woodname });
   textMesh = new THREE.Mesh(textGeometry,textMaterial);
   textMesh.position.x=0;
   scene.add(textMesh);
   camera.position.z=30;
  });
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  textMesh.rotation.x += 0.008;
  textMesh.rotation.y += 0.008;
  textMesh.rotation.z += 0.008;

  renderer.render(scene, camera);
}

animate();

