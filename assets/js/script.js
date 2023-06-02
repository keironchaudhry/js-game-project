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

const SPEED = 300;
const JUMP_FORCE = 540;

setGravity(640);

const spriteNames = [
  "yoda1",
  "yoda2",
  "yoda3",
  "yoda4",
  "yoda5",
  "yoda6",
  "yoda7",
  "yoda8",
];
const spritePaths = [
  "/sprites/yoda-1.png",
  "/sprites/yoda-2.png",
  "/sprites/yoda-3.png",
  "/sprites/yoda-4.png",
  "/sprites/yoda-5.png",
  "/sprites/yoda-6.png",
  "/sprites/yoda-7.png",
  "/sprites/yoda-8.png",
];

spriteNames.forEach((name, index) => {
  loadSprite(name, spritePaths[index]);
});

// loads sprite
loadRoot("assets/");
loadSprite("yoda1", "sprites/yoda-1.png");
loadSprite("yoda2", "sprites/yoda-2.png");
loadSprite("yoda3", "sprites/yoda-3.png");
loadSprite("yoda4", "sprites/yoda-4.png");
loadSprite("yoda5", "sprites/yoda-5.png");
loadSprite("yoda6", "sprites/yoda-6.png");
loadSprite("yoda7", "sprites/yoda-7.png");
loadSprite("yoda8", "sprites/yoda-8.png");
loadSprite("jump", "sprites/jump.png");
loadSprite("yodaStop", "sprites/yoda-halt.png");
loadSprite("ground", "background/ground.png");
loadSprite("background", "background/background.jpg");

// create game scenes
scene("game", () => {
  //layers
  const ui = add([fixed(), z(100)]);
  const bg = add([fixed("background"), z(1)]);
  const level = addLevel(
    [
      "                                                ",
      "                                                ",
      "                                                ",
      "           ===                                  ",
      "==================== ========, =================, ====================",
      "==================== ========, =================",
    ],

    {
      tileWidth: 64,
      tileHeight: 64,
      pos: vec2(140, 200),
      tiles: {
        "=": () => [
          sprite("ground"),
          area({ scale: 0.8 }),
          pos(-700, 550),
          body({ isStatic: true }),
          anchor("bot"),
        ],
      },
    }
  );

  const yoda1 = add([
    sprite("yoda1"),
    scale(0.2),
    anchor("bot"),
    area(),
    body(),
    pos(-70, 20),
  ]);

  let currentSpriteIndex = 0;
  const spriteChangeDelay = 1;

  yoda1.onUpdate(() => {
    camPos(yoda1.worldPos());
  });

  yoda1.onPhysicsResolve(() => {
    camPos(yoda1.worldPos());
  });

  // Movements

  onKeyDown("right", async () => {
    currentSpriteIndex++;

    if (currentSpriteIndex >= spriteNames.length) {
      currentSpriteIndex = 0;
    }
    const nextSpriteName = spriteNames[currentSpriteIndex];
    yoda1.move(SPEED, 0), (yoda1.flipX = false);
    yoda1.use(sprite(nextSpriteName));
    await wait(spriteChangeDelay);
  });

  onKeyDown("left", async () => {
    currentSpriteIndex++;

    if (currentSpriteIndex >= spriteNames.length) {
      currentSpriteIndex = 0;
    }
    const nextSpriteName = spriteNames[currentSpriteIndex];
    yoda1.move(-SPEED, 0);

    yoda1.use(sprite(nextSpriteName));
    yoda1.flipX = true;
    await wait(spriteChangeDelay);
  });

  const defaultSpriteName = "default";
  const jumpSpriteName = "jump";

  onKeyDown("up", () => {
    yoda1.move(0, -SPEED, JUMP_FORCE);

    if (yoda1.flipX) {
      yoda1.use(sprite(jumpSpriteName, { flipX: true }));
    } else {
      yoda1.use(sprite(jumpSpriteName));
    }
  });

  onKeyRelease("up", () => {
    yoda1.use(sprite("yoda1"));
  });

  onClick(() => {
    yoda1.moveTo(mousePos());
  });

  // ui.add([sprite("yoda1"), scale(0.2)]);
  // bg.add([sprite("background"),  pos(0, 40)]);
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
