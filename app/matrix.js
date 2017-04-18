export default class Matrix3D {

  constructor(arr) {
    if (arr) {
      this.elements = new Float32Array(arr);
    } else {
      this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
  }

  multiply(matrix) {
    var tm = this.elements;
    var mm = matrix.elements;
    var newElements = new Array(16);

    var a11 = tm[0], a12 = tm[4], a13 = tm[8], a14 = tm[12];
    var a21 = tm[1], a22 = tm[5], a23 = tm[9], a24 = tm[13];
    var a31 = tm[2], a32 = tm[6], a33 = tm[10], a34 = tm[14];
    var a41 = tm[3], a42 = tm[7], a43 = tm[11], a44 = tm[15];

    var b11 = mm[0], b12 = mm[4], b13 = mm[8], b14 = mm[12];
    var b21 = mm[1], b22 = mm[5], b23 = mm[9], b24 = mm[13];
    var b31 = mm[2], b32 = mm[6], b33 = mm[10], b34 = mm[14];
    var b41 = mm[3], b42 = mm[7], b43 = mm[11], b44 = mm[15];

    newElements[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    newElements[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    newElements[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    newElements[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    newElements[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    newElements[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    newElements[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    newElements[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    newElements[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    newElements[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    newElements[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    newElements[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    newElements[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    newElements[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    newElements[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    newElements[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    this.elements = newElements;
  }

  getElements() {
    return this.elements;
  }
}
