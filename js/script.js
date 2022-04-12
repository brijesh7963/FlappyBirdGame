let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let fire1 = document.getElementById("fire1");
let fire2 = document.getElementById("fire2");

//setting the background
cvs.style.backgroundColor = "skyblue";

//loading the image
let sprite = new Image();
sprite.src = "./images/sprite.png";

let cricket = new Image();
cricket.src = "./images/cricket.png";

//load sound
let flap = new Audio("./audio/flap.wav");
let point = new Audio("./audio/point.wav");
let hit = new Audio("./audio/hit.wav");
let die = new Audio("./audio/die.wav");
let swooshing = new Audio("./audio/swooshing.wav");

//variable dec
let frames = 0;

//state object
const state =
{
    current: 0,
    getReady: 0,
    game: 1,
    gameOver: 2,
}
cvs.addEventListener("click", (event) => {
    switch (state.current) //switch case
    {
        case state.getReady: state.current = state.game;
            swooshing.play();
            break;
        case state.game: bird.move();
            flap.play();
            break;
        case state.gameOver:
            //setting start position
            let cvsposition = cvs.getBoundingClientRect();
            let clickX = event.clientX - cvsposition.left;
            let clickY = event.clientY - cvsposition.top;
            if (clickX > startbtn.x && clickX < startbtn.x + startbtn.w && clickY > startbtn.y && clickY < startbtn.y + startbtn.h) {
                state.current = state.getReady;
                pipes.reset();
                ball.reset();
                score.reset();
            }
            break;
    }
})

//startbtn object
const startbtn =
{
    x: 720,
    y: 373,
    w: 83,
    h: 29
}

//get ready object
const getReady =
{
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width / 2 - (173 / 2),
    y: 200,
    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            fire1.style.display = "none";
            fire2.style.display = "none";
        }
    }
}

//gameOver object
const gameOver =
{
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width / 2 - (225 / 2),
    y: 200,
    draw: function () {
        if (state.current == state.gameOver) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            fire1.style.display = "block";
            fire2.style.display = "block";
        }
    }
}

//cloud object
let cloud =
{
    sX: 0,
    sY: 0,
    w: 275,
    h: 220,
    x: 0,
    y: cvs.height - 220,
    draw: function () {
        //value put source to destination
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 1 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 2 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 3 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 4 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 5 * (this.w), this.y, this.w, this.h);

    }
}

let ground =
{
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,
    dx: 3, //for moving ground
    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 1 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 2 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 3 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 4 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 5 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 6 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 7 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 8 * (this.w), this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + 9 * (this.w), this.y, this.w, this.h);
    },
    update: function () {
        if (state.current == state.game) {
            this.x -= this.dx;
            if (this.x % 112 == 0) {
                this.x = 0;
            }
        }
    }
}

const bird =
{
    animation:
        [
            { sX: 276, sY: 112 },  //bird position in source image open in paint
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
            { sX: 276, sY: 139 },
        ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,
    frame: 0,
    period: 8,
    speed: 0,
    gravity: 0.10,
    jump: 2,
    radius: 13,
    draw: function () {
        let bird = this.animation[this.frame];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    },
    update: function () {
        this.period = state.current == state.getReady ? 10 : 5;
        //for flapping the bird
        this.frame += frames % this.period == 0 ? 1 : 0;
        //Reset the frames
        this.frame = this.frame % this.animation.length;
        //gravity
        if (state.current == state.getReady) {
            this.y = 150;
        }
        else {
            this.y = this.y + this.speed;
            this.speed = this.speed + this.gravity;

        }
        if (this.y + this.h / 2 >= cvs.height - ground.h) {
            this.speed = 0;
            this.frame = 0;
            if (state.current == state.game) {
                state.current = state.gameOver;
                die.play();
            }
        }

    },
    move: function () {
        this.speed = -this.jump;

    }
}

//pipe object
const pipes =
{
    position: [],
    top: {
        sX: 553,
        sY: 0,
    },
    bottom: {
        sX: 502,
        sY: 0
    },
    w: 53,
    h: 400,
    gap: 120,
    maxYPos: -150,
    dx: 3,
    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topYpos = p.y;
            let bottomYpos = p.y + this.h + this.gap;

            //top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYpos, this.w, this.h);

            //bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYpos, this.w, this.h);
        }

    },
    update: function () {
        if (state.current !== state.game) {
            return;
        }
        if (frames % 100 == 0) {
            this.position.push({
                x: cvs.width,
                y: this.maxYPos * (Math.random() + 1)
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            p.x = p.x - this.dx;

            //for removing the pipes from the array
            if (p.x + this.w <= 0) {
                this.position.shift();
                //increment the score
                point.play();
                score.value = score.value + 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }

            //collision with the pipes of bird
            //for top pipe
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                hit.play();
                state.current = state.gameOver;
            }

            //for bottom pipe
            let tobp = p.y + this.h + this.gap;
            let bobp = p.y + this.h + this.gap + this.h;

            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > tobp && bird.y - bird.radius < bobp) {
                hit.play();
                state.current = state.gameOver;
            }
        }


    },
    reset: function () {
        this.position = [];
    }
}

//ball object
const ball =
{
    ball_position: [],
    w: 30,
    h: 30,
    sX: 0,
    sY: 0,
    dx: 4,
    draw: function () {
        for (let i = 0; i < this.ball_position.length; i++) {
            let p = this.ball_position[i];
            ctx.drawImage(cricket, this.sX, this.sY, 2000, 2000, p.x, p.y, this.w, this.h)
        }
    },
    update: function () {
        if (state.current !== state.game) {
            return;
        }
        if (frames % 100 == 0) {
            this.ball_position.push(
                {
                    x: cvs.width,
                    y: Math.random() * 400
                }
            );

        }
        for (let i = 0; i < this.ball_position.length; i++) {
            let p = this.ball_position[i];
            p.x = p.x - this.dx;
            if (p.x + this.w <= 0) {
                this.ball_position.shift();
            }
            //collision
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                hit.play();
                state.current = state.gameOver;
            }
        }
    },
    reset: function () {
        this.ball_position = [];
    }
}

//score object
const score =
{
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,
    draw: function () {
        ctx.fillStyle = "#000000";
        if (state.current == state.game) {
            ctx.font = "50px teko";
            ctx.fillText(this.value, cvs.width / 2, 100);
        }
        else if (state.current == state.gameOver) {
            ctx.font = "30px teko";
            ctx.fillText(this.value, cvs.width / 2 + 65, 300);

            ctx.font = "30px teko";
            ctx.fillText(this.best, cvs.width / 2 + 65, 340);
        }
    },
    reset: function () {
        this.value = 0;
    }
}

//For Drawing
function draw() {
    //set bg color
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    cloud.draw();
    pipes.draw();
    ball.draw();
    ground.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

//update 
function update() {
    ground.update();
    bird.update();
    pipes.update();
    ball.update();

}
//loop function
function loop() {
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
}
loop();