/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/17
 */

import path from 'path';

const PUBLIC_PATH = '';

export default {
    entry: {
        'index': ["babel-polyfill",'./src/js/index.js'],
        'contract': ["babel-polyfill",'./src/js/contract.js'],
        'observation': ["babel-polyfill",'./src/js/observation.js'],
        'cancelObser': ["babel-polyfill",'./src/js/cancelObser.js'],
        // 'bonus': ['./src/js/bonus.js'],
        // 'grab': ['./src/js/grab.js'],
        // 'wallet': ['./src/js/wallet.js'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: PUBLIC_PATH,
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(tpl|html)$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader',
                    'sass-loader'
                ]
                // loaders: ["style", "css", "sass"]
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    "ignore": [ "./src/dep/api.js"]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: ['url?limit=8000&name=img/[name].[ext]']
            },
            {
                test: /\.(svg|woff|ttf|eot)$/i,
                loaders: [
                    'file-loader?name=font/[name].[ext]'
                ]
            },
            {
                test: /\.(mp3|wav)$/,
                loader: "file-loader?name=audio/[name].[ext]"
            }
        ],
        resolve: {
            root: path.resolve(__dirname, 'src'),
            modulesDirectorie: ['node_modules'],
            extensions: ['', '.js', '.css', '.scss', '.png', '.jpg', 'gif']
        }
    },
    vue:{
        postcss: [
            require('autoprefixer')()
        ]
    },
    postcss: [
        require('autoprefixer')()
    ],
    plugins: [

    ],
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vue-resource': 'VueResource',
        'moment': 'moment',
        'lodash': '_',
        'bignumber.js': 'BigNumber',
        'act-jsapi': 'act_jsapi'
    }
}