'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbSchema = new Schema({
   nome: {
      type: String
   },
   email: {
      type: String
   },
   creditScore: {
      type: Number
   },
   statusMessage: {
      type: String
   },
   approvedCreditValue: {
      type: Number
   },
   baseRenda: {
      type: Number
   },
   data_solicitacao: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('DM_Score', dbSchema);