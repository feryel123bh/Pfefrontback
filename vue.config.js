module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'https://localhost:7186',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/"
};
