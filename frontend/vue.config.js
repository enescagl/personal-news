module.exports = {
  devServer: {
    proxy: `${process.env.VUE_APP_PUBLIC_DOMAIN}`,
    https: false,
    host: "0.0.0.0",
    port: 80,
    allowedHosts: ["*"],
  },
  configureWebpack: {
    plugins: [require("unplugin-icons/webpack")({})],
  },
};
