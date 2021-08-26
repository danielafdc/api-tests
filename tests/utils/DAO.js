const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
      
    // clearAllUsersFromDB: async (authorization) => {
    //     const listaUsuarios = await testServer.get(rota.rotaUsuarios)
    //     const body = listaUsuarioss.body.usuarios
    //     const listaIds = body.map(function(item){
    //     return item._id;
    //     })
        
    //     listaIds.forEach(async function(id) {
    //       await testServer.delete(rota.rotaUsuarios + '/' + id)
    //     })
    //   },

    deleteUser: async (id) => {
        await testServer.delete(rota.rotaUsuarios + '/' + id)
    },

    clearAllProductsFromDBButMockData: async (authorization) => {
      const listaProdutos = await testServer.get(rota.rotaProdutos).set('Authorization', authorization)
      const body = listaProdutos.body.produtos
      const listaIds = body.map(function(item){
      return item._id;
      })
      
      listaIds.forEach(async function(id, i) {
        await testServer.delete(rota.rotaProdutos + '/' + id).set('Authorization', authorization)
      })
    },

    clearAllCartsFromDBButMockData: async (authorization) => {
        const response = await testServer.delete(rota.rotaConcluirCompra).set('Authorization', authorization)
      }
}