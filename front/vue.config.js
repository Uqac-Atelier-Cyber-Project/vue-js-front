const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://192.168.2.111:8090', // Adresse du serveur backend
        changeOrigin: true,
      },
    },
  },
};
