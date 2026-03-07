import p5 from "p5";

export function startKusoge(containerId: string): void {
  const sketch = (p: p5) => {
    let gameChar_x: number;
    let gameChar_y: number;
    let floorPos_y: number;

    let isLeft = false;
    let isRight = false;
    let isFalling = false;
    let isJumping = false;
    let speed = 2;
    let disabled = false;

    let trees_x: number[] = [];
    let treePos_y: number;

    let clouds_x: number[] = [];
    const clouds_width = 100;

    let mountains_x: number[] = [];

    let cameraPos_X = 0;

    let score: number;
    let lives: number;

    let gameOver = false;

    interface Collectable {
      isFound: boolean;
      x_pos: number;
      y_pos: number;
      size: number;
    }
    interface Canyon {
      x_pos: number;
      y_pos: number;
      width: number;
    }
    interface Flagpole {
      isReached: boolean;
      x_pos: number;
    }

    let collectable: Collectable;
    let canyon: Canyon;
    let flagpole: Flagpole;

    function startGame() {
      score = 0;
      disabled = false;
      gameChar_x = p.width / 2;
      gameChar_y = floorPos_y + 10;

      collectable = { isFound: false, x_pos: 100, y_pos: 410, size: 50 };
      canyon = { x_pos: 740, y_pos: 432, width: 100 };
      flagpole = { isReached: false, x_pos: 2000 };

      trees_x = [0, 650, 1000, 1500];
      treePos_y = p.height / 2 - 50;

      clouds_x = [100, 800, 1500];
      mountains_x = [0, 1000];
    }

    p.setup = () => {
      const canvas = p.createCanvas(1024, 576);
      canvas.parent(containerId);
      floorPos_y = (p.height * 3) / 4;
      lives = 3;
      startGame();
    };

    p.draw = () => {
      cameraPos_X = gameChar_x - p.width / 2;

      p.background(100, 155, 255);

      p.noStroke();
      p.fill(0, 155, 0);
      p.rect(0, floorPos_y, p.width, p.height - floorPos_y);

      p.push();
      p.translate(-cameraPos_X, 0);

      // Canyon
      p.noStroke();
      p.fill(250, 213, 165);
      p.rect(canyon.x_pos, canyon.y_pos, canyon.width, 150);
      p.stroke(0);
      p.strokeWeight(5);
      p.rect(canyon.x_pos + canyon.width / 2, canyon.y_pos + 30, 50, 120);
      p.strokeWeight(0);

      drawClouds();
      drawMountains();
      drawTrees();
      drawFlagpole();
      drawGameChar();

      if (!collectable.isFound) drawCollectable();
      if (!flagpole.isReached) checkFlagpole();

      p.pop();

      // HUD
      p.stroke(0);
      p.textAlign(p.LEFT);
      p.strokeWeight(3);
      p.fill(255);
      p.textSize(32);
      p.text("Score: " + score, 20, 40);

      for (let i = 0; i < lives; i++) {
        drawLifeFace(35 + i * 40, 70);
      }

      // Movement
      if (isLeft) gameChar_x -= speed;
      if (isRight) gameChar_x += speed;

      if (gameChar_y - 10 < floorPos_y) {
        isJumping = false;
        isFalling = true;
        gameChar_y += 1.5;
      } else {
        isFalling = false;
      }

      if (p.dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
        if (!collectable.isFound) {
          score += 1;
          collectable.isFound = true;
        }
      }

      if (
        gameChar_x - 10 > canyon.x_pos &&
        gameChar_x < canyon.x_pos + 10 + canyon.width &&
        gameChar_y >= floorPos_y
      ) {
        isFalling = true;
        gameChar_y += 2;
      }

      if (gameChar_y > p.height) {
        if (lives <= 0) {
          gameOver = true;
          disabled = true;
        } else {
          gameChar_y = p.height;
          isFalling = false;
          disabled = true;
          lives -= 1;
          startGame();
        }
      }

      if (gameOver) {
        p.fill(255);
        p.textSize(32);
        p.textAlign(p.CENTER);
        p.text("Game Over!", p.width / 2, p.height / 2);
      }

      if (flagpole.isReached) {
        p.fill(255);
        p.textSize(32);
        p.textAlign(p.CENTER);
        p.text("You win!", p.width / 2, p.height / 2);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }

      if (
        disabled ||
        (gameChar_y > floorPos_y &&
          gameChar_x > canyon.x_pos &&
          gameChar_x < canyon.x_pos + canyon.width)
      )
        return;

      if (e.key === "ArrowLeft") {
        isLeft = true;
      } else if (e.key === "ArrowRight") {
        isRight = true;
      } else if (e.key === "Shift") {
        speed = 4;
      } else if (e.key === " ") {
        if (!isJumping && !isFalling) {
          isJumping = true;
          isFalling = false;
          gameChar_y -= 100;
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "ArrowLeft") {
        isLeft = false;
      } else if (e.key === "ArrowRight") {
        isRight = false;
      } else if (e.key === "Shift") {
        speed = 2;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    p.remove = () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };

    function drawGameChar() {
      const x = gameChar_x;
      const y = gameChar_y;

      p.fill("#ffe68f");
      p.noStroke();
      // face
      p.ellipse(x, y - 45, 30, 30);
      p.triangle(x - 15, y - 45, x + 10, y - 55, x - 15, y - 65);
      p.triangle(x + 15, y - 45, x - 10, y - 55, x + 15, y - 65);

      // legs — vary by state
      p.stroke(80);
      p.strokeWeight(3);
      if (isLeft && isFalling) {
        p.line(x - 5, y - 22, x - 8, y - 12);
        p.line(x + 5, y - 22, x + 7, y - 6);
      } else if (isRight && isFalling) {
        p.line(x - 5, y - 22, x - 7, y - 6);
        p.line(x + 5, y - 22, x + 8, y - 12);
      } else if (isLeft) {
        p.line(x - 5, y - 22, x - 8, y - 12);
        p.line(x + 5, y - 22, x + 5, y - 10);
      } else if (isRight) {
        p.line(x - 5, y - 22, x - 5, y - 10);
        p.line(x + 5, y - 22, x + 8, y - 12);
      } else if (isFalling) {
        p.line(x - 5, y - 22, x - 8, y - 10);
        p.line(x + 5, y - 22, x + 8, y - 10);
      } else {
        p.line(x - 5, y - 22, x - 5, y - 10);
        p.line(x + 5, y - 22, x + 5, y - 10);
      }
      p.noStroke();

      // body
      p.fill("#ffe68f");
      p.ellipse(x, y - 35, 20, 35);

      // leaf
      p.fill("#27e40b");
      p.ellipse(x, y - 60, 8, 6);

      // cheeks
      const leftOffset =
        isLeft || (isLeft && isFalling) ? -12 : isRight || (isRight && isFalling) ? -8 : -10;
      const rightOffset =
        isLeft || (isLeft && isFalling) ? 8 : isRight || (isRight && isFalling) ? 12 : 10;
      p.fill("#ffd79f");
      p.ellipse(x + leftOffset, y - 42, 6, 4);
      p.ellipse(x + rightOffset, y - 42, 6, 4);

      // antennae
      p.fill("#ffcd50");
      p.stroke("#ffcd50");
      p.strokeWeight(2);
      p.line(x + leftOffset, y - 47, x + leftOffset + 5, y - 50);
      p.line(x + rightOffset, y - 47, x + rightOffset - 5, y - 50);

      // mouth
      p.noFill();
      p.angleMode(p.DEGREES);
      const mouthOffset =
        isRight || (isRight && isFalling) ? 4 : isLeft || (isLeft && isFalling) ? -2 : 2;
      const mouthStart = isRight || (isRight && isFalling) ? 80 : 70;
      const mouthEnd = isRight || (isRight && isFalling) ? 120 : 110;
      p.arc(x + mouthOffset, y - 50, 20, 20, mouthStart, mouthEnd);
      p.angleMode(p.RADIANS);
    }

    function drawClouds() {
      for (const cx of clouds_x) {
        p.stroke(255);
        p.strokeWeight(50);
        p.line(cx, 100, cx + clouds_width, 100);
        p.noStroke();
        p.fill(255);
        p.ellipse(cx + 50, 80, clouds_width, 70);
      }
    }

    function drawMountains() {
      for (const mx of mountains_x) {
        p.noStroke();
        p.fill(138, 154, 91);
        p.triangle(mx, 432, mx + 450, 432, mx + 225, 106);
        p.fill(255);
        p.triangle(mx + 177, 174, mx + 225, 106, mx + 269, 169);
      }
    }

    function drawTrees() {
      for (const tx of trees_x) {
        p.noStroke();
        p.fill(192, 64, 0);
        p.rect(tx, treePos_y, 50, 200);
        p.stroke(192, 64, 0);
        p.strokeWeight(15);
        p.line(tx - 33, treePos_y + 62, tx + 15, treePos_y + 100);
        p.line(tx + 15, treePos_y + 100, tx + 104, treePos_y + 60);
        p.fill(34, 139, 34);
        p.noStroke();
        p.ellipse(tx + 30, treePos_y + 10, 200, 100);
        p.ellipse(tx + 30, treePos_y - 25, 150, 100);
      }
    }

    function drawCollectable() {
      p.noStroke();
      p.fill(34, 139, 34);
      p.ellipse(collectable.x_pos, collectable.y_pos, 50, 55);
      p.stroke(2, 48, 32);
      p.strokeWeight(5);
      p.noFill();
      p.angleMode(p.DEGREES);
      p.arc(collectable.x_pos, collectable.y_pos, 40, 40, 120, 240);
      p.arc(collectable.x_pos, collectable.y_pos, 40, 40, 300, 60);
      p.line(collectable.x_pos, collectable.y_pos - 15, collectable.x_pos, collectable.y_pos + 15);
      p.angleMode(p.RADIANS);
    }

    function drawFlagpole() {
      p.stroke(150);
      p.strokeWeight(5);
      p.line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
      p.noStroke();
      p.fill(255, 0, 0);
      if (flagpole.isReached) {
        p.triangle(
          flagpole.x_pos,
          floorPos_y - 250,
          flagpole.x_pos + 50,
          floorPos_y - 225,
          flagpole.x_pos,
          floorPos_y - 200,
        );
      } else {
        p.triangle(
          flagpole.x_pos,
          floorPos_y - 200,
          flagpole.x_pos + 50,
          floorPos_y - 175,
          flagpole.x_pos,
          floorPos_y - 150,
        );
      }
    }

    function checkFlagpole() {
      if (Math.abs(gameChar_x - flagpole.x_pos) < 15) {
        flagpole.isReached = true;
        disabled = true;
      }
    }

    function drawLifeFace(x: number, y: number) {
      p.noStroke();
      p.fill("#ffe68f");
      p.ellipse(x, y, 30, 30);
      p.triangle(x - 15, y, x + 10, y - 10, x - 15, y - 20);
      p.triangle(x + 15, y, x - 10, y - 10, x + 15, y - 20);
      p.noStroke();
      p.fill("#27e40b");
      p.ellipse(x, y - 15, 8, 6);
      p.fill("#ffd79f");
      p.ellipse(x - 10, y + 3, 6, 4);
      p.ellipse(x + 10, y + 3, 6, 4);
      p.fill("#ffcd50");
      p.stroke("#ffcd50");
      p.strokeWeight(2);
      p.line(x - 10, y - 2, x - 5, y - 5);
      p.line(x + 10, y - 2, x + 5, y - 5);
      p.noFill();
      p.angleMode(p.DEGREES);
      p.arc(x + 2, y - 5, 20, 20, 80, 120);
      p.angleMode(p.RADIANS);
    }
  };

  new p5(sketch);
}
