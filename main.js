function initialize(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    c.style.cursor = "none";

    paused = -1;

    // init vx and vy
    rows = 10;
    columns = 10;

    vx = [];
    vy = [];
    for (var i = 0; i < rows; i++){
        vx[i] = [];
        vy[i] = [];
    }

    lastframe = Date.now();
    sim_loop = setInterval( function(){loop()}, 1);
}

function loop(){
    now = Date.now();
    dt = (now - lastframe)/1000;
    lastframe = now;

    // pause
    if (paused == 1){
        draw();
        return;
    }

    // draw everything
    draw();

}

function draw(){
    //ctx.fillStyle = "#002447";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, c.width, c.height);
}


function keyDown(e){
    //alert(e.keyCode);
    kc = e.keyCode;
    keys[kc] = true;

    if (kc == 80)
        paused *= -1;
}

function keyUp(e){
    keys[e.keyCode] = false;
}

function mouseMove(e){
    //cursor.x = e.clientX - c.offsetLeft;
    //cursor.y = e.clientY - c.offsetTop;
}
