const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {  // Ajout du préfixe "/api"
        target: 'http://192.168.2.111:8090',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Supprime "/api" avant d'envoyer la requête au backend
      },
    },
  },
};
