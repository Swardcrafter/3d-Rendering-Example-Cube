const background_color = '#cccccc';

var canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext("2d");


// Set 0, 0
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

ctx.fillStyle = background_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);


const cube = new Cube([canvas.width/2, canvas.height/2, -100], 50);

function render() {
    // Clear the canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render the background
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render the cube
    cube.Render();
}

// Set the interval to achieve 60fps
setInterval(render, 1000 / 60); // 1000ms divided by 60fps gives the interval in milliseconds