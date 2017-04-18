import * as THREE from 'three';
import _ from 'lodash';
import dat from './dat.gui';
import {
  scale,
  translate,
  rotateX,
  rotateY,
  rotateZ,
  rotateAxisZ,
  shear
} from './transformations';

var OrbitControls = require('three-orbit-controls')(THREE);

import './style/style.less';

var scene,
  camera,
  controls,
  renderer,
  control,
  centerPoint,
  moon,
  sun,
  earth,
  earthOrbit,
  moonOrbit;
var geometry, material, mesh;

init();
animate();


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 500;
  controls = new OrbitControls(camera);
  controls.enablePan = false;

  scene.background = new THREE.Color(0x000000);

  centerPoint = new THREE.Object3D();
  earthOrbit = new THREE.Object3D();
  moonOrbit = new THREE.Object3D();

  var sun_image = new Image();
  sun_image.src = require('../textures/sun.jpg');
  var sun_texture = new THREE.Texture();
  sun_texture.image = sun_image;
  sun_image.onload = function() {
    console.log("LOADED");
    sun_texture.needsUpdate = true;
  }

  var earth_image = new Image();
  earth_image.src = require('../textures/earth.jpg');
  var earth_texture = new THREE.Texture();
  earth_texture.image = earth_image;
  earth_image.onload = function() {
    console.log("LOADED");
    earth_texture.needsUpdate = true;
  }

  var sunGeometry = new THREE.SphereGeometry(1, 12, 12);
  var sunMaterial = new THREE.MeshBasicMaterial({
    map: sun_texture,
    color: 0xffff00
  });
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scale(sun, 20, 20, 20);

  var earthGeometry = new THREE.SphereGeometry(1, 12, 12);
  var earthMaterial = new THREE.MeshBasicMaterial({
    map: earth_texture,
    color: 0x00ffff
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scale(earth, 5, 5, 5);
  earthOrbit.currentRotation = { x: 0, y: 0, z: 0 };

  var moonGeometry = new THREE.SphereGeometry(1, 10, 10);
  var moonMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scale(moon, 1, 1, 1);


  centerPoint.add(sun);
  centerPoint.add(earthOrbit);
  earthOrbit.add(earth);
  earth.add(moonOrbit);
  moonOrbit.add(moon);

  translate(moonOrbit, 0, 16, 0);


  scene.add(centerPoint);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  control = new function() {
    this.sunRotationSpeed = 0.0001;
    this.earthRotationSpeed = 0.0001;
    this.moonRotationSpeed = 0.03;
    this.e = 0.0167;
    this.a = 149.60;
    this.g = 0.2;
  }();

  addControls(control);
}

function addControls(controlObject) {
  var gui = new dat.GUI();
  gui.add(controlObject, 'sunRotationSpeed', -2, 2);
  gui.add(controlObject, 'earthRotationSpeed', -2, 2);
  gui.add(controlObject, 'moonRotationSpeed', -2, 2);
  gui.add(controlObject, 'e', 0, 1);
  gui.add(controlObject, 'a', 0, 200);
  gui.add(controlObject, 'g', 0, 2);
}

function animate() {
  requestAnimationFrame(animate);
  rotateZ(sun, control.sunRotationSpeed)
  rotateZ(earth, control.earthRotationSpeed)

  let θ = earthOrbit.currentRotation.z;
  let a = control.a;
  let e = control.e;

  var radius = a*(1-Math.pow(e,2))/(1+e*Math.cos(θ));

  var speed  = Math.sqrt(control.g*(2/radius - 1/a));

  //console.log('θ:',θ)
  //console.log('speed:',speed)
  translate(earth,(radius))
  rotateZ(earthOrbit,speed);
  rotateZ(moonOrbit, control.moonRotationSpeed);
  renderer.render(scene, camera);
  translate(earth,-(radius));
}
