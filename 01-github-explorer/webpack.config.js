const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
//jeito especial de exportar os arquivos do webpack para as determinadas pastas
module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: { //isso aqui serve para configurar o live server do webpack
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin,
        new HtmlWebpackPlugin ({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    //a parte de cógido abaixo serve para determinar quais as regras que ele vai seguir pra cada tipo de arquivo
    module: {
        rules:[
            {
                test:/\.(j|t)sx$/, //regex para saber se o arquivo é js
                exclude: /node_modules/, //essa pasta n deve ser traduzida pelo webpack, esse processo é responsabilidade da própria biblioteca e ela faz sozinha
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }, //dependência que é uma integração entre o babel e o webpack
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    }
}   