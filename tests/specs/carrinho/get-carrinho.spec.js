const auth = require('../../dataFactory/authData')
const prod = require('../../dataFactory/productData')
const cart = require('../../dataFactory/cartData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')

let cartId
let prodId

describe('GET /carrinhos', () => {
  beforeEach(async () => {
    const authorization = await auth.login()
    const produto = await prod.criarProduto(authorization)
    prodId = produto.body._id
    const { body } = await cart.criarCarrinho(authorization, prodId)
    cartId = body._id
  })
  describe('Listar carrinhos cadastrados através da rota GET com sucesso', () => {
    it('Listar um carrinho pelo id com sucesso', async () => {
      const response = await testServer.get(rota.rotaCarrinhos + '/' + cartId)
      expect(response.status).toBe(200)
      expect(response.body._id).toEqual(cartId)
    })

    it('Encontrar um carrinho pelo id do usuário com sucesso', async () => {
      const response = await testServer.get(rota.rotaCarrinhos).query({ idUsuario: 'oUb7aGkMtSEPf6BZ' })
      expect(response.status).toBe(200)
      expect(response.body.carrinhos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            idUsuario: 'oUb7aGkMtSEPf6BZ'
          })
        ])
      )
    })
  })

  describe('Encontrar um carrinho através da rota GET sem sucesso', () => {
    it('Tentar encontrar um carrinho com id inexistente', async () => {
      const response = await testServer.get(rota.rotaCarrinhos + '/' + '1234')
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Carrinho não encontrado')
    })
  })

  afterEach(() => {
    prod.deletarProduto(prodId)
  })
})
