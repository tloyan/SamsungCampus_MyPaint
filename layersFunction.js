/**
 * Created by thomas.loyan on 09/05/2017.
 */

function addLayer() {
    layersPosition = elements.length;
    if(elements[layersPosition] === undefined) {
        elements[layersPosition] = [];
        elementsDisplay[layersPosition] = true;
    }
    selectionLayers = [];
}

function displayLayer(){
    console.log(selectionLayers);
    selectionLayers.forEach(function (value, index, array) {
        if(elementsDisplay[value] === true) {
            elementsDisplay[value] = false;
        } else if(elementsDisplay[value] === false) {
            elementsDisplay[value] = true;
        }
    });
}

function deleteLayer(){
    var j = 0;
    selectionLayers.sort(function(a,b){return a - b});
    console.log(selectionLayers);
    for(var i = 0; i < elements.length; i++) {
    selectionLayers.forEach(function (value, index, array) {
            //console.log(elements[value]);
            if(i == value) {
                elements[i] = null;
                array.splice(index, 1);
            }
        });
    }
    // elements.forEach(function (value, index , array) {
    console.log(elements);
    for(var i = 0; i < elements.length; i++) {
        if (elements[i] === null) {
            elements.splice(i, 1);
            i--;
        }
    }
    //});

    console.log(elements);

    selectionLayers = [];
    layerInterface();
}

function upLayer() {
    var tmp;
    if(layersPosition > 0) {
        tmp = elements[parseInt(layersPosition)-1];
        elements[parseInt(layersPosition)-1] = elements[layersPosition];
        elements[layersPosition] = tmp;

        tmp = elementsDisplay[parseInt(layersPosition)-1];
        elementsDisplay[parseInt(layersPosition)-1] = elementsDisplay[layersPosition];
        elementsDisplay[layersPosition] = tmp;
        layersPosition = parseInt(layersPosition)-1;
    }
    //console.log(elements);
}

function downLayer() {
    var tmp;
    if(layersPosition < elements.length - 1) {
        tmp = elements[parseInt(layersPosition)+1];
        elements[parseInt(layersPosition)+1] = elements[layersPosition];
        elements[layersPosition] = tmp;

        tmp = elementsDisplay[parseInt(layersPosition)+1];
        elementsDisplay[parseInt(layersPosition)+1] = elementsDisplay[layersPosition];
        elementsDisplay[layersPosition] = tmp;
        layersPosition = parseInt(layersPosition)+1;
    }
}

function selectLayers(layer) {
    var layer_tmp = [];

    var isSelected = false;

    layer_tmp = layer.className.split('_');
    console.log(layer_tmp);
    if(!isNaN(layer_tmp[2]) && layer_tmp[2] < elements.length) {
        console.log('ok');
        selectionLayers.forEach(function (value, index, array) {
            if(value == layer_tmp[2]) {
                array.splice(index, 1);
                isSelected = true;
            }
        });
        if(isSelected === false) {
            console.log('okidoki');
            selectionLayers.push(layer_tmp[2]);
            layersPosition = layer_tmp[2];
        }
    }
}

function layerInterface() {
    selectionLayers = [];
    if(layersPosition >= elements.length) {
        layersPosition = "0";
    }
    console.log(layersPosition);
    var layers = '';
    for(var i = 0; i < elements.length; i++) {
        if(i == layersPosition) {
            var checked = 'checked';
            selectionLayers.push(layersPosition);
        } else {
            var checked = '';
        }

        if(elementsDisplay[i] === false) {
            var hidden = ' XXXXXXX';
        } else {
            var hidden = '';
        }

        layers +=
            '<div>' +
            '<input type="checkbox" name="displayLayer" value="0" class="layer_id_'+i +'" onclick="selectLayers(this);"' +
            checked + '> Layer '+hidden+'</input>' +
            '</div>';
        for(var j = 0; j < elements[i].length; j++) {
            layers += '<p>' + elements[i][j][0] + '</p>';
        }
    }
    clearAndRedraw();
    document.getElementById('Layers').innerHTML = layers;
}