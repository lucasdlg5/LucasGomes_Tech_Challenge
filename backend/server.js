var express = require('express'),
app = express(),
porta = process.env.porta || 4000;
app.listen(porta);
app.get('/', function (req, res){
    res.json({hello: 'world'});
})
console.log(`Serviço Rest inicado na porta > ${porta}`)