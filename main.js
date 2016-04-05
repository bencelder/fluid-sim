function initialize(){
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    //c.style.cursor = "none";

    c.width = document.documentElement.clientWidth;;
    c.height = document.documentElement.clientHeight;;

    keys = [];

    paused = -1;

    rows = 60;
    columns = rows * c.width / c.height;

    console.log(columns);

    // initialize velocity and derivs
    vx = init_2D(rows, columns, 0);
    vy = init_2D(rows, columns, 0);

    /*
    dvx = diff_2D(vx, 1, 1);
    dvy = diff_2D(vy, 1, 1);
    ddvx = diff_2D(vx, 1, 2);
    ddvy = diff_2D(vy, 1, 2);
    */

    lastframe = Date.now();
    sim_loop = setInterval( function(){loop()}, 1000);

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

    // compute derivatives

    // draw everything
    draw();

}

function print_2D(a){
    for (var i = 0; i < a.length; i++)
        console.log( a[i] );
}

// differentiates a 2D array
function diff_2D(f, dx, n){
    var rows = f.length;
    var cols = f[0].length;

    var df = [];

    // x is easy
    df.dx = [];
    for (var i = 0; i < rows; i++)
        df.dx[i] = diff(f[i], dx, n);

    // y is harder
    df.dy = init_2D(rows, cols, 0);
    for (var j = 0; j < cols; j++){
        temp = [];
        for (var i = 0; i < rows; i++)
            temp[i] = f[i][j];

        dtemp = diff(temp, dx, n);

        for (var i = 0; i < cols; i++)
            df.dy[i][j] = dtemp[i];
    }
    return df;
}

// initializes a 2D array to val
function init_2D(rows, cols, val){
    var a = [];
    for (var i = 0; i < rows; i++){
        a[i] = [];
        for (var j = 0; j < cols; j++)
            a[i][j] = val;
    }
    return a;
}


function diff(f, dx, n){
    if (n == 1)
        return first_deriv(f, dx);
    if (n == 2)
        return second_deriv(f, dx);
    else
        console.log("Error!  n > 2 on differentiation.");

    function first_deriv(f, dx){
        var N = f.length;

        df = [];
        for (var i = 1; i < N - 1; i++)
            df[i] = (f[i+1] - f[i-1]) / (2. * dx);

        df[0]   = (f[1]   - f[0])   / dx;
        df[N-1] = (f[N-1] - f[N-2]) / dx;

        return df;
    }

    function second_deriv(f, dx){
        var N = f.length;

        df = [];
        for (var i = 1; i < N - 1; i++)
            df[i] = (f[i-1] - 2*f[i] + f[i+1]) / (dx * dx);

        df[0]   = (f[0] - 2*f[1] + f[2]) / (dx * dx);
        df[N-1]   = (f[N - 3] - 2*f[N-2] + f[N - 1]) / (dx * dx);

        return df;
    }
}



function draw(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height);

    // draw the grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var i = .5; i <= c.width; i += c.width / columns){
        ctx.moveTo(i, 0);
        ctx.lineTo(i, c.height);

        if (i <= c.height){
            ctx.moveTo(0, i);
            ctx.lineTo(c.width, i);
        }
    }
    ctx.closePath();
    ctx.stroke();

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

function resize(e){
    c.width = document.documentElement.clientWidth;;
    c.height = document.documentElement.clientHeight;;
}
