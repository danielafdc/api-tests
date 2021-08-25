const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
  criarCarrinho: async (authorization, idProduto) => {
    const carrinho = await testServer.post(rota.rotaCarrinhos).send({
      produtos: [{
        idProduto,
        quantidade: 1
      }]
    })
      .set('Authorization', authorization)
    return carrinho
  },

  deletarCarrinho: async (authorization) => {
    await testServer.delete(rota.rotaCancelarCompra).set('Authorization', authorization)
  }
}
