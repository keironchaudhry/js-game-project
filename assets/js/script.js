// initialize kaboom context

kaboom({
  global: true,
  width: 1500,
  height: 500,
  canvas: document.querySelector("#game"),
  scale: 1,
  debug: true,
  background: [0, 0, 0, 0],
});

// global variables
let lives = 3;

const SPEED = 250;
const JUMP_FORCE = 240;

setGravity(640);

const spriteNames = ["yoda1", "yoda2", "yoda3"];
const spritePaths = [
  "/sprites/yoda-1.png",
  "/sprites/yoda-2.png",
  "/sprites/yoda-2.png",
];

spriteNames.forEach((name, index) => {
  loadSprite(name, spritePaths[index]);
});

// loads sprite
loadRoot("assets/");
loadSprite("yoda1", "sprites/yoda-1.png");
loadSprite("yoda2", "sprites/yoda-2.png");
loadSprite("yoda3", "sprites/yoda-3.png");
loadSprite("yodaStop", "sprites/yoda-halt.png");
loadSprite("yoda4", "sprites/yoda-4.png");
loadSprite("ground", "background/ground.png");

// create game scenes
scene("game", () => {
  //layers

  const ui = add([fixed(), z(100)]);

  const bg = add([fixed(), z(1)]);

  const level = addLevel(
    [
      "                                    ",
      "==================== ===============",
    ],
    {
      tileWidth: 64,
      tileHeight: 64,
      pos: vec2(140, 200),
      tiles: {
        "=": () => [
          sprite("ground"),
          area({ scale: 0.9 }),
          pos(-60, 350),
          body({ isStatic: true }),
          anchor("bot"),
        ],
      },
    }
  );

  const yoda1 = add([
    sprite("yoda1", { flipX: true }),
    scale(0.1),
    anchor("bot"),
    area(),

    body(),
    pos(100, 20),
  ]);
  let currentSpriteIndex = 0;

  // Movements

  onKeyDown("right", () => {
    currentSpriteIndex++;

    if (currentSpriteIndex >= spriteNames.length) {
      currentSpriteIndex = 0;
    }
    const nextSpriteName = spriteNames[currentSpriteIndex];
    yoda1.move(SPEED, 0), (yoda1.flipX = false);
    yoda1.use(sprite(nextSpriteName));
  });

  onKeyDown("right", () => {
    currentSpriteIndex++;

    if (currentSpriteIndex >= spriteNames.length) {
      currentSpriteIndex = 0;
    }
    const nextSpriteName = spriteNames[currentSpriteIndex];
    yoda1.use(sprite(nextSpriteName));
    yoda1.flipX = true; 
    yoda1.move(SPEED, 0);
  });

  onKeyDown("left", () => {
    currentSpriteIndex++;

    if (currentSpriteIndex >= spriteNames.length) {
      currentSpriteIndex = 0;
    }
    const nextSpriteName = spriteNames[currentSpriteIndex];
    yoda1.move(-SPEED, 0), (yoda1.flipX = true);
    yoda1.use(sprite(nextSpriteName));
  });

  // onKeyDown("left", () => {
  //   yoda1.move(-SPEED, 0), (yoda1.flipX = true);
  //   yoda1.use(sprite("yoda4", "yoda3", "yoda2"));
  // });

  // onKeyDown("right", () => {
  //   yoda1.move(SPEED, 0), (yoda1.flipX = true);
  //   yoda1.use(sprite("yoda4", "yoda3", "yoda2"));
  // });

  // onKeyDown("up", () => {
  //   yoda1.move(0, -SPEED);
  // });

  // onKeyDown("down", () => {
  //   yoda1.move(0, SPEED);
  // });

  // onClick(() => {
  //   yoda1.moveTo(mousePos());
  // });

  // ui.add([sprite("yoda1"), scale(0.2)]);
  // bg.add([sprite("ground"), scale(0.2), pos(0, 40)]);
});

// create life containers
function createLifeIcons() {
  if (lifeContainer.children.length >= 3) {
    return;
  }

  const iconsToAdd = Math.min(lives, 3 - lifeContainer.children.length);
  for (let i = 0; i < iconsToAdd; i++) {
    const lifeIcon = document.createElement("div");
    lifeIcon.classList.add("life-icon");
    lifeContainer.appendChild(lifeIcon);
  }
}

function removeLifeIcon() {
  const lifeIcons = lifeContainer.getElementsByClassName("life-icon");
  if (lifeIcons.length > 0) {
    lifeContainer.removeChild(lifeIcons[lifeIcons.length - 1]);
  }
  if (lifeIcons.length <= 0) {
    // If lives end up at 0, gameOver function called
  }
}

// calls function to create life container(s)
createLifeIcons();

// start game
go("game");
