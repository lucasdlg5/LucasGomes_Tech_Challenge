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
exports.listar_todas_solicitacoes = function (req, res) {
   Cartao.find({}, function (err, msg) {
      if (err) {
         res.send(err);
      } else {
         res.json(msg);
      }
   });
}


//POST
exports.nova_solicitacao_cartao = function (req, res) {
   var reqBody = req.body;
   var creditScore = (Math.random() * (999 - 1) + 1);

   reqBody.creditScore = creditScore;

   //Tratamento Exceção caso Renda não tenha sido preenchida.
   if (reqBody.baseRenda == undefined) {
      res.status(500).send('É necessário informar renda para a análise do crédito!')
      throw "É necessário informar renda para a análise do crédito!";
   } else {
      var calcBaseRenda = parseInt(reqBody.baseRenda);
   }
   if (creditScore < 299) {
      reqBody.statusScore = false;
      reqBody.approvedCreditValue = 0;
   } else if (creditScore >= 300 && creditScore <= 599) {
      reqBody.statusScore = true;
      reqBody.approvedCreditValue = 1000.00;
   } else if (creditScore >= 600 && creditScore <= 799) {
      reqBody.statusScore = true;
      reqBody.approvedCreditValue = ((calcBaseRenda * 0.5) + calcBaseRenda);
   } else if (creditScore >= 800 && creditScore <= 950) {
      reqBody.statusScore = true;
      reqBody.approvedCreditValue = ((calcBaseRenda * 2.0) + calcBaseRenda);
   } else if (creditScore >= 951 && creditScore <= 999) {
      reqBody.statusScore = true;
      reqBody.approvedCreditValue = 1000000.00;
   }
   var newCard = new Cartao(reqBody);
   newCard.save(function (err, msg) {
      if (err) {
         res.send(err);
      } else {
         res.json(msg);
      }
   });
}

//DELETE
exports.remover_solicitacao = function (req, res) {
   Cartao.deleteOne({
      _id: req.params.scoreId
   }, function (err, msg) {
      if (err) {
         res.send(err);
      } else {
         res.status(200).json({
            message: 'Solicitação removida com sucesso!'
         });
      }
   });
}

//PUT
exports.atualizar_solicitacao = function (req, res) {
   Cartao.findOneAndUpdate({
         _id: req.params.scoreId
      },
      req.body, {
         new: true
      },
      function (err, msg) {
         if (err) {
            res.send(msg);
         } else {
            res.status(200).json({
               message: 'Solicitacao atualizada com sucesso!',
               msg
            });
         }
      });
}

//GET by ID
exports.listar_uma_solicitacao = function (req, res) {
   Cartao.findById(req.params.scoreId, function (err, msg) {
      if (err) {
         res.send(msg);
      } else {
         res.json(msg);
      }
   });
}