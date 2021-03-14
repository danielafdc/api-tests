const testServer = require('../utils/testServer')

const rotaUsuarios = '/usuarios'


describe('Encontrar um usuário através da rota GET', () => {
  it('Encontrar um usuário existente com sucesso', async () => {
   const response = await testServer.get(rotaUsuarios + '?_id=0uxuPY0cbmQhpEz1')
    //  .query({'usuarios[0]._id': '0uxuPY0cbmQhpEz1'});
    expect(response.status).toBe(200)
    expect(response.body.usuarios).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                'nome': 'Fulano da Silva',
                'email': 'fulano@qa.com'
            })
        ])
    )
  })
})