const auth = require('../../dataFactory/authData')
const prod = require('../../dataFactory/productData')
const cart = require('../../dataFactory/cartData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')

let authorization
let produto
let prodId
describe('DELETE /carrinhos/cancelar-compra', () => {
  beforeEach(async () => {
    authorization = await auth.login()
    produto = await prod.criarProduto(authorization)
    prodId = produto.body._id
    await cart.criarCarrinho(authorization, prodId)
  })
  describe('Cancelar compra através da rota DELETE com sucesso', () => {
    it('Cancelar uma compra com sucesso', async () => {
      const response = await testServer.delete(rota.rotaCancelarCompra).set('Authorization', authorization)
      console.log(response.body)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
    })

    it('Cancelar uma compra com sucesso deve devolver o produto para o estoque', async () => {
      const responseGet = await testServer.get(rota.rotaProdutos + '/' + prodId)
      console.log(responseGet.body)
      const qtd = responseGet.body.quantidade
      const response = await testServer.delete(rota.rotaCancelarCompra).set('Authorization', authorization)
      console.log(response.body)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
      const responseGet2 = await testServer.get(rota.rotaProdutos + '/' + prodId)
      console.log(responseGet2.body)
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
    cart.deletarCarrinho(authorization)
    prod.removerTodosProdutos(authorization)
  })
})
