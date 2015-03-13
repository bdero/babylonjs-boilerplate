(function() {
  var Canvas = document.getElementById("renderCanvas");
  var Engine = new BABYLON.Engine(Canvas, true);
  var Scene = new BABYLON.Scene(Engine);

  Scene.enablePhysics();
  Scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
  Scene.collisionsEnabled = true;

  var Camera = new BABYLON.FreeCamera(
    "FreeCamera",
    new BABYLON.Vector3(0, 5, -15),
    Scene
  );
  Camera.checkCollisions = true;
  Camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  Camera.applyGravity = true;

  var light0 = new BABYLON.PointLight(
    "Omni",
    new BABYLON.Vector3(0, 18, -5),
    Scene
  );

  var floor = BABYLON.Mesh.CreateBox("Floor", 50, Scene);
  floor.position.y = 0;
  floor.scaling.y = 0.1;
  floor.checkCollisions = true;

  var ball = BABYLON.Mesh.CreateSphere("Ball", 20, 8, Scene);
  ball.position.x = -5;
  ball.position.y = 1;
  ball.setPhysicsState({
    impostor: BABYLON.PhysicsEngine.BoxImposter,
    mass: 1,
    friction: 0.5,
    restitution: 0.7
  });

  var box = BABYLON.Mesh.CreateBox("Cube", 2, Scene);
  box.position.x = 5;
  box.position.y = 3.5;
  box.position.z = -5;
  box.checkCollisions = true;

  Scene.activeCamera.attachControl(Canvas);

  var prevTime, currentTime, deltaTime = 0;
  prevTime = currentTime = Date.now();

  Engine.runRenderLoop(function() {
    currentTime = Date.now();
    deltaTime = (currentTime - prevTime)/1000;
    prevTime = currentTime;

    box.rotation.y += 1*deltaTime;

    Scene.render();
  });

  window.addEventListener("resize", function() {
    Engine.resize();
  });
})();
