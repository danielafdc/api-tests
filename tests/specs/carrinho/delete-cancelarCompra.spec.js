const auth = require('../../dataFactory/authData')
const prod = require('../../dataFactory/productData')
const cart = require('../../dataFactory/cartData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')
const dao = require('../../utils/DAO')

let user
let produto
let prodId

describe('DELETE /carrinhos/cancelar-compra', () => {
  beforeEach(async () => {
    user = await auth.login()
    produto = await prod.criarProduto(user.authorization)
    prodId = produto.body._id
    await cart.criarCarrinho(user.authorization, prodId)
  })
  describe('Cancelar compra através da rota DELETE com sucesso', () => {
    it('Cancelar uma compra com sucesso', async () => {
      const response = await testServer.delete(rota.rotaCancelarCompra).set('Authorization', user.authorization)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
    })

    it('Cancelar uma compra com sucesso deve devolver o produto para o estoque', async () => {
      const responseGet = await testServer.get(rota.rotaProdutos + '/' + prodId)
      const qtd = responseGet.body.quantidade
      const response = await testServer.delete(rota.rotaCancelarCompra).set('Authorization', user.authorization)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
      const responseGet2 = await testServer.get(rota.rotaProdutos + '/' + prodId)
      const qtde = responseGet2.body.quantidade
      expect(qtde).toEqual(qtd + 1)
    })
  })

  describe('Cancelar compra através da rota DELETE sem sucesso', () => {
    it('Tentar cancelar compra com token vazio deve falhar', async () => {
      const response = await testServer.delete(rota.rotaCancelarCompra).set('Authorization', '')
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })

    it('Tentar cancelar compra com token inválido deve falhar', async () => {
      const response = await testServer.delete(rota.rotaCancelarCompra).set('Authorization', '1234')
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })

  afterEach(() => {
    dao.clearAllCartsFromDBButMockData(user.authorization)
    dao.clearAllProductsFromDBButMockData(user.authorization)
    dao.clearAllUsersFromDBButMockData(user)
  })
})
