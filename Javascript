document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground-moving');
    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 3;
    let isGameOver = false;
    let gap = 430;
    let score = 0; // Initialize the score
    
    const message = new SpeechSynthesisUtterance();
    
    // set the text to be spoken
    message.text = " baby come down "
    // create an instance of the speech synthesis object
    const speechSynthesis = window.speechSynthesis;

    // start speaking
    speechSynthesis.speak(message);    

    function startGame() {
        if (!isGameOver) {
            birdBottom -= gravity;
            bird.style.bottom = birdBottom + 'px';
            bird.style.left = birdLeft + 'px';
        }
    }

    let gameTimerId = setInterval(startGame, 40);

    function control(e) {
        if (e.keyCode === 32 && !isGameOver) {
            jump();
        } else if (e.keyCode === 37 && !isGameOver) {
            moveLeft();
        } else if (e.keyCode === 39 && !isGameOver) {
            moveRight();
        }
    }

    function moveLeft() {
        if (birdLeft > 0) birdLeft -= 20;
        bird.style.left = birdLeft + 'px';
    }

    function moveRight() {
        if (birdLeft < gameDisplay.clientWidth - bird.clientWidth) {
            birdLeft += 20;
            bird.style.left = birdLeft + 'px';
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 200;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            if (!isGameOver) {
                obstacleLeft -= 2;
                obstacle.style.left = obstacleLeft + 'px';
                topObstacle.style.left = obstacleLeft + 'px';

                if (obstacleLeft === -60) {
                    clearInterval(timerId);
                    gameDisplay.removeChild(obstacle);
                    gameDisplay.removeChild(topObstacle);
                    score++; // Increment the score
                }
                if (
                    (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                    (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)) ||
                    birdBottom === 0 
                ) {
                    gameOver();
                    clearInterval(timerId);
                }
            }
        }

        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    
    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        ground.classList.add('ground');
        ground.classList.remove('ground-moving');

// Display the score card
        const scoreCard = document.createElement('div');
        scoreCard.classList.add('score-card');
        scoreCard.textContent = 'Game Over! Your Score: ' + score;
        gameDisplay.appendChild(scoreCard);

    }
});
