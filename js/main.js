(function() {
  var Canvas = document.getElementById("renderCanvas");
  var Engine = new BABYLON.Engine(Canvas, true);
  var Scene = new BABYLON.Scene(Engine);

  var Camera = new BABYLON.ArcRotateCamera(
    "Camera", 1, 2, 20,
    new BABYLON.Vector3(0, 0, 0),
    Scene
  );

  var light0 = new BABYLON.PointLight(
    "Omni",
    new BABYLON.Vector3(0, 0, 10),
    Scene
  );

  var ball = BABYLON.Mesh.CreateSphere("Ball", 10, 1.0, Scene);
  ball.position.x = -5;

  var box = BABYLON.Mesh.CreateBox("Cube", 1, Scene);
  box.position.x = -10;

  var plane = BABYLON.Mesh.CreatePlane("Plane", 10, Scene);
  plane.rotation.y = Math.PI;
  plane.position.x = 5;

  var cylinder = BABYLON.Mesh.CreateCylinder(
    "Cylinder", 3, 1, 3, 20,
    Scene, false
  );
  cylinder.position.x = 15;

  Scene.activeCamera.attachControl(Canvas);

  Engine.runRenderLoop(function() {
    Scene.render();
  });

  window.addEventListener("resize", function() {
    Engine.resize();
  });
})();
