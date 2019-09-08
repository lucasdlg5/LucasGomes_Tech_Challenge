var express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');
var serveStatic = require('serve-static');
Score = require('./models/scoreModel'),

app = express(),
app.use(serveStatic('../dmscore_frontend/dist'));
porta = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_CLUSTER_URI || process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connect('mongodb+srv://dmcard:dmcard@cluster0-dsb7d.mongodb.net/dmcard?retryWrites=true&w=majority', { useNewUrlParser: true , useFindAndModify: false});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/scoreRoutes');

routes(app);

app.listen(porta);
console.log(`Serviço Rest inicado na porta > ${porta}`)