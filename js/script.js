"use strict";
//NCC-1701
console.log("                                                                \n  ___________________  *       _-_                   *          \n  \\\%c==============%c_%c=%c_/ ____.---'---`---.____   *        *     *  \n              \\\_ \\\    \\\----._________.----/                     \n         *      \\\ \\\   /  /    `-_-'              *            * \n  *         __,--`.`-'..'-_                            *        \n           /____          ||    *         *                     \n                `--.____,-'                                     \n                                                                ", "color: #ff0000;", "color: #000000;", "color: #0000ff;", "color: #000000;");

window.addEventListener('resize', handleWindowResize, false);

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var scene = new THREE.Scene();

//scene.fog = new THREE.Fog (0x000000, 600, 1000); 

var aspectRatio = WIDTH / HEIGHT;
var fieldOfView = 70;
var nearPlane = 1;
var farPlane = 1000;

var camera = new THREE.PerspectiveCamera(
	fieldOfView,
	aspectRatio,
	nearPlane,
	farPlane
);
// Position the camera
camera.position.set (0, 0, 0);	

scene.add(camera);

var renderer = new THREE.WebGLRenderer({ 
	alpha: true, 
	antialias: true 
});
renderer.setSize(WIDTH, HEIGHT);
container = document.getElementById('container');
container.appendChild(renderer.domElement);



function handleWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

//GRID
///////////////////
var gridHelper = new THREE.GridHelper( 500, 50 );
gridHelper.position.set(0, -20, 0);
scene.add(gridHelper);

//SPHERE DEFORM
///////////////////
var normalMaterial = new THREE.MeshNormalMaterial({});

var sphereGeom = new THREE.SphereGeometry(20,15,15);

sphereGeom.mergeVertices();
var l = sphereGeom.vertices.length;
this.waves = [];
	for (var i=0; i<l; i++){
	var v = sphereGeom.vertices[i];
	this.waves.push({y:v.y,
	 x:v.x,
	 z:v.z,
	ang:Math.random()*Math.PI*2,
	amp:3,
	speed:0.016 + Math.random()*0.024
	});
};

this.sphere = new THREE.Mesh(sphereGeom, normalMaterial);
this.sphere.position.set(0, 0, -50);
scene.add(sphere);


//SPHERE ANIMATION
///////////////////

function animate(){
	var verts = sphere.geometry.vertices;
	var l = verts.length;

	for (var i=0; i<l; i++){
		var v = verts[i];
		var vProperties = waves[i];

		// v.z = vProperties.z + Math.cos(vProperties.ang)*vProperties.amp;
		v.x = vProperties.x + Math.cos(vProperties.ang)*vProperties.amp;
		v.y = vProperties.y + Math.sin(vProperties.ang)*vProperties.amp;
		vProperties.ang += vProperties.speed;
	}

	sphere.geometry.verticesNeedUpdate=true;

	sphere.rotation.z += Math.PI/180;
	sphere.rotation.y += Math.PI/180;
	// sphere.rotation.x += Math.PI/180;
}

function loop(){
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
	animate();
}

loop();
