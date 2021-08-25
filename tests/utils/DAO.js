const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
      
    clearAllUsersFromDB: async (authorization) => {
        const listaProdutos = await testServer.get(rota.rotaProdutos)
        const body = listaProdutos.body.usuarios
        const listaIds = body.map(function(item){
        return item._id;
        })
        
        listaIds.forEach(async function(id) {
          await testServer.delete(rota.rotaUsuarios + '/' + id).set('Authorization', authorization)
        })
      },

    deleteUser: async (authorization, id) => {
        await testServer.delete(rota.rotaUsuarios + '/' + id).set('Authorization', authorization)
    },

    clearAllProductsFromDB: async (authorization) => {
      const listaProdutos = await testServer.get(rota.rotaProdutos).set('Authorization', authorization)
      const body = listaProdutos.body.produtos
      const listaIds = body.map(function(item){
      return item._id;
      })
      
      listaIds.forEach(async function(id, i) {
        await testServer.delete(rota.rotaProdutos + '/' + id).set('Authorization', authorization)
      })
    }
}