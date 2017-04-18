import Matrix3D from './matrix';
import * as THREE from 'three';


export const translate = (obj, x = 0, y = 0, z = 0) => {
  let translationMatrix = new Matrix3D([
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  ]);
  translationMatrix.multiply(obj.matrix);
  obj.matrix.set(...translationMatrix.getElements());
}


export const rotateX = (obj, θ) => {
  if(obj.currentRotation === undefined){
    obj.currentRotation = { x: 0, y: 0, z: 0 };
  }
  let rotationMatrix = new THREE.Matrix4();

  const c = Math.cos(θ);
  const s = Math.sin(θ);
  
  rotationMatrix.set(
    1, 0, 0, 0,
    0, c,-s, 0,
    0, s, c, 0,
    0, 0, 0, 1
  )
  obj.currentRotation.x += θ;

  obj.applyMatrix(rotationMatrix);
}

export const rotateY = (obj, θ) => {
  if(obj.currentRotation === undefined){
    obj.currentRotation = { x: 0, y: 0, z: 0 };
  }
  let rotationMatrix = new THREE.Matrix4();

  const c = Math.cos(θ);
  const s = Math.sin(θ);
  
  rotationMatrix.set(
    c, 0, s, 0,
    0, 1, 0, 0,
   -s, 0, c, 0,
    0, 0, 0, 1
  )
  obj.currentRotation.y += θ;
  obj.applyMatrix(rotationMatrix);
}

export const rotateZ = (obj, θ) => {
  if(obj.currentRotation === undefined){
    obj.currentRotation = { x: 0, y: 0, z: 0 };
  }
  let rotationMatrix = new THREE.Matrix4();

  const c = Math.cos(θ);
  const s = Math.sin(θ);
  
  rotationMatrix.set(
    c,-s, 0, 0,
    s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  )
  obj.currentRotation.z += θ;
  obj.applyMatrix(rotationMatrix);
}


export const shear = (obj, a, b, c, d, e, f) => {
  let shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    1, a, b, 0,
    c, 1, d, 0,
    e, f, 1, 0,
    0, 0, 0, 1
  );
  obj.geometry.applyMatrix(shearMatrix);
}

export const scale = (obj, x = 1, y = 1, z = 1) => {
  let scaleMatrix = new THREE.Matrix4();
  scaleMatrix.set(
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  );
  obj.geometry.applyMatrix(scaleMatrix);
};
