//* Our server is here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var path = require('path');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

/**  routes to serve the Angular build files from public */
app.use('/', express.static(path.join(__dirname, '../dist')))


var router = require("./router");

app.use('/api', router);

app.listen(port);
console.log('Connected to port ' + port + ' http://localhost:' + port + '/api');