'use strict';
var mongoose = require('mongoose'),

Cartao = mongoose.model('DM_Score');

// Deve se criar uma aplicação que permitirá a solicitação de um cartão de crédito,
// onde o usuário irá inserir suas informações básicas e o sistema irá fazer
// uma análise da liberação do cartão.

// Cartão
// GET: Listará todas as solicitações de cartões no sistema.
// POST: Deve inserir uma nova solicitação de cartão.
// DELETE: Remove uma solicitação

// Score	Crédito
// 1 a 299	Reprovado
// 300 a 599	R$1000,00
// 600 a 799	50% da renda informada, valor mínimo R$1000,00
// 800 a 950	200% da renda informada
// 951 a 999	Sem limites, considerar R$ 1.000.000

//GET
exports.listar_todas_solicitacoes = function(req, res){
   console.log('Listar todas as solicitações');
   Cartao.find({}, function(err, msg){
      if(err){
         console.log(err)
         res.send(err);
      }else{
         res.json(msg);
      }
   });
}

//POST
exports.nova_solicitacao_cartao = function(req,res){
   console.log('Foi solicitado um novo cartao!');
   var reqBody = req.body;
   var creditScore = (Math.random()* (999 - 1) + 1);

   reqBody.creditScore = creditScore;

   //Tratamento Exceção caso Renda não tenha sido preenchida.
   if(reqBody.baseRenda == undefined){
      res.status(500).send('É necessário informar renda para a análise do crédito!')
      throw "É necessário informar renda para a análise do crédito!";
   }else{
      var calcBaseRenda = parseInt(reqBody.baseRenda);
   }

   console.log(`\nPontuação: ${creditScore}\n`);
   if (creditScore < 299){
      console.log('Abaixo de 299 - REPROVADO');
      reqBody.statusMessage = "Reprovado";
      reqBody.approvedCreditValue = 0;
   }else if (creditScore >= 300 && creditScore <= 599){
      console.log('Entre 300 a 599 - APROVADO - 1000,00');
      reqBody.statusMessage = "Aprovado";
      reqBody.approvedCreditValue = 1000.00;
   }else if (creditScore >= 600 && creditScore <= 799){
      console.log('Entre 600 a 799 - APROVADO - 50% da Renda');
      reqBody.statusMessage = "Aprovado";
      reqBody.approvedCreditValue = ((calcBaseRenda*0.5)+calcBaseRenda);
      console.log(reqBody.approvedCreditValue);
   }else if (creditScore >= 800 && creditScore <= 950){
      console.log('Entre 800 a 950 - APROVADO - 200% da renda');
      reqBody.statusMessage = "Aprovado";
      reqBody.approvedCreditValue = ((calcBaseRenda*2.0)+calcBaseRenda);
      console.log(reqBody.approvedCreditValue);
   }else if (creditScore >= 951 && creditScore <= 999){
      console.log('Entre 951 a 999 - APROVADO - SEM LIMITES');
      reqBody.statusMessage = "Aprovado";
      reqBody.approvedCreditValue = 1000000.00;
   }
   console.log('\n');
   console.log(reqBody)
   console.log('\n');
   var newCard = new Cartao(reqBody);
   newCard.save(function(err,msg){
      if(err){
         console.log(err)
         res.send(err);
      }else{
         res.json(msg);
      }
   });
}

//DELETE
exports.remover_solicitacao = function (req, res){
   console.log(`\nRemovendo uma solicitacao... - ${req.params.scoreId}\n`);
   Cartao.deleteOne({
      _id: req.params.scoreId
   }, function (err, msg){
      if(err){
         console.log(err)
         res.send(err);
      }else{
         res.status(200).json({ message: 'Solicitação removida com sucesso!'});
      }
   })
}
