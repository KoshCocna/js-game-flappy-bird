var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var base = new Image();
var pipeup = new Image();
var pipebottom = new Image();

var wing = new Audio();
var point = new Audio(); 
var hit = new Audio(); 
var die = new Audio(); 
var swoosh = new Audio(); 

var gap = 100;
var score = 0;

var xPos = 10;
var yPos = 150;
var gravity = 1;

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

bird.src = "imgs/bluebird-midflap.png";
bg.src = "imgs/background-day.png";
base.src = "imgs/base.png";
pipeup.src = "imgs/pipeup-green.png";
pipebottom.src = "imgs/pipebottom-green.png";

wing.src = "audio/wing.wav";
point.src = "audio/point.wav";
hit.src = "audio/hit.wav";
die.src = "audio/die.wav";
swoosh.src = "audio/swoosh.wav";


document.addEventListener("keydown", (e) => {
    if (e.key == 'ArrowUp' || e.key == 'w'){
        yPos -= 10;
        wing.play();

    }
    else if(e.key == 'ArrowDown' || e.key == 's'){
        yPos += 10;
        wing.play();
    }
    else if(e.key == 'ArrowRight' || e.key == 'd'){
        xPos += 10;
        wing.play();
    }
    else if(e.key == 'ArrowLeft' || e.key == 'a'){
        xPos -= 10;
        wing.play();
    }
});


function draw(){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bird, xPos, yPos);
    yPos += gravity;
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeup, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipebottom, pipe[i].x, pipeup.height + pipe[i].y + gap);
        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeup.height) - pipeup.height
            });
        }

        if((xPos+bird.width > pipe[i].x && xPos < pipe[i].x+pipeup.width
            &&(yPos < pipe[i].y+pipeup.height || yPos+bird.height > pipe[i].y+pipeup.height+gap)
            )|| yPos+bird.height > cvs.height-base.height){
            die.play();
            // add sth cool 
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            swoosh.play();
            point.play();
        }
    }
    ctx.drawImage(base, 0, cvs.height - base.height);
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("score: " + score, 10, cvs.height-20);
    requestAnimationFrame(draw);
}

bg.onload = draw;        