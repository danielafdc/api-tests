const auth = require('../../dataFactory/authData')
const prod = require('../../dataFactory/productData')
const cart = require('../../dataFactory/cartData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')
const dao = require('../../utils/DAO')

let authorization
let prodId

describe('DELETE /carrinhos/concluir-compra', () => {
  beforeAll(async () => {
    authorization = await auth.login()
    const produto = await prod.criarProduto(authorization)
    prodId = produto.body._id
    await cart.criarCarrinho(authorization, prodId)
  })
  describe('Concluir compra através da rota DELETE com sucesso', () => {
    it('Concluir uma compra com sucesso', async () => {
      const response = await testServer.delete(rota.rotaConcluirCompra).set('Authorization', authorization)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro excluído com sucesso')
    })
  })

  describe('Concluir compra através da rota DELETE sem sucesso', () => {
    it('Tentar concluir compra com token vazio deve falhar', async () => {
      const response = await testServer.delete(rota.rotaConcluirCompra).set('Authorization', '')
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })

    it('Tentar concluir compra com token inválido deve falhar', async () => {
      const response = await testServer.delete(rota.rotaConcluirCompra).set('Authorization', '1234')
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })

  afterEach(() => {
    dao.clearAllCartsFromDBButMockData(authorization)
    dao.clearAllProductsFromDBButMockData(authorization)
  })
})
