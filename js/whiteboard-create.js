/*
* TODO: Change tools (paintbrush, crayon, pen)
*/

var canvas,
    stage,
    plots,
    isActive,
    blue,
    pink,
    white,
    black,
    yellow,
    colour,
    lineWidth,
    whiteboardKey;
    

plots = [];
isActive = false;

// Declaring colours
blue = "#00FFFF";
pink = "#FF00FF";
white = "#FFFFFF";
black = "#000000";
yellow = "#FFFF00";
colour = blue;

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
    
    if (localStorage.getItem(whiteboardKey) !== null) {
        console.log("got it!");

        var dataURL = localStorage.getItem(whiteboardKey);

        getLocalStorage(dataURL);
    }
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
    lineWidth += 2;
}  

function lineWidthSmaller () {
    lineWidth -= 2;
}

function saveLocalStorage () {

    localStorage.setItem(whiteboardKey, canvas.toDataURL());
}

function getLocalStorage (dataUrl) {

    var img = new Image;
    img.src = dataUrl;

    img.onload = function () {
        stage.drawImage(img, 0, 0);
    };
}

function deleteLocalStorage () {

    localStorage.removeItem(whiteboardKey);

    stage.clearRect(0, 0, canvas.width, canvas.height);
}

function saveAsImage () {
    // save canvas image as data url (png format by default)
    // var dataURL = canvas.toDataURL();

    var myCanvas = document.getElementById("canvas");
    var image = canvas.toDataURL("image/jpeg");

    document.write('<img src="'+image+'"/>');


    var image = myCanvas.toDataURL("image/png");
    var downloadImage = image.replace("image/png", "image/octet-stream");

    window.location.href = image;

      // set canvasImg image src to dataURL
      // so it can be saved as an image
    // document.getElementById('canvasImg').src = dataURL;

    // '<a href="" download="natalias-whiteboard.png">'
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





