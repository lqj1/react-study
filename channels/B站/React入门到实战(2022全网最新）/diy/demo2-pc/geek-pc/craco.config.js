// 添加自定义对于webpack的配置
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
const path = require('path')
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定，使用 @ 表示src文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // cdn配置
    // webpack 配置
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig 自动注入的 webpack 配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后 return 出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只在生产环境才配置
      whenProd( ()=> {
        webpackConfig.externals = {
          // 这里就是将 react 和 react-dom 这两个包提取出去，然后通过 cdn 引入
          // key: 需要不参与打包的具体的包
          // value: cdn文件中，挂载于全局的变量名称，为了替换之前在开发环境下
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组，公共资源
        // 实际开发的时候，用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            // 这里的内容会渲染到下面 script 中
            'https://cdn.boot.../react.production.min.js',
            'https://cdn.boot.../react.production.min.js',
          ],
          css: []
        }
      })
      // 都是为了将来配置 HtmlWebpackPlugin插件，将来在 public/index.html 注入
      // cdn资源数组时，准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      if( isFound ) {
        // 找到了 HtmlWebpackPlugin 的插件
        match.userOptions.cdn = cdn
      }
      return webpackConfig
    }
  }
}