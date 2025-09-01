/*

The Game Project

Week 3

Game interaction

*/

// Start

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft = false;
var isRight = false;
var isFalling = false;
var isJumping = false;
var isWalkingLeft = false;
var isWalkingRight = false;
var speed = 2;
var disabled;

var trees_x = [];
var treePos_y;

var clouds_x = [];
var clouds_width;

var mountains_x = [];
var mountains_width;

var cameraPos_X = 0;

var score;
var lives;

var gameOver = false;

function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;

    lives = 3;

    startGame();
}

function startGame()
{
    score = 0;
    disabled = false;
    gameChar_x = width/2;

    // game character was drawn above the floor, so y pos needs additional offset
    gameChar_y = floorPos_y + 10;

    collectable = {
        isFound: false,
        x_pos: 100,
        y_pos: 410,
        size: 50,
    }

    canyon = {
        x_pos: 740,
        y_pos: 432,
        width: 100,
    }

    flagpole = {
        isReached: false,
        x_pos: 2000,
    }

    trees_x = [0, 650, 1000, 1500];
    treePos_y = height/2 - 50;

    clouds_x = [100, 800, 1500];
    clouds_width = 100;

    mountains_x = [0, 1000];
    mountains_width = 0;
}

function draw()
{

    ///////////DRAWING CODE//////////
    // Put the camera in the middle of the game character
    cameraPos_X = gameChar_x - width / 2;

    background(100,155,255); //fill the sky blue


    noStroke();
    fill(0,155,0);
    rect(0, floorPos_y, width, height - floorPos_y);

    push();
    translate(-cameraPos_X, 0);

    //canyon
    noStroke();
    fill(255);
    fill(250, 213, 165);
    rect(canyon.x_pos, canyon.y_pos, canyon.width, 150);
    stroke(0);
    strokeWeight(5);
    rect(canyon.x_pos + (canyon.width / 2), canyon.y_pos + 30, 50, 120);
    strokeWeight(0);

    drawClouds();
    drawMountains();
    drawTrees();
    drawFlagpole();

    //the game character
    if(isLeft && isFalling)
    {
        fill("#ffe68f");
        // face
        ellipse(gameChar_x, (gameChar_y - 45), 30, 30);
        triangle(gameChar_x - 15, gameChar_y - 45, gameChar_x + 10, gameChar_y - 55, gameChar_x - 15, gameChar_y - 65);
        triangle(gameChar_x + 15, gameChar_y - 45, gameChar_x - 10, gameChar_y - 55, gameChar_x + 15, gameChar_y - 65);
        // legs
        stroke(80);
        strokeWeight(3);
        line(gameChar_x - 5, gameChar_y - 22, gameChar_x - 8, gameChar_y - 12);
        line(gameChar_x + 5, gameChar_y - 22, gameChar_x + 7, gameChar_y - 6);
        noStroke();
        // body
        ellipse(gameChar_x, (gameChar_y - 35), 20, 35);
        // leaf
        fill("#27e40b");
        ellipse(gameChar_x, (gameChar_y - 60), 8, 6);
        // features
        fill("#ffd79f");
        ellipse(gameChar_x - 12, (gameChar_y - 42), 6, 4);
        ellipse(gameChar_x + 8, (gameChar_y - 42), 6, 4);
        fill("#ffcd50");
        stroke("#ffcd50");
        strokeWeight(2);
        line(gameChar_x -12, gameChar_y - 47, gameChar_x - 7, gameChar_y - 50);
        line(gameChar_x + 8, gameChar_y - 47, gameChar_x + 3, gameChar_y - 50);
        noFill();
        angleMode(DEGREES);
        arc(gameChar_x - 2, gameChar_y - 5 - 45, 20, 20, 70, 110);
    }
    else if(isRight && isFalling)
    {
        fill("#ffe68f");
        // face
        ellipse(gameChar_x, (gameChar_y - 45), 30, 30);
        triangle(gameChar_x - 15, gameChar_y - 45, gameChar_x + 10, gameChar_y - 55, gameChar_x - 15, gameChar_y - 65);
        triangle(gameChar_x + 15, gameChar_y - 45, gameChar_x - 10, gameChar_y - 55, gameChar_x + 15, gameChar_y - 65);
        // legs
        stroke(80);
        strokeWeight(3);
        line(gameChar_x - 5, gameChar_y - 22, gameChar_x - 7, gameChar_y - 6);
        line(gameChar_x + 5, gameChar_y - 22, gameChar_x + 8, gameChar_y - 12);
        noStroke();
        // body
        ellipse(gameChar_x, (gameChar_y - 35), 20, 35);
        // leaf
        fill("#27e40b");
        ellipse(gameChar_x, (gameChar_y - 60), 8, 6);
        // features
        fill("#ffd79f");
        ellipse(gameChar_x - 8, (gameChar_y - 42), 6, 4);
        ellipse(gameChar_x + 12, (gameChar_y - 42), 6, 4);
        fill("#ffcd50");
        stroke("#ffcd50");
        strokeWeight(2);
        line(gameChar_x - 8, gameChar_y - 47, gameChar_x - 3, gameChar_y - 50);
        line(gameChar_x + 12, gameChar_y - 47, gameChar_x + 7, gameChar_y - 50);
        noFill();
        angleMode(DEGREES);
        arc(gameChar_x + 4, gameChar_y - 5 - 45, 20, 20, 80, 120);
    }
    else if(isLeft)
    {
        fill("#ffe68f");
        // face
        ellipse(gameChar_x, (gameChar_y - 45), 30, 30);
        triangle(gameChar_x - 15, gameChar_y - 45, gameChar_x + 10, gameChar_y - 55, gameChar_x - 15, gameChar_y - 65);
        triangle(gameChar_x + 15, gameChar_y - 45, gameChar_x - 10, gameChar_y - 55, gameChar_x + 15, gameChar_y - 65);
        // legs
        stroke(80);
        strokeWeight(3);
        line(gameChar_x - 5, gameChar_y - 22, gameChar_x - 8, gameChar_y - 12);
        line(gameChar_x + 5, gameChar_y - 22, gameChar_x + 5, gameChar_y - 10);
        noStroke();
        // body
        ellipse(gameChar_x, (gameChar_y - 35), 20, 35);
        // leaf
        fill("#27e40b");
        ellipse(gameChar_x, (gameChar_y - 60), 8, 6);
        // features
        fill("#ffd79f");
        ellipse(gameChar_x - 12, (gameChar_y - 42), 6, 4);
        ellipse(gameChar_x + 8, (gameChar_y - 42), 6, 4);
        fill("#ffcd50");
        stroke("#ffcd50");
        strokeWeight(2);
        line(gameChar_x -12, gameChar_y - 47, gameChar_x - 7, gameChar_y - 50);
        line(gameChar_x + 8, gameChar_y - 47, gameChar_x + 3, gameChar_y - 50);
        noFill();
        angleMode(DEGREES);
        arc(gameChar_x - 2, gameChar_y - 5 - 45, 20, 20, 70, 110);
    }
    else if(isRight)
    {
        fill("#ffe68f");
        // face
        ellipse(gameChar_x, (gameChar_y - 45), 30, 30);
        triangle(gameChar_x - 15, gameChar_y - 45, gameChar_x + 10, gameChar_y - 55, gameChar_x - 15, gameChar_y - 65);
        triangle(gameChar_x + 15, gameChar_y - 45, gameChar_x - 10, gameChar_y - 55, gameChar_x + 15, gameChar_y - 65);
        // legs
        stroke(80);
        strokeWeight(3);
        line(gameChar_x - 5, gameChar_y - 22, gameChar_x - 5, gameChar_y - 10);
        line(gameChar_x + 5, gameChar_y - 22, gameChar_x + 8, gameChar_y - 12);
        noStroke();
        // body
        ellipse(gameChar_x, (gameChar_y - 35), 20, 35);
        // leaf
        fill("#27e40b");
        ellipse(gameChar_x, (gameChar_y - 60), 8, 6);
        // features
        fill("#ffd79f");
        ellipse(gameChar_x - 8, (gameChar_y - 42), 6, 4);
        ellipse(gameChar_x + 12, (gameChar_y - 42), 6, 4);
        fill("#ffcd50");
        stroke("#ffcd50");
        strokeWeight(2);
        line(gameChar_x - 8, gameChar_y - 47, gameChar_x - 3, gameChar_y - 50);
        line(gameChar_x + 12, gameChar_y - 47, gameChar_x + 7, gameChar_y - 50);
        noFill();
        angleMode(DEGREES);
        arc(gameChar_x + 4, gameChar_y - 5 - 45, 20, 20, 80, 120);
    }
    else if(isFalling)
    {
        fill("#ffe68f");
        // face
        ellipse(gameChar_x, (gameChar_y - 45), 30, 30);
        triangle(gameChar_x - 15, gameChar_y - 45, gameChar_x + 10, gameChar_y - 55, gameChar_x - 15, gameChar_y - 65);
        triangle(gameChar_x + 15, gameChar_y - 45, gameChar_x - 10, gameChar_y - 55, gameChar_x + 15, gameChar_y - 65);
        // legs
        stroke(80);
        strokeWeight(3);
        line(gameChar_x - 5, gameChar_y - 22, gameChar_x - 8, gameChar_y - 10);
        line(gameChar_x + 5, gameChar_y - 22, gameChar_x + 8, gameChar_y - 10);
        noStroke();
        // body
        ellipse(gameChar_x, (gameChar_y - 35), 20, 35);
        // leaf
        fill("#27e40b");
        ellipse(gameChar_x, (gameChar_y - 60), 8, 6);
        // features
        fill("#ffd79f");
        ellipse(gameChar_x - 10, (gameChar_y - 42), 6, 4);
        ellipse(gameChar_x + 10, (gameChar_y - 42), 6, 4);
        fill("#ffcd50");
        stroke("#ffcd50");
        strokeWeight(2);
        line(gameChar_x - 10, gameChar_y - 47, gameChar_x - 5, gameChar_y - 50);
        line(gameChar_x + 10, gameChar_y - 47, gameChar_x + 5, gameChar_y - 50);
        noFill();
        angleMode(DEGREES);
        arc(gameChar_x + 2, gameChar_y - 5 - 45, 20, 20, 80, 120);
    }
    else
    {
        fill("#ffe68f");
        // face
        ellipse(gameChar_x, (gameChar_y - 45), 30, 30);
        triangle(gameChar_x - 15, gameChar_y - 45, gameChar_x + 10, gameChar_y - 55, gameChar_x - 15, gameChar_y - 65);
        triangle(gameChar_x + 15, gameChar_y - 45, gameChar_x - 10, gameChar_y - 55, gameChar_x + 15, gameChar_y - 65);	// legs
        stroke(80);
        strokeWeight(3);
        line(gameChar_x - 5, gameChar_y - 22, gameChar_x - 5, gameChar_y - 10);
        line(gameChar_x + 5, gameChar_y - 22, gameChar_x + 5, gameChar_y - 10);
        noStroke();
        // body
        ellipse(gameChar_x, (gameChar_y - 35), 20, 35);
        // leaf
        fill("#27e40b");
        ellipse(gameChar_x, (gameChar_y - 60), 8, 6);
        // features
        fill("#ffd79f");
        ellipse(gameChar_x - 10, (gameChar_y - 42), 6, 4);
        ellipse(gameChar_x + 10, (gameChar_y - 42), 6, 4);
        fill("#ffcd50");
        stroke("#ffcd50");
        strokeWeight(2);
        line(gameChar_x - 10, gameChar_y - 47, gameChar_x - 5, gameChar_y - 50);
        line(gameChar_x + 10, gameChar_y - 47, gameChar_x + 5, gameChar_y - 50);
        noFill();
        angleMode(DEGREES);
        arc(gameChar_x + 2, gameChar_y - 5 - 45, 20, 20, 80, 120);
    }
    if(!collectable.isFound) {
        drawCollectable(collectable);
    }

    if(!flagpole.isReached) {
        checkFlagpole();
    }

    pop();

    stroke(0);
    textAlign(LEFT);
    strokeWeight(3);
    fill(255);
    textSize(32);
    text("Score: " + score, 20, 40);

    for (var i = 0; i < lives; i++) {
        let x = 35 + i * 40;
        let y = 70;
        drawLifeFace(x, y);
    }

    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here

    if(isLeft)
    {
        gameChar_x -= speed;
    }

    if(isRight)
    {
        gameChar_x += speed;
    }

    if(gameChar_y - 10 < floorPos_y) {
        isJumping = false;
        isFalling = true;
        gameChar_y += 1.5;
    } else {
        isFalling = false;
    }

    if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
        if(!collectable.isFound) {
            score += 1;
            collectable.isFound = true;
        }
    }

    if (gameChar_x - 10 > canyon.x_pos && gameChar_x < canyon.x_pos + 10 + canyon.width && gameChar_y >= floorPos_y) {
        isFalling = true;
        gameChar_y += 2;
    }

    if(gameChar_y > height) {
        if(lives <= 0) {
            gameOver = true;
            disabled = true;
        } else {
            gameChar_y = height;
            isFalling = false;
            disabled = true;
            lives -= 1;
            startGame();
        }
    }

    if (gameOver) {
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("Game Over!", width / 2, height / 2);
    }

    if (flagpole.isReached) {
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("You win!", width / 2, height / 2);
        rotateY(PI);
    }
}

