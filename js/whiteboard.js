(function () {
    "use strict";

    var canvas,
        stage,
        plots = [],
        isActive = false,
        // Declaring colours
        blue = "#00FFFF",
        pink = "#FF00FF",
        white = "#FFFFFF",
        black = "#000000",
        yellow = "#FFFF00";

    function init (){
        canvas = document.getElementById('canvas'); 

        stage = canvas.getContext('2d');
        stage.lineWidth = '3';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvas.addEventListener('mousedown', startDraw, false);
        canvas.addEventListener('mousemove', draw, false);
        canvas.addEventListener('mouseup', endDraw, false);
    }
    
    function startDraw(e) { 
        isActive = true; 
    }   

    function draw(e) { 
        if(!isActive) return;   
        // cross-browser canvas coordinates
        var x = e.offsetX || e.layerX - canvas.offsetLeft; 
        var y = e.offsetY || e.layerY - canvas.offsetTop;   

        plots.push({x: x, y: y}); 

        //declares what colour for drawing
        drawOnCanvas(blue, plots); 
    }

    function drawOnCanvas(color, plots) { 
        stage.beginPath();
        stage.strokeStyle = color;
        stage.moveTo(plots[0].x, plots[0].y);   
        for(var i=1; i<plots.length; i++) { 
          stage.lineTo(plots[i].x,
           plots[i].y); 
        } 
        stage.stroke(); 
    }

    function endDraw(e) { 
        isActive = false;   // empty the array 
        plots = []; 
    }

    //initialises whiteboard
    window.onload = function () {
    	init();
    }
}());