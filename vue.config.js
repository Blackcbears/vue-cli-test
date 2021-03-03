const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const assetsCDN = {
  js: ["//at.alicdn.com/t/font_1564214_4f01xrbmbjk.js"]
};

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527;
const name = "vue Element Admin"; // page title

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require("./mock/mock-server.js")
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack: config => {
    // 生产环境下使用CDN
    config.plugin("html").tap(args => {
      args[0].cdn = assetsCDN;
      return args;
    });
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        modules: {
          localIdentName: "[name]__[hash:5]"
        },
        localsConvention: "camelCaseOnly"
      }
    }
  }
};
