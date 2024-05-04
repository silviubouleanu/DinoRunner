const dino = document.querySelector('.dino');
const grid = document.querySelector('.grid');
const alert = document.getElementById('alert');
const JUMP_COUNT = 15;
const OBSTACLE_DISTANCE = 60;
const JUMP_INCREMENT = 30;
let isJumping = false;
let gravity = 0.9;
let position = 0;
let isGameOver = false;
let score = 0;
let hiScore = 0;

function control(e) {
    if (e.keyCode === 32) { // the ASCII code for the space key is 32
        console.log("jump");
        if (!isJumping && !isGameOver) {
            isJumping = true;
            jump();
        }
    }
}

document.addEventListener('keypress', control);

function jump() {
    let count = 0;
    let timerID = setInterval(function () {
        if (count === JUMP_COUNT) {
            clearInterval(timerID);
            let downTimerID = setInterval(function () {
                if (count === 0) {
                    clearInterval(downTimerID);
                    isJumping = false;
                }
                position -= 4.8;
                --count;
                position = position * gravity;
                if (position < 0) position = 0;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        ++count;
        position += JUMP_INCREMENT;
        position = position * gravity;
        dino.style.bottom = position + 'px';
    }, 20);
}

function generateObstacle() {
    let randomTime = Math.random() * 4000;
    let obstaclePosition = 1000;
    const obstacle = document.createElement('div');
    if (!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px';
    let timerID = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < OBSTACLE_DISTANCE && position < OBSTACLE_DISTANCE) {
            clearInterval(timerID);
            alert.innerHTML = 'GAME OVER';
            isGameOver = true;
        }
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
        if (obstaclePosition == 0) {
            if (!isGameOver) {
                score++;
                if (score > hiScore) hiScore = score;
                alert.innerHTML = score;
            }
        }
    }, 20);

    if (!isGameOver) setTimeout(generateObstacle, randomTime);
}

generateObstacle();
