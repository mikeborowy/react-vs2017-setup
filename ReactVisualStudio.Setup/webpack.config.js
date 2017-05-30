/// <binding BeforeBuild='Run - Development' AfterBuild='Run - Development' />
"use strict";

var path = require('path');
var webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: {
        app: "./app/index.js"
    },
    output: {
        path: __dirname + "/scripts",
        filename: "bundle.js"
    },
    plugins: [
        new ExtractTextPlugin('../styles/style.css'),
        new webpack.optimize.OccurrenceOrderPlugin(), //optimizes the order files are bundled
        new webpack.optimize.DedupePlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(__dirname, 'app'),
            exclude: /(node_modules)/,
            loader: "babel-loader"
        },
        {
            test: /\.json$/,
            exclude: /(node_modules)/,
            loader: "json-loader"
        },
 
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
        // Font Definitions
        { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=../fonts/[name].[ext]' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&name=../fonts/[name].[ext]' },
        { test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=../fonts/[name].[ext]' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=../fonts/[name].[ext]' },
        //Images
        {
            test: /\.(jpg|jpeg|gif|png)$/,
            exclude: /(node_modules)/,
            loader: "file-loader?name=../images/[name].[ext]"
        },
        //{
        //    test: /\.(jpg|jpeg|gif|png)$/,
        //    exclude: /node_modules/,
        //    loaders: [
        //        'file?name=../images/[name].[ext]',
        //        'image-webpack-loader?progressive=true&optimizationLevel=7&interlaced=true'
        //    ]
        //}
        ]
    }
};