/* wss://3d-render-server.saturnwillow.repl.co/echo */
let render_objects = [];

function main() {
    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");
    const background_color = '#cccccc';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set 0, 0
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);

    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    render_objects = [];

    // Set the interval to achieve 60fps
    setInterval(render, 1000 / 60); // 1000ms divided by 60fps gives the interval in milliseconds
}

function render() {
    const background_color = '#cccccc';

    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render the background
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(object of render_objects) {
        object.Render();
    }
}

document.addEventListener('keydown', (event) => {
    if(event.key == 'j') {
        const canvas = document.getElementById("main-canvas");
        const ctx = canvas.getContext("2d");

        const object = prompt('Object?');
        let object_center = prompt('Object center?');
        let object_size = prompt('Object size?');
        let object_dotStyle = prompt('Object dot style?');

        // new Cube([500, 500, 500], 100, 'circ')

        const obj_class = eval(object);

        if(object_center == '') {
            object_center = [canvas.width/2, canvas.height/2, -100];
        } else {
            object_center = object_center.split(', ').map(coord => parseFloat(coord));
        }

        if(object_dotStyle == '') {
            object_dotStyle = 'circ';
        }

        if(object_size == '') {
            object_size = 100;
        } else {
            object_size = parseFloat(object_size);
        }

        const new_obj = new obj_class(object_center, object_size, object_dotStyle);

        render_objects.push(new_obj);
    } else if(event.key == 'r') {
        render_objects = [];
    }
})

main();