const path = require("path");

// 设置全局变量以及vux样式的修改
const lessTheme = {
  name: "less-theme",
  path: path.resolve(__dirname, "src/assets/css/theme.less")
};

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => Object.assign({}, options, { name: "img/[name].[ext]" }));
  },
  // configureWebpack: {
  //   output: {
  //     filename: "js/[name].js",
  //     chunkFilename: "js/[name].js"
  //   }
  // },
  configureWebpack: config => {
    require("vux-loader").merge(config, {
      options: {},
      plugins: ["vux-ui", lessTheme]
    });
  },
  css: {
    extract: {
      filename: "/css/[name].css",
      chunkFilename: "/css/[name].css"
    },
    loaderOptions: {
      // pass options to sass-loader---configureWebpack中设置了lessTheme全局的主题样式，此处将失效
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "../assets/css//variables.scss";`
      }
    }
  }
};
