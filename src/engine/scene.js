var engine = require('./engine');

// Setup the scene with physics
var scene = new BABYLON.Scene(engine);
scene.enablePhysics();
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
scene.collisionsEnabled = true;
scene.enablePhysics(null, new BABYLON.OimoJSPlugin());

module.exports = scene;
