const path = require('path');

module.exports = {
  devServer: {
    watchOptions: {
      poll: true,
    },
  },
  outputDir: path.join(__dirname, '..', 'server/src/public'),
};
