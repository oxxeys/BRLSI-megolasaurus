import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // controls for the 3d models
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


var scene = new THREE.Scene(); // initialising the scene
// scene.background = new THREE.Color( 0x035c88 );

var container = document.getElementById( 'skull' );
var camera = new THREE.PerspectiveCamera( 75, container.clientWidth/ container.clientHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer( {alpha: true } );

    renderer.setSize( container.clientWidth, container.clientHeight, true);
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );
	renderer.setClearColor( 0x000000, 0); //0x035c88

//Adds light to be able to see 3d model
const directionalLight = new THREE.DirectionalLight(0xffffff, 10, 200)
directionalLight.position.set(1,1,1);

scene.add(directionalLight);

// load 3d model from files
const loader = new GLTFLoader();

loader.load( './assets/skull.glb', function ( gltf ) { //expecting an error here when first loaded

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( "error" );

} );

//where camera is positioned - only needed in mobile (set before orbit controls)
camera.position.z = 1;



//allows for 3d model to be controlled
 const controls = new OrbitControls( camera, renderer.domElement );
 controls.enableDamping = true;
 controls.target.set(0, 0, 0)


 
//set camera position then update controls
camera.position.set( -10, 0,  20);

controls.update();

function animate() {

	controls.update();

	renderer.render( scene, camera );


	directionalLight.position.copy( camera.position );
}

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() { // from https://github.com/mrdoob/three.js/blob/70cc4e192fe2ebd0bf8542a81c8c513d61984c58/examples/webgl_geometries.html#L134 - allows for responsive resize

	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( container.clientWidth, container.clientHeight );
	
}


