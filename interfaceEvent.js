/**
 * Created by thomas.loyan on 08/05/2017.
 */

    document.getElementsByName("symetry")[0].onclick = function(){
        if(mirrorX === false) {
            mirrorX = true;
        } else {
            mirrorX = false;
        }
        getAction();
        clearAndRedraw();
    };

    document.getElementsByName("symetry")[1].onclick = function(){
        if(mirrorY === false) {
            mirrorY = true;
        } else {
            mirrorY = false;
        }
        getAction();
        clearAndRedraw();
    };

    document.getElementsByName("tools")[0].onclick = function(){ action = document.getElementsByName("tools")[0].value; getAction();};
    document.getElementsByName("tools")[1].onclick = function(){ action = document.getElementsByName("tools")[1].value; getAction();};
    document.getElementsByName("tools")[2].onclick = function(){ action = document.getElementsByName("tools")[2].value; getAction();};
    document.getElementsByName("tools")[3].onclick = function(){ action = document.getElementsByName("tools")[3].value; getAction();};
    document.getElementsByName("tools")[4].onclick = function(){ action = document.getElementsByName("tools")[4].value; getAction();};

    document.getElementsByName("border")[0].onclick = function(){ border = false; getAction();};
    document.getElementsByName("border")[1].onclick = function(){ border = true; getAction();};

    document.getElementsByName("borderSize")[0].onchange = function(){
        if(document.getElementsByName("borderSize")[0].value === '0'){
            borderSize = "0";
        } else {
            borderSize = document.getElementsByName("borderSize")[0].value;
        }
        getAction();
    };

    document.getElementsByName("borderColor")[0].onchange = function(){ borderColor = document.getElementsByName("borderColor")[0].value; getAction();};
    document.getElementsByName("plainColor")[0].onchange = function(){ plainColor = document.getElementsByName("plainColor")[0].value; getAction();};

    document.getElementsByName("addLayer")[0].onclick = function(){ addLayer(); layerInterface(); getAction();};
    document.getElementsByName("displayLayer")[0].onclick = function(){ displayLayer(); layerInterface(); getAction();};
    document.getElementsByName("deleteLayer")[0].onclick = function(){ deleteLayer(); layerInterface(); getAction();};
    document.getElementsByName("upLayer")[0].onclick = function(){ upLayer(); layerInterface(); getAction();};
    document.getElementsByName("downLayer")[0].onclick = function(){ downLayer(); layerInterface(); getAction();};

    document.getElementsByName("edit")[0].onchange = function(){
        //var self = this;
        var fileReader = new FileReader();
        fileReader.addEventListener('loadend', function () {
            var img = document.createElement('img');
            img.src = fileReader.result;
            img.onload = function() {
                //console.log(imgs);
                imgs = img.src;
                ctx_tmp.drawImage(img, 0, 0, canvas_tmp.width, canvas_tmp.height);
            }
        })
        fileReader.readAsDataURL(this.files[0]);
    }

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

/**
 * The event handler for the link's onclick event. We give THIS as a
 * parameter (=the link element), ID of the canvas and a filename.
 */
document.getElementsByName('preload')[0].addEventListener('click', function() {
    clearAndRedraw(true);
    preloaded = true;
}, false);

document.getElementById('download').addEventListener('click', function() {
    if(preloaded){
        downloadCanvas(this, 'canvas', 'test.png');
        preloaded = false;
    }
}, false);



//}