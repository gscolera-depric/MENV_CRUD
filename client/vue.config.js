const path = require('path');
const out = path.resolve(__dirname, '../public');

module.exports = {
  "devServer": {
    "host": "0.0.0.0",
    "port": 8080,
    "proxy": "http://192.168.0.33:7878"
  },
  "outputDir": out,
}