function keyPressed()
{
    // if statements to control the animation of the character when
    // keys are pressed.

    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if(disabled || (gameChar_y > floorPos_y &&
        gameChar_x > canyon.x_pos &&
        gameChar_x < canyon.x_pos + canyon.width)) {
        return;
    }

    if(keyCode == 37)
    {
        isLeft = true;
        isWalkingLeft = true;
    }
    else if(keyCode == 39)
    {
        isRight = true;
        isWalkingRight = true;
    }
    else if(keyCode == 16)
    {
        speed = 4;
    }
    else if(keyCode == 32)
    {
        if(!isJumping && !isFalling)
        {
            isJumping = true;
            isFalling = false;
            gameChar_y -= 100;
        }
    }
}

function keyReleased()
{
    // if statements to control the animation of the character when
    // keys are released.
    if(disabled) {
        return;
    }
    if(keyCode == 37) //left arrow key
    {
        isLeft = false;
        isWalkingLeft = false;
    }
    else if(keyCode == 39) //right arrow key
    {
        isRight = false;
        isWalkingRight = false;
    }
    else if(keyCode == 16)
    {
        speed = 2;
    }
}

function drawClouds()
{
    for (var i = 0; i < clouds_x.length; i++) {
        stroke(255);
        strokeWeight(50);
        line(clouds_x[i], 100, clouds_x[i] + clouds_width, 100);
        noStroke();
        fill(255);
        ellipse(clouds_x[i] + 50, 80, clouds_width, 70);
    }
}

