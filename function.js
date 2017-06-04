/**
 * Created by thomas.loyan on 07/05/2017.
 */

var clickX = [];
var clickY = [];

function addElementDrawStandard(positionX, positionY) {
    var element = [action , originX, originY, positionX, positionY, border, borderSize, borderColor, plainColor];
    if(elements[layersPosition] === undefined) {
        elements[layersPosition] = [];
    }
    elements[layersPosition].push(element);
}

function addElementDrawLinear(positionX, positionY) {
    var element = [action , originX, originY, clickX, clickY, border, borderSize, borderColor, plainColor];
    if(elements[layersPosition] === undefined) {
        elements[layersPosition] = [];
    }
    elements[layersPosition].push(element);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getAction() {
    if(action == 'square') {
        actionDraw = drawSquare;
        addElementDraw = addElementDrawStandard;
    } else if(action == 'circle') {
        actionDraw = drawCircle;
        addElementDraw = addElementDrawStandard;
    } else if(action == 'line') {
        actionDraw = drawLine;
        addElementDraw = addElementDrawStandard;
    } else if(action == 'pencil') {
        actionDraw = drawPencil;
        addElementDraw = addElementDrawLinear;
    } else if(action == 'eraser') {
        actionDraw = drawEraser;
        addElementDraw = addElementDrawLinear;
    }
}

function getActionByParams(action) {
    if(action == 'square') {
        actionDrawByParams = drawSquare;
    } else if(action == 'circle') {
        actionDrawByParams = drawCircle;
    } else if(action == 'line') {
        actionDrawByParams = drawLine;
    } else if(action == 'pencil') {
        actionDrawByParams = reDrawPencil;
    } else if(action == 'eraser') {
        actionDrawByParams = reDrawEraser;
    }
}

function clearAndRedraw(img_tmp, callback) {
    ctx.clearRect(0,0,canvas.scrollWidth, canvas.scrollHeight);
    if(img_tmp === true && imgs != null) {
        console.log(imgs);
        //console.log(ctx.drawImage(img, 0, 0, canvas_tmp.width, canvas_tmp.height));
        var img = document.createElement('img');
        img.src = imgs;
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            for(var i = 0; i < elements.length; i++) {
                if(elementsDisplay[i] === true) {
                    for(var j = 0; j < elements[i].length; j++) {
                        getActionByParams(elements[i][j][0]);
                        actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                            elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'noMirror');
                        if(mirrorX && mirrorY && (elements[i][j][0] != 'pencil' && elements[i][j][0] != 'eraser')) {
                            actionDrawByParams(canvas.width-elements[i][j][1], canvas.height-elements[i][j][2], canvas.width-elements[i][j][3],
                                canvas.height-elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'XY');
                            // actionDraw(canvas.width-originX,canvas.height-originY, canvas.width-mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                        } else if(mirrorX && (elements[i][j][0] != 'pencil' && elements[i][j][0] != 'eraser')) {
                            actionDrawByParams(canvas.width-elements[i][j][1], elements[i][j][2], canvas.width-elements[i][j][3],
                                elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'X');
                            // actionDraw(canvas.width-originX, originY, canvas.width-mousePos.x, mousePos.y, border, borderSize, borderColor, plainColor, true);
                        } else if(mirrorY && (elements[i][j][0] != 'pencil' && elements[i][j][0] != 'eraser')) {
                            actionDrawByParams(elements[i][j][1], canvas.height-elements[i][j][2], elements[i][j][3],
                                canvas.height-elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'Y');
                            // actionDraw(originX, canvas.height-originY, mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                        }else if(mirrorX && mirrorY && (elements[i][j][0] == 'pencil' || elements[i][j][0] == 'eraser')) {
                            actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                                elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'XY');
                            // actionDraw(canvas.width-originX,canvas.height-originY, canvas.width-mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                        } else if(mirrorX && (elements[i][j][0] == 'pencil' || elements[i][j][0] == 'eraser')) {
                            actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                                elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'X');
                            // actionDraw(canvas.width-originX, originY, canvas.width-mousePos.x, mousePos.y, border, borderSize, borderColor, plainColor, true);
                        } else if(mirrorY && (elements[i][j][0] == 'pencil' || elements[i][j][0] == 'eraser')) {
                            actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                                elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'Y');
                            // actionDraw(originX, canvas.height-originY, mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                        }
                    }
                }
            }
        }
    } else {
        for(var i = 0; i < elements.length; i++) {
            if(elementsDisplay[i] === true) {
                for(var j = 0; j < elements[i].length; j++) {
                    getActionByParams(elements[i][j][0]);
                    actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                        elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'noMirror');
                    if(mirrorX && mirrorY && (elements[i][j][0] != 'pencil' && elements[i][j][0] != 'eraser')) {
                        actionDrawByParams(canvas.width-elements[i][j][1], canvas.height-elements[i][j][2], canvas.width-elements[i][j][3],
                            canvas.height-elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'XY');
                        // actionDraw(canvas.width-originX,canvas.height-originY, canvas.width-mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                    } else if(mirrorX && (elements[i][j][0] != 'pencil' && elements[i][j][0] != 'eraser')) {
                        actionDrawByParams(canvas.width-elements[i][j][1], elements[i][j][2], canvas.width-elements[i][j][3],
                            elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'X');
                        // actionDraw(canvas.width-originX, originY, canvas.width-mousePos.x, mousePos.y, border, borderSize, borderColor, plainColor, true);
                    } else if(mirrorY && (elements[i][j][0] != 'pencil' && elements[i][j][0] != 'eraser')) {
                        actionDrawByParams(elements[i][j][1], canvas.height-elements[i][j][2], elements[i][j][3],
                            canvas.height-elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'Y');
                        // actionDraw(originX, canvas.height-originY, mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                    }else if(mirrorX && mirrorY && (elements[i][j][0] == 'pencil' || elements[i][j][0] == 'eraser')) {
                        actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                            elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'XY');
                        // actionDraw(canvas.width-originX,canvas.height-originY, canvas.width-mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                    } else if(mirrorX && (elements[i][j][0] == 'pencil' || elements[i][j][0] == 'eraser')) {
                        actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                            elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'X');
                        // actionDraw(canvas.width-originX, originY, canvas.width-mousePos.x, mousePos.y, border, borderSize, borderColor, plainColor, true);
                    } else if(mirrorY && (elements[i][j][0] == 'pencil' || elements[i][j][0] == 'eraser')) {
                        actionDrawByParams(elements[i][j][1], elements[i][j][2], elements[i][j][3],
                            elements[i][j][4], elements[i][j][5], elements[i][j][6], elements[i][j][7], elements[i][j][8], false, 'Y');
                        // actionDraw(originX, canvas.height-originY, mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, true);
                    }
                }
            }
        }
    }
    // ctx.lineWidth = borderSize;
    // ctx.strokeStyle = borderColor;
    // ctx.fillStyle = backgroundColor;
    // console.log(imgs.length + "------------------------");
    // for(var z = 0; z < imgs.length; z++) {
    //        var img = document.createElement('img');
    //        img.src = imgs[z];
    //        img.onload = function() {
    //            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //        }
    //     fileReader.readAsDataURL(this.files[0]);
    // }
    //ctx.fillRect(0,0,canvas.scrollWidth, canvas.scrollHeight);

}

