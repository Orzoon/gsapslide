
window.addEventListener("load", () => {
    // starting with setup
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const numberChar = [0,1,2,3,4,5,6,7,8,9]
    let characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].concat(numberChar);
    characters = [0,1]
    let symbolSize = 20;
    let speed = 1;
    let frameCount = 0;
    
    let noOfStreams, streamArray = [];



    const controlValues = {
        symbolSize: 20
    }

    const gui = new dat.GUI()


    gui.add(controlValues, "symbolSize", 20, 30).onFinishChange(setup)
    setup();
    draw();
    window.addEventListener("resize", setup)
    function setup(cb){
        // emptying the array  
        streamArray = []
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        noOfStreams = Math.floor(canvas.width/symbolSize);
        console.log("noofStreams", noOfStreams);
        for(let i = 0; i < noOfStreams; i++){
            let newStream = new Stream(i * controlValues.symbolSize)
            //newStream.generateSymbols();
            streamArray.push(newStream)
        }
        // global context font-size
        ctx.font = `${controlValues.symbolSize}px monospace`
        // draw
    
    }

    function drawStreamArray(){
        let length = streamArray.length;
        for(let i = 0 ; i < length; i ++){
            streamArray[i].drawStream();
        }
    }


    function draw(){
        //ctx.clearRect(0,0,canvas.widh, canvas.height)
        ctx.fillStyle = "rgba(0,0,0,1)"
        ctx.fillRect(0,0,canvas.width, canvas.height);
        drawStreamArray();
        frameCount++
        requestAnimationFrame(draw)
    }



    // matrix Symbol
    function Symbol (x, y, speed, firstBool){
        this.firstBool = firstBool ? Math.round(Math.random()) : 0;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.value = characters[Math.floor(Math.random() * characters.length)];
        this.switchInterval = 30.5;

        this.setToRandomSymbol = () => {
            if(frameCount % this.switchInterval === 0){
                this.value = characters[Math.floor(Math.random() * characters.length)];
            }
        }
        
        this.drawSymbol=  () => {

            if(this.firstBool){
                ctx.fillStyle= "white";
                ctx.textAlign = "centre";
                ctx.fillText(this.value,this.x, this.y);
                console.log("this.symbolSpeed", this.speed)
            }
            else{
                ctx.fillStyle= "green";
                ctx.fillText(this.value,this.x, this.y);
            }
            this.update();
            this.setToRandomSymbol();
        }

        this.update = () => {
            this.y += speed;
            if(this.y >= canvas.height){
                this.y = 0;
            }     
        }

       
    }


    function Stream(xPos){
        this.topPos;
        this.xPos = xPos;
        this.symbols = []
        this.totalSymbols = Math.floor(Math.random() *10 + 4)
        this.speed = Math.floor(1);
        this.generateSymbols = () => {
            let y = Math.floor(Math.random() * - (canvas.height * 0.4))
            let x = this.xPos;
            for(let i = 0; i < this.totalSymbols; i ++){
                symbol = new Symbol(this.xPos, y - (i * controlValues.symbolSize), this.speed, i === 0  ? 1  : 0)
                this.symbols.push(symbol)
            }
            
        },

        this.drawStream = () => {
            for(let i = 0 ; i < this.totalSymbols; i ++){
                this.symbols[i].drawSymbol();
            }
        
        }
        this.generateSymbols();

    }



})