function drawMountains()
{
    for (var i = 0; i < mountains_x.length; i++) {
        noStroke();
        fill(138,154,91);
        triangle(mountains_x[i], 432, mountains_x[i] + 450, 432, mountains_x[i] + mountains_width + 225, 106);
        fill(255);
        triangle(mountains_x[i] + 177, 174, mountains_x[i] + 225, 106, mountains_x[i] + mountains_width + 269, 169);
    }
}

function drawTrees()
{
    for (var i = 0; i < trees_x.length; i++) {
        noStroke();
        fill(255);
        fill(192,64,0);
        rect(trees_x[i], treePos_y, 50, 200);
        stroke(192,64,0);
        strokeWeight(15);
        line(trees_x[i] - 33, treePos_y + 62, trees_x[i] + 15, treePos_y + 100);
        line(trees_x[i] + 15, treePos_y + 100, trees_x[i] + 104, treePos_y + 60);
        fill(34,139,34);
        noStroke();
        ellipse(trees_x[i] + 30, treePos_y + 10, 200, 100);
        ellipse(trees_x[i] + 30, treePos_y - 25, 150, 100);
    }
}

function drawCollectable(t_collectable)
{
    noStroke();
    fill(34,139,34);
    ellipse(collectable.x_pos, collectable.y_pos, 50, 55);
    stroke(2,48,32);
    strokeWeight(5);
    noFill();
    angleMode(DEGREES);
    arc(collectable.x_pos, collectable.y_pos, 40, 40, 120, 240);
    arc(collectable.x_pos, collectable.y_pos, 40, 40, 300, 60);
    line(collectable.x_pos, collectable.y_pos - 15, collectable.x_pos, collectable.y_pos + 15);
}

