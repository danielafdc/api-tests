const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')
const user = require('./userData')

module.exports = {
  
  login: async () => {
    const usuario = user.dadosDoUsuarioAdmin()
    const responseCriarUsuario = await user.criarUsuario(usuario)
    const dadosLogin = {
      email: usuario.email,
      password: usuario.password
    }
    const { body } = await testServer.post(rota.rotaLogin)
      .send(dadosLogin)
      const userData = {
        id: responseCriarUsuario.body._id,
        authorization: body.authorization
      }
    return userData
  }
}