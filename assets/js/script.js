// initialize kaboom context
kaboom({
  global: true,
  width: 800,
  height: 800,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 0],
});

// loads sprite
loadRoot("assets/");
loadSprite("yoda1", "sprites/yoda-1.png");

// create game scenes
scene("game", () => {
  const yoda1 = add([sprite("yoda1"), pos(400, 200), scale(0.1)]);

  //layers
  layers(["bg", "obj", "ui"], "obj");
  add([sprite, layer("obj")]);
});

// start game
go("game");
