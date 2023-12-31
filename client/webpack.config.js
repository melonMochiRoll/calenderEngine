const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/client.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      Api: path.resolve(__dirname, 'src/api/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Hooks: path.resolve(__dirname, 'src/hooks/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Routes: path.resolve(__dirname, 'src/routes/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Typings: path.resolve(__dirname, 'src/typings/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react'],
            ],
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    open: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};