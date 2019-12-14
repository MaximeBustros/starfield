const stars = [];
let speedCoeff = 0;
let context = null;

const init = (numberOfStars, speed) => {
    context = getContext();
    context.canvas.width = context.canvas.offsetWidth;
    context.canvas.height = context.canvas.offsetHeight;
    speedCoeff = speed;
    generateStars(numberOfStars);
    draw();
}

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.sx = 0;
        this.sy = 0;
    }

    update = () => {
        if (this.x < 0 || this.x > canvas.width || this.y < 0|| this.y > canvas.height) {
            this.x = (Math.random() - 0.5) * 2 * canvas.width / 10 + canvas.width / 2;
            this.y = (Math.random() - 0.5) * 2 * canvas.height / 10 + canvas.height / 2;
        } else {
            this.x = this.x + speedCoeff * this.sx / canvas.width;
            this.y = this.y + speedCoeff * this.sy / canvas.width; 
        }
        this.sx = this.x - canvas.width / 2;
        this.sy = this.y - canvas.height / 2;
    }
};

const generateStars = (n) => {
    for (let i = 0; i < n; i++) {
        stars.push(new Star());
    }
}

const drawStar = (star) => {
    context.ctx.beginPath();
    context.ctx.arc(star.x, star.y, 3, 0, 2 * Math.PI);
    context.ctx.stroke();
    context.ctx.fill();
}

const getContext = () => {
    return {
        canvas: document.getElementById('canvas'),
        ctx: canvas.getContext('2d')
    }
}

const draw = () => {
    const context = getContext();
    context.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    context.ctx.fillStyle = 'white';
    stars.forEach(star => {
        drawStar(star);
        star.update();
    });
    window.requestAnimationFrame(draw);
}

const NUMBER_OF_STARS = 200;
const SPEED = 40;
init(NUMBER_OF_STARS, SPEED);
