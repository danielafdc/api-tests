const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

describe('GET /usuarios', () => {
  describe('Encontrar um usuário através da rota GET com sucesso', () => {
    it('Encontrar um usuário pelo id com sucesso', async () => {
      const response = await testServer.get(rota.rotaGetUsuarioPorId + '0uxuPY0cbmQhpEz1')
      //  .query({'usuarios[0]._id': '0uxuPY0cbmQhpEz1'});
      expect(response.status).toBe(200)
      expect(response.body.usuarios).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            nome: 'Fulano da Silva',
            email: 'fulano@qa.com'
          })
        ])
      )
    })

    it('Encontrar um usuário pelo nome com sucesso', async () => {
      const response = await testServer.get(rota.rotaGetUsuarioPorNome + 'Fulano da Silva')
      expect(response.status).toBe(200)
      expect(response.body.usuarios).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            nome: 'Fulano da Silva',
            email: 'fulano@qa.com'
          })
        ])
      )
    })
  })

  describe('Encontrar um usuário através da rota GET sem sucesso', () => {
    it('Tentar encontrar um usuário com id inexistente', async () => {
      const response = await testServer.get(rota.rotaGetUsuarioPorId + 'essenaoexiste')
      expect(response.status).toBe(200)
      expect(response.body.usuarios.length).toBe(0)
    })
  })
})
