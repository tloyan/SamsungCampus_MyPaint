/**
 * Created by thomas.loyan on 10/05/2017.
 */

var express = require('express');
var app = express();
var path = require('path');

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    app.use('/', express.static(__dirname + '/public'));
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Exemple app listening at http://%s:%s", host, port)
});