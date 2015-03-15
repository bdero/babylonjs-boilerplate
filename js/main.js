(function() {

  // Grab the canvas and initialize the engine
  var canvas = document.getElementById("canvas");
  var engine = new BABYLON.Engine(canvas, true);

  // Setup the scene with physics
  var scene = new BABYLON.Scene(engine);
  scene.enablePhysics();
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
  scene.collisionsEnabled = true;
  scene.enablePhysics(null, new BABYLON.OimoJSPlugin());

  // Add first person camera with physics
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

  // Add a sun point light
  var sun = new BABYLON.DirectionalLight(
    "Directional",
    new BABYLON.Vector3(2, -5, 0),
    scene
  );
  sun.intensity = 0.9;
  sun.diffuse = new BABYLON.Color3(1, 1, 0.9);

  // Add a large floor box
  var floor = BABYLON.Mesh.CreateBox("Floor", 50, scene);
  floor.position.y = 0;
  floor.scaling.y = 0.1;
  floor.setPhysicsState(
    BABYLON.PhysicsEngine.BoxImpostor,
    {
      mass: 0,
      friction: 0.5,
      restitution: 0.7
    }
  );
  floor.checkCollisions = true;
  floor.receiveShadows = true;

  // Add example ball on the left
  var ball = BABYLON.Mesh.CreateSphere("Ball", 20, 8, scene);
  ball.position.x = -5;
  ball.position.y = 10;
  ball.setPhysicsState(
    BABYLON.PhysicsEngine.SphereImposter,
    { mass: 1 }
  );

  // Add a box to rotate
  var box = BABYLON.Mesh.CreateBox("Cube", 2, scene);
  box.position.x = 5;
  box.position.y = 4;
  box.position.z = -5;
  box.checkCollisions = true;

  // Setup Shadows
  var shadowGenerator = new BABYLON.ShadowGenerator(2048, sun);
  shadowGenerator.getShadowMap().renderList.push(ball);
  shadowGenerator.getShadowMap().renderList.push(box);

  // Setup time vars
  var prevTime, currentTime, deltaTime = 0;
  prevTime = currentTime = Date.now();

  engine.runRenderLoop(function() {
    // Update the time
    currentTime = Date.now();
    deltaTime = (currentTime - prevTime)/1000;
    prevTime = currentTime;

    // Rotate the box over time
    box.rotation.y += 1*deltaTime;

    // Render the scene
    scene.render();
  });

  window.addEventListener("resize", function() {
    engine.resize();
  });

})();
