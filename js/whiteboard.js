var canvas,
    stage,
    plots = [],
    isActive = false,
    // Declaring colours
    blue = "#00FFFF",
    pink = "#FF00FF",
    white = "#FFFFFF",
    black = "#000000",
    yellow = "#FFFF00",
    colour = blue,
    //Line Widths
    lineWidth = 3;

function init (){
    canvas = document.getElementById('canvas'); 

    stage = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('touchstart', touchStart, false);

    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('touchmove', touchMove, false);

    canvas.addEventListener('mouseup', endDraw, false);
    canvas.addEventListener('touchend', endDraw, false);
}

function touchStart (e) {
    e.stopPropagation();
    e.preventDefault();

    startDraw(e);
}

function startDraw(e) { 
    isActive = true; 
} 

function touchMove (e){
    e.stopPropagation();
    e.preventDefault();

    draw(e);
}


function changeColour (color) {
    colour = color;
}

function lineWidthBigger () {
    lineWidth += 3;
}  

function lineWidthSmaller () {
    lineWidth -= 3;
}

function draw(e) { 
    if(!isActive) return;   
    // cross-browser canvas coordinates

    var x = e.offsetX || e.layerX || e.touches[0].clientX - canvas.offsetLeft; 
    var y = e.offsetY || e.layerY || e.touches[0].clientY - canvas.offsetTop;   

    plots.push({x: x, y: y}); 

    //declares what colour for drawing
    drawOnCanvas(colour, plots); 
}

function drawOnCanvas(color, plots) { 
    stage.beginPath();
    stage.strokeStyle = color;
    stage.lineWidth = lineWidth;

    stage.moveTo(plots[0].x, plots[0].y);   

    for(var i=1; i<plots.length; i++) { 
      stage.lineTo(plots[i].x,
       plots[i].y); 
    } 

    stage.stroke(); 
}

function endDraw(e) { 
    isActive = false;
    //Empties array.
    plots = []; 
}

//initialises whiteboard
window.onload = function () {
	init();
}