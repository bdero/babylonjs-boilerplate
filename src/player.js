var scene = require('./scene');

// Add first person player camera with physics
var camera = new BABYLON.FreeCamera(
  "FreeCamera",
  new BABYLON.Vector3(0, 5, -15),
  scene
);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));
camera.checkCollisions = true;
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
camera.applyGravity = true;

// Add camera controls to the canvas
scene.activeCamera.attachControl(canvas);
scene.activeCamera.keysUp.push(90); // Z
scene.activeCamera.keysUp.push(87); // W
scene.activeCamera.keysDown.push(83); // S
scene.activeCamera.keysLeft.push(65); // A
scene.activeCamera.keysLeft.push(81); // Q
scene.activeCamera.keysRight.push(69); // E
scene.activeCamera.keysRight.push(68); // D
scene.activeCamera.speed = 0.8;

module.exports = {
  camera: camera
};
