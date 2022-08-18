const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particleArray = [];
let hue = 0;

const _settings = {
    particleNo: 10
}
function resize(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

//----initial functions --------//
window.onresize = resize;

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("click", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    particleInit();
})

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    particleInit();
})


class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random()* 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5; 
        this.color =  `hsl(${hue}, 100%, 50%)`;
    }

    draw(){
        //ctx.strokeStyle = 'red';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }

    update(){
        if(this.size > 0.2){
            this.size -= 0.1
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }
}



function particleInit(){
    for(let i =0; i < _settings.particleNo; i++){
        particleArray.push(new Particle())
    }
}


function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x1,y1);
    ctx.lineTo(x2,y2);
    //ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.stroke();
    ctx.closePath();
}

function particleDraw(){
    for(let i =0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();

        removing the particle from the particle array
        checking against other circles
        for(j = i ; j < particleArray.length; j++){
            let dx = particleArray[i].x - particleArray[j].x;
            let dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt((dx * dx) + (dy * dy));
            if(distance < 50){
                drawLine(particleArray[i].x, particleArray[i].y, particleArray[j].x, particleArray[j].y)
            }
        }

        if(particleArray[i].size <= 0.2){
            const removedParticle = particleArray.splice(i, 1);
            i--;
        }



    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.002)"
    // ctx.fillRect(0,0, canvas.width, canvas.height)
    particleDraw();
    window.requestAnimationFrame(animate);
    hue+= 10
}


window.addEventListener("load", () => {
    resize();
    particleInit();
    animate();
})