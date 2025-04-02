const { defineConfig } = require('@vue/cli-service')
const dotenv = require('dotenv');
dotenv.config();

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {  // Ajout du préfixe "/api"
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Supprime "/api" avant d'envoyer la requête au backend
      },
    },
  },
};
