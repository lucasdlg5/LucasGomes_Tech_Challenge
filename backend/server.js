var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

Score = require('./models/scoreModel'),

app = express(),
porta = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DMCardScoreDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/scoreRoutes');

routes(app);

app.listen(porta);
console.log(`Serviço Rest inicado na porta > ${porta}`)