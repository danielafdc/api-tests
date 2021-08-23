const faker = require('faker')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
  dadosDoProduto: () => {
    return {
      nome: faker.commerce.product(),
      preco: faker.commerce.price(),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.random.number({ min: 1, max: 10 })
    }
  },

  criarProduto: async (authorization) => {
    const dadosProduto = module.exports.dadosDoProduto()
    const produto = await testServer.post(rota.rotaProdutos).send(dadosProduto).set('Authorization', authorization)
    return produto
  },

  deletarProduto: async (idProduto) => {
    await testServer.delete(rota.rotaProdutos + '/' + idProduto)
  }
}