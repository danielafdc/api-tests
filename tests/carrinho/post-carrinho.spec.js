const auth = require('../dataFactory/authData')
const prod = require('../dataFactory/productData')
const cart = require('../dataFactory/cartData')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

let prodId
let authorization

describe('POST /carrinhos', () => {
  beforeEach(async () => {
    authorization = await auth.login()
    const produto = await prod.criarProduto(authorization)
    prodId = produto.body._id
  })
  describe('Cadastrar carrinhos através da rota POST com sucesso', () => {
    it('Cadastrar um carrinho com sucesso', async () => {
      const response = await cart.criarCarrinho(authorization, prodId)
      const cartId = response.body._id
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Cadastro realizado com sucesso')
      expect(response.body).toHaveProperty('_id', cartId)
    })
  })

  describe('Cadastro de carrinhos através da rota POST sem sucesso', () => {
    it('Criar carrinho com produto duplicado deve falhar', async () => {
      const response = await testServer.post(rota.rotaCarrinhos).send({
        produtos: [{
          idProduto: prodId,
          quantidade: 1
        },
        {
          idProduto: prodId,
          quantidade: 1
        }]
      })
        .set('Authorization', authorization)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Não é permitido possuir produto duplicado')
      expect(response.body).toHaveProperty('idProdutosDuplicados', [prodId])
    })

    it('Criar dois carrinhos para o mesmo usuário deve falhar', async () => {
      const response1 = await cart.criarCarrinho(authorization, prodId)
      const response2 = await cart.criarCarrinho(authorization, prodId)
      expect(response2.status).toBe(400)
      expect(response2.body).toHaveProperty('message', 'Não é permitido ter mais de 1 carrinho')
    })

    it('Criar carrinho com produto inexistente deve falhar', async () => {
      const response = await cart.criarCarrinho(authorization, '1234')
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Produto não encontrado')
    })

    it('Criar carrinho com produto com quantidade insuficiente deve falhar', async () => {
      const response = await testServer.post(rota.rotaCarrinhos).send({
        produtos: [{
          idProduto: prodId,
          quantidade: 1000
        }]
      }).set('Authorization', authorization)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Produto não possui quantidade suficiente')
    })

    it('Criar carrinho com token inválido deve falhar', async () => {
      const response = await cart.criarCarrinho('Bearer 11111', prodId)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
})
