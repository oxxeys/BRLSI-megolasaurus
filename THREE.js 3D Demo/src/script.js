import * as THREE from 'three'
import GUI from 'lil-gui'
import { MarchingCubes } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//got to 37.16


/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        material.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Obj
 */

// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter



//Meshes
const objectsDistance = 4
const meshContainer = [];
const material = new THREE.MeshToonMaterial({ 
    color: parameters.meshContainer,
    gradientMap: gradientTexture

})

meshContainer.push(new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
))
meshContainer.push(new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
))
meshContainer.push(new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
))

meshContainer[0].position.y = - objectsDistance * 0.25
meshContainer[1].position.y = - objectsDistance * 1
meshContainer[2].position.y = - objectsDistance * 2

meshContainer[0].position.x = 2
meshContainer[1].position.x = - 2
meshContainer[2].position.x = 2

const loader = new GLTFLoader();

// loader.load( 'path/to/model.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );



//scene.add(meshContainer[0], meshContainer[1], meshContainer[2])





// light

const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(1,1,0)
var a = loader.load( '/assets/jaw.glb', function ( gltf ) {
    scene.remove.apply(scene, scene.children);
    gltf.scene.position.y =- objectsDistance * 3
    scene.add( meshContainer[0], meshContainer[1], meshContainer[2], gltf.scene, directionalLight);
    

}, undefined, function ( error ) {

    console.error( error );

} );
// scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//scroll
let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
})



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance


    meshContainer[0].position.x = - scrollY / sizes.height  * 1.5 * objectsDistance + 2
    if(scrollY > 560){
        meshContainer[1].position.x = scrollY / sizes.height  * 1.5 * objectsDistance - 8
    } 
    
    //
    for(const mesh of meshContainer){
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()