function drawSquare(originX, originY, positionX, positionY, border, borderSize, borderColor, plainColor) {
    ctx.lineWidth = borderSize;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = plainColor;
    if((positionX - originX) <= 0) { var i = -1*(borderSize/2); var k = -1*(borderSize) } else if((positionX - originX) > 0) {var i = (borderSize/2); var k = -1*borderSize} else { var i = 0}
    if((positionY - originY) <= 0) { var j = -1*(borderSize/2); var l = -1*(borderSize/2) } else if((positionY - originY) > 0) {var j = (borderSize/2); var l =  -1*borderSize} else { var j = 0}
    ctx.strokeRect(originX+i, originY+j, positionX - originX, positionY - originY);
    if(border === true) {
        ctx.fillRect(originX + (i * 2), originY + (j * 2), (positionX - originX) + (i * -2), (positionY - originY) + (j * -2));
    }
}

function drawLine(originX, originY, positionX, positionY, border, borderSize, borderColor, plainColor, addElement) {
    ctx.beginPath();
    ctx.lineWidth = borderSize;
    ctx.strokeStyle = borderColor;
    ctx.lineJoin = "round";
    ctx.moveTo(originX, originY);
    ctx.lineTo(positionX, positionY);
    ctx.closePath();
    ctx.stroke();
}

function drawPencil(originX, originY, positionX, positionY, border, borderSize, borderColor, plainColor, addElement, mode) {
    console.log(borderSize);
    for(i = 1; i < clickX.length; i++) {
        ctx.beginPath();
        if(mode == 'XY') {
            ctx.moveTo(canvas.width-clickX[i-1],canvas.height-clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], canvas.height-clickY[i]);
        } else if(mode == 'X') {
            ctx.moveTo(canvas.width-clickX[i-1], clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], clickY[i]);
        } else if(mode == 'Y') {
            ctx.moveTo(clickX[i-1], canvas.height-clickY[i-1]);
            ctx.lineTo(clickX[i], canvas.height-clickY[i]);
        } else {
            ctx.moveTo(clickX[i-1], clickY[i-1]);
            ctx.lineTo(clickX[i], clickY[i]);
        }
        ctx.closePath();
        ctx.lineWidth = borderSize;
        ctx.strokeStyle = borderColor;
        ctx.lineJoin = "round";
        ctx.stroke();
    }
    ctx.lineJoin = "miter";

    if(addElement === true) {
        clickX.push(positionX);
        clickY.push(positionY);
    }
}

