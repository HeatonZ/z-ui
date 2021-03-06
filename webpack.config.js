const path = require('path');
const fs = require("fs");
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function getEntries() {
    function isDir(dir) {
        return fs.lstatSync(dir).isDirectory();
    }

    const entries = {
        index: path.join(__dirname, `components/index.ts`),
    };
    const dir = path.join(__dirname, "components");
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const absolutePath = path.join(dir, file);
        if (isDir(absolutePath)) {
            entries[file] = path.join(
                __dirname,
                `components/${file}/index.ts`
            );
        }
    });
    return entries;
}
const webpackConfigBase = {
    context: __dirname,
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(png)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader'
                }
            },
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
                    //     {
                    //     loader: 'style-loader'
                    // },
                    {
                        loader:process.env.NODE_ENV === 'production'? MiniCssExtractPlugin.loader:'style-loader',
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]


            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
              exclude: /node_modules/
          }),
        ],
      },
}

let tempConfig = {};

if (process.env.NODE_ENV === 'production') {
    tempConfig = {
        ...webpackConfigBase,
        mode: 'production',
        entry: getEntries(),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: (chunkData) => {
                return chunkData.chunk.name === 'index' ? '[name].js' : 'components/[name]/index.js';
            },
            library: 'ziyong-ui',
            libraryTarget: 'umd',
        },
        externals: [nodeExternals()],
        plugins: [
            new CleanWebpackPlugin(), // 编译之前清空 /dist
            new MiniCssExtractPlugin({
                filename: (chunkData) => {
                    return chunkData.chunk.name === 'index' ? '[name].less' : 'components/[name]/[name].less';
                }
            }),
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                exclude: /node_modules/
            })
        ],
    };
}
else {
    tempConfig = {
        ...webpackConfigBase,
        mode:'development',
        entry: path.join(__dirname, 'example/src/index.tsx'),
        output: {
            path: path.join(__dirname, 'example/dist'),
            filename: 'bundle.js',
            library: 'ziyong-ui',
            libraryTarget: 'umd',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, './example/src/index.html'),
                filename: 'index.html',
                inject: true
            }),
        ],
        devServer: {
            port: 8081,
            host: '127.0.0.1'
        }
    }
}

module.exports = tempConfig;