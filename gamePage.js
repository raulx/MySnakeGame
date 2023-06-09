// gameSpeed variable sets the number of times screen re-renders perSecond
let gameSpeed = 2;
let prevTime = 0;
let score = document.getElementById('score')
let currentScore = 0
let innerLoop;
// snake setup 
const gameBoard = document.getElementById('game-board')
const allButton = document.querySelectorAll('.btn')
let snakeBody = [{x:11,y:11}]
let snakeHead = snakeBody[0]
let snakeHeadControl = {x:0,y:0}
let foodLocation = {x:5,y:5}
const soundButton = document.getElementById('volume');
const backgroundMusic = new Audio('/gameAudio/sound6.mp3')
const clickSound = new Audio('gameAudio/click2.mp3')
const foodCollisionSound = new Audio('gameAudio/click4.mp3')
const wallCollisionSound = new Audio('gameAudio/crash3.mp3')
let playSound = true;



soundButton.addEventListener('click',()=>{
    playSound = !playSound
    let soundIcon = playSound?'fa-volume-high':'fa-volume-xmark'
    soundButton.innerHTML = ''
    let newSoundIcon = document.createElement('i')
    newSoundIcon.classList.add('fa-solid')
    newSoundIcon.classList.add(soundIcon)
    soundButton.appendChild(newSoundIcon)
})

allButton.forEach((button)=>{
    button.addEventListener('click',function(event){
       
        clickSound.play()
        playSound?backgroundMusic.play():backgroundMusic.pause()
        const clickButton = event.target.innerHTML
        if(clickButton === 'Up'){
            if(snakeHeadControl.y === 1){
                return
            }
            else{
                snakeHeadControl.y = -1;
                snakeHeadControl.x = 0;
            }
            
        }
        if(clickButton === 'Down'){
            if(snakeHeadControl.y === -1){
                return
            }
            else{
                snakeHeadControl.y = 1;
                snakeHeadControl.x = 0;
            }
            
        }
        if(clickButton === 'Left'){
            if(snakeHeadControl.x === 1){
                return
            }
            else{
                snakeHeadControl.x = -1;
                snakeHeadControl.y = 0;
            }
            
        }
        if(clickButton === 'Right'){
            if(snakeHeadControl.x === -1){
                return
            }
            else{
                snakeHeadControl.x = 1;
                snakeHeadControl.y = 0;
            }
            
        }
    })
})
function createfood(){
  
    const newFood = document.createElement('div')
    newFood.classList.add('food')
    newFood.style.gridColumnStart = foodLocation.x;
    newFood.style.gridRowStart = foodLocation.y;
    gameBoard.appendChild(newFood);
}
function checkFoodCollision(){
    if(snakeHead.x === foodLocation.x && snakeHead.y === foodLocation.y){
        let randomXlocation = Math.floor((Math.random()*21) + 1);
        let randomYlocation = Math.floor((Math.random()*21) + 1);
        let snakeLastSegment = snakeBody[snakeBody.length - 1]
        
        foodLocation.x = randomXlocation;
        foodLocation.y = randomYlocation;
        currentScore += 1
        gameSpeed += 0.25
        score.innerText = currentScore
        foodCollisionSound.play()
        snakeBody.push(snakeLastSegment)
    }
}
function checkBodyCollision(){
    let isCollided = false;
    for(let i=2;i<snakeBody.length;i++){
        if((snakeBody[i].x === snakeHead.x) && (snakeBody[i].y === snakeHead.y)){
            isCollided = true
        }
    }
    if(isCollided){
        backgroundMusic.pause()
        wallCollisionSound.play()
        alert('you hit the wall')

        window.cancelAnimationFrame(gameLoop)
        window.cancelAnimationFrame(innerLoop)
        window.location.reload() 
    }
}
function drawSnake(){
    snakeBody.forEach((snakeSegment)=>{
        const segment = document.createElement('div');
        segment.classList.add('snake')
        segment.style.gridColumnStart = snakeSegment.x;
        segment.style.gridRowStart = snakeSegment.y;
        gameBoard.appendChild(segment)
    })
    gameBoard.firstElementChild.classList.add('snake-head')

}
function checkWallCollision(){
    let snakeHeadXposition = snakeHead.x;
    let snakeHeadYposition = snakeHead.y;

    if(snakeHeadXposition < 1 || snakeHeadXposition> 21){
        backgroundMusic.pause()
        wallCollisionSound.play()
        alert('you hit the wall')

        window.cancelAnimationFrame(gameLoop)
        window.cancelAnimationFrame(innerLoop)
        window.location.reload()    
    }
    if(snakeHeadYposition < 1 || snakeHeadYposition> 21){
        backgroundMusic.pause()
        wallCollisionSound.play()
        alert('you hit the wall')
        window.cancelAnimationFrame(gameLoop)
        window.cancelAnimationFrame(innerLoop) 
        window.location.reload()   
    }
}
function updateSnake(){
   
    for(let i=snakeBody.length - 2;i>=0;i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }
    
    snakeHead.x += snakeHeadControl.x
    snakeHead.y += snakeHeadControl.y
    gameBoard.innerHTML=''
}

document.addEventListener('keydown',function(e){
    clickSound.play()
})

document.addEventListener('keydown',function(e){
 
    playSound?backgroundMusic.play():backgroundMusic.pause()
    let keyPressed = e.key;
    if(keyPressed === 'ArrowUp'){
        if(snakeHeadControl.y === 1){
            return
        }
        else{
            snakeHeadControl.y = -1;
            snakeHeadControl.x = 0;
        }
        
    }
    if(keyPressed === 'ArrowDown'){
        if(snakeHeadControl.y === -1){
            return
        }
        else{
            snakeHeadControl.y = 1;
            snakeHeadControl.x = 0;
        }
        
    }
    if(keyPressed === 'ArrowLeft'){
        if(snakeHeadControl.x === 1){
            return
        }
        else{
            snakeHeadControl.x = -1;
            snakeHeadControl.y = 0;
        }
        
    }
    if(keyPressed === 'ArrowRight'){
        if(snakeHeadControl.x === -1){
            return
        }
        else{
            snakeHeadControl.x = 1;
            snakeHeadControl.y = 0;
        }
        
    }
})


// createfood()

// game-loop code 


let gameisRunning = true
function main(currentTime){
    innerLoop = window.requestAnimationFrame(main);
    // dividing by 1000 because it is in miliseconds
    let frameGap = (currentTime - prevTime)/1000
    let animationSpeed = 1/(gameSpeed)
    if(frameGap<animationSpeed)return;
    prevTime = currentTime
    updateSnake()
    drawSnake()
    checkWallCollision()
    checkFoodCollision()
    checkBodyCollision()
    createfood()
}
let gameLoop = window.requestAnimationFrame(main)