

//secondway
window.addEventListener("load", () => {
   
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let gradient = ctx.createRadialGradient(canvas.width/2,canvas.height/2,100, canvas.width/2, canvas.height/2, 300)
    gradient.addColorStop(0,"red")
    gradient.addColorStop(0.25,"green")
    gradient.addColorStop(0.50,"blue")
    gradient.addColorStop(1,"yellow")


    class Symbol{
        constructor(x,y,fontSize, canvasHeight){
            this.fontSize = fontSize;
            this.canvasHeight = canvasHeight;
            this.x = x,
            this.y = y,
            this.characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
            this.value ="";
        }


        draw(){

            this.value =this.characters[Math.floor(Math.random() * this.characters.length)];
            //ctx.fillStyle = "#03a062";
            ctx.fillStyle = gradient;
            ctx.fillText(this.value, this.x * this.fontSize, this.y * this.fontSize);
            this.update()
        }


        update(){
            if((this.y * this.fontSize >= this.canvasHeight && Math.random() > 0.98)){
                this.y =0
            }
            this.y += 1;
        }
    }

    class Effect{
        constructor(canvasWidth,canvasHeight){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.fontSize = 15;
            this.columns = this.canvasWidth/this.fontSize;
            this.symbols = [];
            this.#init();
        }


        #init(){
            for(let i =0; i < this.columns; i++){
                let symbol = new Symbol(i, 0, this.fontSize, this.canvasHeight)
                this.symbols.push(symbol)
            }
        }
    }



    let effect = new Effect(canvas.width, canvas.height)

    let lastTime = 0;
    let fps = 15;
    let nextFrame = 1000/fps;
    let timer = 0;

    function animate(timeStamp){

        let timeDiff = timeStamp - lastTime;
        lastTime = timeStamp

        if(timer > nextFrame){
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.fillRect(0,0,canvas.width, canvas.height)
    
            ctx.font = effect.fontSize + "px monospace";
            effect.symbols.forEach(symbol => {
                symbol.draw();
                
            })

            timer = 0;
        }

        else {
            timer += timeDiff
        }
        requestAnimationFrame(animate)
    }

    animate(0);
})







