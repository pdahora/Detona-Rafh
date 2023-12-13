const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        inimigo: document.querySelector(".inimigo"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesDisplay: document.querySelector("#lives"), 
    },
    values: {
        gameVelocity: 2000,
        hitPosition: 0,
        result: 0,
        curretTime: 40,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        tempoBaixandoTimerId: setInterval(tempoBaixando,1000),
    }
};

function tempoBaixando(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    
    if(state.values.curretTime <= 0 || state.values.lives <=0){
        clearInterval(state.actions.tempoBaixandoTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }

}

function playSound(){
    let audio = new Audio('./audio/hit.m4a');
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("inimigo");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("inimigo");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
            else {
                if (state.values.lives > 0) {
                    state.values.lives--;
                    state.view.livesDisplay.textContent = state.values.lives;
                }
                if (state.values.lives <= 0) {
                    clearInterval(state.actions.tempoBaixandoTimerId);
                    clearInterval(state.actions.timerId);
                    alert("Game Over! Seu resultado foi: " + state.values.result);
                }
            }
        });
    });
}

function initialize() {

    addListenerHitBox();
    state.view.livesDisplay.textContent = state.values.lives;
}
initialize();