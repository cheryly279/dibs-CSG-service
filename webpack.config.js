const webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",

    entry: "./index.js",

    target: 'node',

    output: {
        filename: "index.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: ['', '.js', '.json']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.json$/,
                loader: require.resolve('json-loader')
            }
        ]
    }
};
