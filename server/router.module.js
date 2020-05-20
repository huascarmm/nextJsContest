const routes = require("next-routes")();
const config = require('../src/routing.config');

config.forEach((route) => routes.add(route))

// define named routes
module.exports = routes;
