import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from  'gsap'
import * as dat from 'lil-gui'
// Import stylesheets
import './style.css';

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
const material = new THREE.MeshBasicMaterial({ color: params.color });
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

// Objects
// const group = new THREE.Group()
// scene.add(group)

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1,1,1),
//   new THREE.MeshBasicMaterial({color: 0xff00ff})
// )

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1,1,1),
//   new THREE.MeshBasicMaterial({color: 0x000fff})
// )

// cube2.position.x = -2

// group.add(cube1)
// group.add(cube2)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

// mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.set(2, 0.5, 0.5)

// Rtation
// mesh.rotation.y = Math.PI / 2


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