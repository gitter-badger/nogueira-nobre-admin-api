import mongoose from 'mongoose';

mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const expedicoaoSchema = new Schema({
  nota: Number,
  volume: {
    caixa: {
      altura: Number,
      largura: Number,
    },
    produtos: [],
  },
  empenho: {
    numero: Number,
    orgao: { nome: String, cnpj: Number },
    data: Date,
  },
});

const Expedicao = mongoose.model('expedicoes', expedicoaoSchema);

export default Expedicao;
