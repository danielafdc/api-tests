const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')
const user = require('./userData')

module.exports = {
  login: async () => {
    const usuario = user.dadosDoUsuarioAdmin()
    await user.criarUsuario(usuario)
    dadosLogin = {
      email: usuario.email,
      password: usuario.password
    }
    const { body } = await testServer.post(rota.rotaLogin)
      .send(dadosLogin)
    return body.authorization
  }
}
