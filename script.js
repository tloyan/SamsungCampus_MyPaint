/**
 * Created by thomas.loyan on 06/05/2017.
 */

var canvas = document.getElementById('canvas');
var canvas_tmp = document.getElementById('canvas_tmp');
var ctx = canvas.getContext('2d');
var ctx_tmp = canvas_tmp.getContext('2d');

var preloaded = false;

var elements = [];
var elementsDisplay = [];
var selectionLayers = [];
var layersPosition = 0;
elements[layersPosition] = [];
elementsDisplay[layersPosition] = true;

var imgs = null;
var originX = null;
var originY = null;

var mirrorX = false;
var mirrorY = false;

var action = 'pencil';
var border = false;
var borderSize = "1";
var borderColor = 'black';
var plainColor = 'black';
var backgroundColor = 'white';

var actionDraw;
var actionDrawByParams;

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

canvas_tmp.width = canvas_tmp.scrollWidth;
canvas_tmp.height = canvas_tmp.scrollHeight;


getAction();
layerInterface();

canvas.addEventListener('mousemove', function(evt) {
    if(originX !== null && originY !== null) {
        var mousePos = getMousePos(canvas, evt);
        clearAndRedraw();
        actionDraw(originX, originY, mousePos.x, mousePos.y, border, borderSize, borderColor, plainColor, true, 'noMirror');
        if(mirrorX && mirrorY) {
            actionDraw(canvas.width-originX,canvas.height-originY,
                canvas.width-mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, false, 'XY');
        } else if(mirrorX) {
            actionDraw(canvas.width-originX, originY,
                canvas.width-mousePos.x, mousePos.y, border, borderSize, borderColor, plainColor, false, 'X');
        } else if(mirrorY) {
            actionDraw(originX, canvas.height-originY,
                mousePos.x, canvas.height-mousePos.y, border, borderSize, borderColor, plainColor, false, 'Y');
        }
    }
}, false);

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    originX = mousePos.x;
    originY = mousePos.y;
}, false);

canvas.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    addElementDraw(mousePos.x, mousePos.y);
    originX = null;
    originY = null;
    clickX = [];
    clickY = [];
    layerInterface();
    console.log(layersPosition);
}, false);
