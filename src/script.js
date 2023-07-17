import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from  'gsap'
import * as dat from 'lil-gui'
// Import stylesheets
import './style.css';
// Images

const image = new Image();

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(
  '/textures/door/color.jpg'
)
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


colorTexture.repeat.x = 3
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.RepeatWraping
colorTexture.wrapT = THREE.RepeatWraping

THREE.ColorManagement.enabled = false

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<canvas class="webgl"></canvas>`;

const scene = new THREE.Scene();

// Control
const gui = new dat.GUI()
const params = {
  color: 0xfff000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y+Math.PI * 2})
  }
}
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Ypos')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

gui.addColor(params, 'color')
.onChange(() => {
  material.color.set ( params.color)
})

gui.add(params, 'spin')
// Cursor

const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Axis helper
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper);



const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update render
    renderer.setSize(sizes.width, sizes.height)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {

  const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if(!fullScreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if(canvas.webkitRequestFullscreen){
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen()
    }
  }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

camera.lookAt(mesh.position)

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace

// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Clock 
const clock = new THREE.Clock()

// Animation

// gsap.to(
//   mesh.position, {duration:1, delay:1, x: 2}
// )

const tick = () => {
  
  // const elapsedTime = clock.getElapsedTime() 

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5

  // camera.lookAt(mesh.position)
  // mesh.rotation.y = elapsedTime
  // camera.lookAt(mesh.position)
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}

tick()