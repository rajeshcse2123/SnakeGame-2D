var boxSize = 25;
var row = 25;
var col = 25;
var board;
var context;
var gameOver = false; //game over variable
var sound;
var soundCounter = 0; //for game over

// snake coordinate
var snakeX = boxSize * 5;
var snakeY = boxSize * 5;

// snake body
var snakeBody = [];

//velocity
var velocityX = 0;
var velocityY = 0;

//food
var foodX;
var foodY;
var foodColor = ['red' , 'yellow' , 'blue' , 'orange' , 'white' , 'violet'];

// score
var score = 0;
var sc = document.querySelector(".score");

window.onload = function () {
    board = document.getElementById("canvas");
    console.log(board);
    board.height = row * boxSize;
    board.width = col * boxSize;
    context = board.getContext("2d"); //use to draw board

    $("body").keyup(direction);
    foodPlace();
    setInterval(update, 2000 / 10); //200 millisecond

    $(".play").click(function(){
        $(".start").addClass("hidden");
        $(".main").addClass("hidden");
    })
}

function update() {
    sc.innerHTML = 'SCORE : ' + score;

    if(gameOver){
        scoreCArd();
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = foodColor[score%foodColor.length];
    context.fillRect(foodX, foodY, boxSize, boxSize);

    context.fillStyle = 'lime'
    context.fillRect(snakeX, snakeY, boxSize, boxSize);

    // changing snake position
    snakeX += velocityX * boxSize;
    snakeY += velocityY * boxSize;

    //consuming food
    if ((foodX === snakeX) && (foodY === snakeY)) {
        sound = new Audio('/blue.mp3');
        sound.play();
        score++;
        snakeBody.push([foodX , foodY]);
        foodPlace();
    }

    for(i=snakeBody.length-1 ; i>0 ; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    for(var i=0 ; i<snakeBody.length ; i++){
        if(i == 0){
            context.fillStyle = 'lime'
        } else{
            context.fillStyle = foodColor[(score-1) % foodColor.length];
        }
        context.fillRect(snakeBody[i][0] , snakeBody[i][1] , boxSize , boxSize);
    }

    // game over conditions
    if((snakeX < 0)||(snakeY < 0)||(snakeX > col*boxSize)||snakeY > row*boxSize){
        gameOver = true;
    }

    for(i=1 ; i<snakeBody.length;i++){
        if((snakeX == snakeBody[i][0])&&(snakeY == snakeBody[i][1])){
            gameOver = true;
        }
    }
}

function foodPlace() {
    foodX = Math.floor(Math.random() * col) * boxSize;
    foodY = Math.floor(Math.random() * row) * boxSize;
}

function direction(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (velocityY != 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case 'ArrowDown':
            if (velocityY != -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case 'ArrowLeft':
            if (velocityX != 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case 'ArrowRight':
            if (velocityX != -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
}

function scoreCArd(){
    if(soundCounter == 0){
        sound = new Audio('/wrong.mp3');
        sound.play();
        soundCounter++;
    }
    document.querySelector(".fScore").innerHTML = "SCORE : " + score;
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".gameOver").classList.remove("hidden");
    
    // playAgain 
    document.querySelector("button").addEventListener("click", function(){
        snakeBody = [];
        score = velocityX = velocityY = 0;
        snakeX = snakeY = boxSize * 5;
        gameOver = false; 
        update();
        soundCounter = 0;
        document.querySelector(".main").classList.add("hidden");
        document.querySelector(".gameOver").classList.add("hidden");gameOver = false;
    });
}