(function() {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);

  scene.enablePhysics();
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
  scene.collisionsEnabled = true;

  var camera = new BABYLON.FreeCamera(
    "FreeCamera",
    new BABYLON.Vector3(0, 5, -15),
    scene
  );
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  camera.applyGravity = true;

  var light0 = new BABYLON.PointLight(
    "Omni",
    new BABYLON.Vector3(0, 18, -5),
    scene
  );

  var floor = BABYLON.Mesh.CreateBox("Floor", 50, scene);
  floor.position.y = 0;
  floor.scaling.y = 0.1;
  floor.checkCollisions = true;

  var ball = BABYLON.Mesh.CreateSphere("Ball", 20, 8, scene);
  ball.position.x = -5;
  ball.position.y = 1;
  ball.setPhysicsState({
    impostor: BABYLON.PhysicsEngine.BoxImposter,
    mass: 1,
    friction: 0.5,
    restitution: 0.7
  });

  var box = BABYLON.Mesh.CreateBox("Cube", 2, scene);
  box.position.x = 5;
  box.position.y = 3.5;
  box.position.z = -5;
  box.checkCollisions = true;

  scene.activeCamera.attachControl(canvas);

  var prevTime, currentTime, deltaTime = 0;
  prevTime = currentTime = Date.now();

  engine.runRenderLoop(function() {
    currentTime = Date.now();
    deltaTime = (currentTime - prevTime)/1000;
    prevTime = currentTime;

    box.rotation.y += 1*deltaTime;

    scene.render();
  });

  window.addEventListener("resize", function() {
    engine.resize();
  });
})();