function reDrawPencil(originX, originY, clickX, clickY, border, borderSize, borderColor, plainColor, addElement, mode) {
    console.log(mode);
    for(i = 1; i < clickX.length; i++) {
        ctx.beginPath();
        if(mode == 'XY') {
            console.log(mode);
            ctx.moveTo(canvas.width-clickX[i-1],canvas.height-clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], canvas.height-clickY[i]);
        } else if(mode == 'X') {
            ctx.moveTo(canvas.width-clickX[i-1], clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], clickY[i]);
        } else if(mode == 'Y') {
            ctx.moveTo(clickX[i-1], canvas.height-clickY[i-1]);
            ctx.lineTo(clickX[i], canvas.height-clickY[i]);
        } else {
            console.log(mode);
            ctx.moveTo(clickX[i-1], clickY[i-1]);
            ctx.lineTo(clickX[i], clickY[i]);
        }
        ctx.closePath();
        ctx.lineWidth = borderSize;
        ctx.strokeStyle = borderColor;
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.lineJoin = "miter";
    }
}

function drawCircle(originX, originY, positionX, positionY, border, borderSize, borderColor, plainColor) {
    if((positionX-originX) >= 0) {var j = (positionX-originX);} else { var j = -1*(positionX-originX);}
    if((positionY-originY) >= 0) {var l = (positionY-originY);} else { var l = -1*(positionY-originY);}

    ctx.beginPath();
    ctx.lineWidth = borderSize;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = plainColor;
    ctx.arc(originX,originY, Math.sqrt( j*j + l*l ),0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    if(border === true && Math.sqrt( j*j + l*l )-(borderSize/2) >= 0) {
        ctx.beginPath();
        ctx.arc(originX, originY, Math.sqrt( j*j + l*l )-(borderSize/2),0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

function drawEraser(originX, originY, positionX, positionY, border, borderSize, borderColor, plainColor, addElement, mode) {
    ctx.beginPath();
    ctx.lineWidth = borderSize;
  //  ctx.strokeStyle = backgroundColor;
    ctx.lineJoin = "round";

    for(i = 1; i < clickX.length; i++) {
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-out';
        if(mode == 'XY') {
            ctx.moveTo(canvas.width-clickX[i-1],canvas.height-clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], canvas.height-clickY[i]);
        } else if(mode == 'X') {
            ctx.moveTo(canvas.width-clickX[i-1], clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], clickY[i]);
        } else if(mode == 'Y') {
            ctx.moveTo(clickX[i-1], canvas.height-clickY[i-1]);
            ctx.lineTo(clickX[i], canvas.height-clickY[i]);
        } else {
            ctx.moveTo(clickX[i-1], clickY[i-1]);
            ctx.lineTo(clickX[i], clickY[i]);
        }
        ctx.closePath();
        ctx.stroke();
    }

    if(addElement === true) {
        clickX.push(positionX);
        clickY.push(positionY);
    }
    ctx.globalCompositeOperation = 'source-over';
}

function reDrawEraser(originX, originY, clickX, clickY, border, borderSize, borderColor, plainColor, addElement, mode) {
    ctx.beginPath();
    ctx.lineWidth = borderSize;
//    ctx.strokeStyle = backgroundColor;
    ctx.lineJoin = "round";
    //console.log(ctx.globalCompositeOperation);
    ctx.globalCompositeOperation = 'destination-out';

    for(i = 1; i < clickX.length; i++) {
        ctx.beginPath();
        if(mode == 'XY') {
            ctx.moveTo(canvas.width-clickX[i-1],canvas.height-clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], canvas.height-clickY[i]);
        } else if(mode == 'X') {
            ctx.moveTo(canvas.width-clickX[i-1], clickY[i-1]);
            ctx.lineTo(canvas.width-clickX[i], clickY[i]);
        } else if(mode == 'Y') {
            ctx.moveTo(clickX[i-1], canvas.height-clickY[i-1]);
            ctx.lineTo(clickX[i], canvas.height-clickY[i]);
        } else {
            ctx.moveTo(clickX[i-1], clickY[i-1]);
            ctx.lineTo(clickX[i], clickY[i]);
        }
        ctx.closePath();
        ctx.stroke();
    }
    console.log(ctx.globalCompositeOperation);
    //ctx.globalCompositeOperation = 'destination-out';
    ctx.globalCompositeOperation = 'source-over';

}