'use strict';
module.exports = function (app) {
   var newRequest = require('../controllers/scoreController');
   // newRequest Routes
   app.route('/score')
      .get(newRequest.listar_todas_solicitacoes)
      .post(newRequest.nova_solicitacao_cartao)
   app.route('/score/:scoreId')
      .delete(newRequest.remover_solicitacao)
      .put(newRequest.atualizar_solicitacao)
      .get(newRequest.listar_uma_solicitacao);
}