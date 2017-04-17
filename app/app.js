import * as THREE from 'three';
import _ from 'lodash';
var OrbitControls = require('three-orbit-controls')(THREE);

import './style/style.less';

var scene, camera, controls, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
  scene = new THREE.Scene();

  var vertex_shader =
`varying vec3 vNormal;

void main() {

  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`;

  var fragment_shader =
`uniform sampler2D texture;

varying vec3 vNormal;

void main() {

  vec2 uv = normalize( vNormal ).xy * 0.5 + 0.5;

  vec3 color = texture2D( texture, uv ).rgb;

  gl_FragColor = vec4( color, 1.0 );

}`;

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1000;

  controls = new OrbitControls(camera);
  controls.enablePan = false;

  geometry = new THREE.SphereGeometry(200, 200, 200);


  var texture = new THREE.TextureLoader().load( require("../textures/sun.jpg") );

  var uniforms = {
    "texture": { type: "t", value: texture }
  };

  // material
  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertex_shader,
    fragmentShader: fragment_shader
  } );

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}
