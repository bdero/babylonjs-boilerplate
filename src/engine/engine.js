// Grab the canvas and initialize the engine
var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

// Create a listener to resize the game along with the window
window.addEventListener("resize", () => {
  engine.resize();
});

module.exports = engine;
