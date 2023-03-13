module.exports = {
  productionSourceMap:false,
  // 關閉ESLINT校驗工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/zaiBigShop/'
  : '/'
};