function drawFlagpole()
{
    stroke(150);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    noStroke();
    fill(255,0,0);
    if(flagpole.isReached) {
        triangle(flagpole.x_pos, floorPos_y - 250, flagpole.x_pos + 50, floorPos_y - 225, flagpole.x_pos, floorPos_y - 200);
    } else {
        triangle(flagpole.x_pos, floorPos_y - 200, flagpole.x_pos + 50, floorPos_y - 175, flagpole.x_pos, floorPos_y - 150);
    }
}

function checkFlagpole() {
    if(abs(gameChar_x - flagpole.x_pos) < 15) {
        flagpole.isReached = true;
        disabled = true;
    }
}

function drawLifeFace(x, y) {
    noStroke();
    fill("#ffe68f");
    ellipse(x, y, 30, 30);
    triangle(x - 15, y, x + 10, y - 10, x - 15, y - 20);
    triangle(x + 15, y, x - 10, y - 10, x + 15, y - 20);
    stroke(80);
    strokeWeight(3);
    noStroke();
    fill("#27e40b");
    ellipse(x, y - 15, 8, 6);
    fill("#ffd79f");
    ellipse(x - 10, y + 3, 6, 4);
    ellipse(x + 10, y + 3, 6, 4);
    fill("#ffcd50");
    stroke("#ffcd50");
    strokeWeight(2);
    line(x - 10, y - 2, x - 5, y - 5);
    line(x + 10, y - 2, x + 5, y - 5);
    noFill();
    angleMode(DEGREES);
    arc(x + 2, y + 40 - 45, 20, 20, 80, 120);
}

// End