/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (options) => ({
  plugins: options.plugins.concat([
    new Dotenv({
      path: path.resolve(
        __dirname,
        `../enviroments/${process.env.NODE_BRANCH}.env`
      ),
    }),
  ]),
});
