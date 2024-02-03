const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');    
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let coords = { x: 0, y: 0 };
let lastCoords = coords;


let brushSize = 5;
let brushColor = 'black';
let isDrawing = false;

const lineSegments = []
W
function onBrushSizeChange(element) {
    brushSize = parseInt(element.value);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(lastCoords.x, lastCoords.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();


    lineSegments.push({start: {x: lastCoords.x, y: lastCoords.y}, end: {x: coords.x, y: coords.y}, color: brushColor, size: brushSize})
}


function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}


function onCanvasMotion(e) {
    coords = getMousePos(e);
    if (isDrawing)  draw();
    lastCoords = coords;
}


canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    coords = getMousePos(e);
    draw();
    lastCoords = coords;
});


canvas.addEventListener('mouseup', () => isDrawing = false);


canvas.addEventListener('mousemove', onCanvasMotion);


// To avoid the issue of automatically drawing when the mouse is goes out  of the canvas  and comes back in.

canvas.addEventListener('mouseleave', () => {
    isDrawing = false
});