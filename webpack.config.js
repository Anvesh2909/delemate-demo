module.exports = {
    // other configurations...
  
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules\/(?!undici))/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ]
    },
    
    // other configurations...
  };
  