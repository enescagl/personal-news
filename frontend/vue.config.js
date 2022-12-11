module.exports = {
  devServer: {
    public: process.env.VUE_APP_PUBLIC_DOMAIN,
    https: false,
    host: "0.0.0.0",
    port: 80,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
};
