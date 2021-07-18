const W = 801;
const H = 801;
const cell_size=66;
var game_over = false;
var score = 2;
var myCanvas = document.getElementById('myCanvas');
myCanvas.width = W;
myCanvas.height = H;
pen = myCanvas.getContext('2d');

function Food(){
    var fx = Math.round(Math.random()*(W-cell_size)/cell_size);
    var fy = Math.round(Math.random()*(H-cell_size)/cell_size);
    var food_img = new Image();
    food_img.src = "Assets/apple.png";
    var food = {
        x:fx,
        y:fy,
        img:food_img
    }
    return food;
}



var food = Food();

function init(){
    snake = {
        init_len:1,
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
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;

            if(headx == food.x && heady == food.y){
                score+=1;
                food = Food();
            }
            else{
                this.cells.pop();
            }
            
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

            var lastx = Math.round(W/cell_size);
            var lasty = Math.round(H/cell_size);

            if(headx<0 || heady<0 || headx>lastx || heady>lasty){
                game_over=true;
            }
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

    pen.fillStyle = food.color;
    pen.drawImage(food.img,food.x*cell_size,food.y*cell_size,cell_size,cell_size);

    pen.fillStyle="blue";
    pen.font = "20px Roboto";
    pen.fillText("Your Score is : "+score,50,50);

}

function update(){
    snake.updateSnake();
}

init();
function gameLoop(){
    if(game_over == true){
        clearInterval(f);
        alert("game over");
    }
    draw();
    update();
}

var f = setInterval(gameLoop,200);
