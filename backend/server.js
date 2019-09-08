var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var Score = require('./models/scoreModel')
var app = express()
app.use(cors())
app.use(serveStatic('./dmscore_frontend/dist'));
var porta = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_CLUSTER_URI || process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connect('mongodb+srv://dmcard:dmcard@cluster0-dsb7d.mongodb.net/dmcard?retryWrites=true&w=majority', { useNewUrlParser: true , useFindAndModify: false});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/scoreRoutes');

routes(app);

app.listen(porta);
console.log(`Serviço Rest inicado na porta > ${porta}`)