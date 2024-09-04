let gameSeq = [];
let userSeq = [];
let highestScore = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let p = document.querySelector("p");

document.addEventListener("onclick", function () {
    if(!started) {
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    p.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length)
            setTimeout(levelUp, 1000);
    } else {
        highestScore.push(level);
        highestScore.sort((a, b) => a - b);
        p.innerHTML = `Game over! Your highest score is <b>${highestScore[highestScore.length - 1]}<b/><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "transparent";
        }, 200);
        reset();
    }
}

function btnPress() {
    if(started) {
        let btn = this;
        btnFlash(btn);

        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        checkAns(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".main-btn");

for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
