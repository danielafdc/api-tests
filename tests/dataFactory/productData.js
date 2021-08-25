const faker = require('faker')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
  dadosDoProduto: () => {
    return {
      nome: faker.commerce.product() + faker.name.firstName() + faker.name.lastName(),
      preco: faker.commerce.price(),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.random.number({ min: 1, max: 10 })
    }
  },

  criarProduto: async (authorization) => {
    const dadosProduto = module.exports.dadosDoProduto()
    const produto = await testServer.post(rota.rotaProdutos).send(dadosProduto).set('Authorization', authorization)
    console.log(dadosProduto)
    return produto
  },

  removerTodosProdutos: async (authorization) => {
    const listaProdutos = await testServer.get(rota.rotaProdutos).set('Authorization', authorization)
    const body = listaProdutos.body.produtos
    const listaIds = body.map(function(item){
    return item._id;
    })
    
    listaIds.forEach(async function(id, i) {
      await testServer.delete(rota.rotaProdutos + '/' + id).set('Authorization', authorization)
    })
  }
}