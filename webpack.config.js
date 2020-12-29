const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals  = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfigBase = {
    context: path.resolve(__dirname),
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    //module此处为loader区域，一般文件内容解析，处理放在此处，如babel，less,postcss转换等
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(less)?$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions:{
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            }
        ]
    }
}

let tempConfig = {};

if (process.env.NODE_ENV === 'production') {
  tempConfig = {
    ...webpackConfigBase,
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    // devtool: 'source-map', 
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"},
    plugins: [
      new CleanWebpackPlugin(), // 编译之前清空 /dist
    ],
  };
} 
else {
  tempConfig = {
    ...webpackConfigBase,
    entry: path.join(__dirname, 'example/src/index.tsx'),
    output: {
      path: path.join(__dirname, 'example/dist'),
      filename: 'bundle.js',
      library: 'laputarenderer',
      libraryTarget: 'umd',
    },
    plugins: [
      // 自动注入编译打包好的代码至 html
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './example/src/index.html'),
        filename: 'index.html',
      }),
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"},
    devServer: {
      // port: 8008,
    },
  }
}

module.exports = tempConfig;