const path = require('path')


module.exports = {
    entry: './build/main.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
}
