function init(){
    W = 667;
    H = 667;
    cell_size=66;
    var myCanvas = document.getElementById('myCanvas');
    myCanvas.width = W;
    myCanvas.height = H;
    pen = myCanvas.getContext('2d');



    snake = {
        init_len:5,
        color:"red",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i=this.init_len;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake:function(){
            for(var i= 0;i<this.cells.length;i++){
            pen.fillStyle=this.color;
            pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*cell_size,cell_size-2,cell_size-2);
            }

        },

        updateSnake:function(){
            this.cells.pop();
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;
            var X = headx
            var Y=heady;

            if(this.direction == "right"){
                X++;
            }
            else if(this.direction == "left"){
                X--;
            }
            else if(this.direction == "up"){
                Y--;
            }
            else if(this.direction == "down"){
                Y++;
            }
            this.cells.unshift({x:X,y:Y});
        }
    }
    snake.createSnake();
    function keyPressed(e){
        switch(e.key){
            case "ArrowRight":
                if(snake.direction!="left")
                    snake.direction="right";
                break;

            case "ArrowLeft":
                if(snake.direction!="right")
                    snake.direction="left";
                break;
            case "ArrowDown":
                if(snake.direction!="up")
                    snake.direction="down";
                break;
            case "ArrowUp":
                if(snake.direction!="down")
                    snake.direction="up";
                break;
        }
    }
    document.addEventListener('keydown',keyPressed);
}

function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    
}

function update(){
    snake.updateSnake();
}

init();
function gameLoop(){
    draw();
    update();
}

setInterval(gameLoop,500);
