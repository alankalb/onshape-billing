const { environment } = require("@rails/webpacker");
const typescript = require("./loaders/typescript");
const relativePaths = require("./loaders/relativePaths");
const sass = require("./loaders/sass");
const graphql = require("./loaders/graphql");

environment.loaders.prepend("typescript", typescript);
environment.loaders.prepend("relativePaths", relativePaths);
environment.loaders.prepend("sass", sass);
environment.loaders.prepend("graphql", graphql);
module.exports = environment;
