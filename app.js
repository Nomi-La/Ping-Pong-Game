const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');


const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const MIDDLE_W = WIDTH/2;


const RADIUS = 8
function renderbg () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

function renderBall (x, y) {
    ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.fill();
}
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 85;
const PADDLE_X = 15;
const PADDLE2_X = 670;
let paddleY = 407;
let paddleY2 = 8;

function renderPaddle(y){
    ctx.fillStyle = 'white';
    ctx.fillRect(PADDLE_X, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}
function renderPaddle2(y){
    ctx.fillStyle = 'white';
    ctx.fillRect(PADDLE2_X, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function renderLine (){
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    const X = MIDDLE_W;
    let y = 0;
    while(y < HEIGHT){
        ctx.moveTo(X, y);
        ctx.lineTo(X, y + 10);
        ctx.stroke();
        y += 15;
    }
};

const SCORE_Y = 25;
const SCORE_X = 30;
let s = 0;
let s2 = 0;

function score(){
    ctx.strokeStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText(s, (MIDDLE_W) - SCORE_X, SCORE_Y);
};

function score2(){
    ctx.strokeStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText(s2, (MIDDLE_W) + SCORE_X, SCORE_Y);
};
  

let posx = MIDDLE_W;
let posy = HEIGHT/2;
let posxinit = MIDDLE_W;
let posyinit = HEIGHT/2;
let pressCount = 0;       
let ballActive = false;

let vx = 2;
let vy = -2;

setInterval(() => {
    renderbg();
    renderLine();
    score();
    score2();
    renderBall(posx, posy);
    renderPaddle(paddleY);
    renderPaddle2(paddleY2);
    if(ballActive){
        posx += vx;
        posy += vy;
    };
    
    if(posx+RADIUS === PADDLE2_X && 
        posy > paddleY2 && posy < paddleY2 + PADDLE_HEIGHT){
        vx *= -1;
    }
    if(posx-RADIUS === PADDLE_X + PADDLE_WIDTH && 
        posy > paddleY && posy < paddleY + PADDLE_HEIGHT){
        vx *= -1;
    }
    if(posy+RADIUS === HEIGHT || posy-RADIUS === 0){
        vy *= -1;
    }
    if(posx + RADIUS === 0){
    s2 ++;
    }
    if(posx - RADIUS === WIDTH){
        s ++;
    }
}, 20);

document.addEventListener('keydown', (event) => {
    const {key} = event;
    if(key === 's' && paddleY < (HEIGHT-PADDLE_HEIGHT)){
        paddleY += 20;
    } else if (key === 'w' && paddleY > 0){
        paddleY -= 20;
    };
    if(key === 'ArrowDown' && paddleY2 < (HEIGHT-PADDLE_HEIGHT)){
        paddleY2 += 20;
    } else if (key === 'ArrowUp' && paddleY2 > 0){
        paddleY2 -= 20;
    };
    
    
    if(key === ' '){
        if(((posx + RADIUS < 0 || posx - RADIUS > WIDTH))||
            (posx === posxinit)){
                pressCount++;
                if(pressCount === 1){
                    posx = posxinit;
                    posy = posyinit;
                    ballActive = false;
                }
                if(pressCount === 2){
                    ballActive = true;
                    pressCount = 0;
                }     
        }   
    }        
});

//check if this works