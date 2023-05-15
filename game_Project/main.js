let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage;
let spaceshipImage;
let bulletImage;
let enemyImage;
let gameoverImage;
let gameover;
let score;

gameover = false; //true면 게임이 끝남, false이면 게임 진행
score = 0;
// 비행기 좌표
let spaceshipX;
let spaceshipY;

spaceshipX = canvas.width / 2 - 32;
spaceshipY = canvas.height - 64;

let bulletList = [];

function bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 17;
    this.y = spaceshipY;
    this.alive = true;
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };

  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 40
      ) {
        score += 10;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  };
}

function generateRandomaValue(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

let enemyList = [];

function enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomaValue(0, canvas.width - 64);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 4; //enemy의 속도조절

    if (this.y >= canvas.height - 64) {
      gameover = true;
      console.log("game over");
    }
  };
}

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.png";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameoverImage = new Image();
  gameoverImage.src = "images/gameover.png";
}

let keysDown = {};

function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysDown[e.key] = true;
  });
  document.addEventListener("keyup", function (e) {
    delete keysDown[e.key];

    if (e.key == " ") {
      createBullet(); // 총알 생성
    }
  });
}

function createBullet() {
  console.log("총알생성");
  let b = new bullet(); // 총알 생성
  b.init();
  console.log("새로운 총알 리스트", bulletList);
}

function createEnemy() {
  const interval = setInterval(function () {
    let e = new enemy();
    e.init();
  }, 1000);
}

function update() {
  if ("d" in keysDown) {
    spaceshipX += 7; //우주선의 속도
  } //right
  if ("a" in keysDown) {
    spaceshipX -= 5; //
  } //left

  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`score:${score}`, 20, 20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameover) {
    update(); //좌표값 업데이트
    render(); //다시 그려줌
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameoverImage, 10, 100, 380, 380);
  }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();
