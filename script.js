/* wss://3d-render-server.saturnwillow.repl.co/echo */

const main_div = document.getElementById('main');
const setup_div = document.getElementById('setup');
main_div.style.display = 'none';
let render_objects = [];

const ws = new WebSocket("wss://3d-render-server.saturnwillow.repl.co/echo");


ws.addEventListener("open", () => {
    ws.send(JSON.stringify({
        type: 'init',
        client_type: 'web'
    }));
});



ws.addEventListener("message", msg => {
    data = JSON.parse(msg.data);
	console.log(`Server Sent: ${JSON.stringify(data)}`);

    if(data.type == 'pageLoaded') {
        main(data.page);
    }
});

function loadPage() {
    const input = document.getElementById('pageId_input');
    ws.send(JSON.stringify({
        type: 'loadPageWeb', 
        page: input.value,
        client_type: 'web'
    }));
}

function main(page) {
    main_div.style.display = 'block';
    setup_div.style.display = 'none';

    render_objects = [];
    

    // Set the interval to achieve 60fps
    setInterval(render, 1000 / 60); // 1000ms divided by 60fps gives the interval in milliseconds

}

function render() {
    const background_color = '#cccccc';

    const canvas = document.getElementById("main-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set 0, 0
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);

    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear the canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render the background
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(object of render_objects) {
        object.Render();
    }
}