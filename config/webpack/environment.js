const { environment } = require("@rails/webpacker");
const typescript = require("./loaders/typescript");
const relativePaths = require("./loaders/relativePaths");

environment.loaders.prepend("typescript", typescript);
environment.loaders.prepend("relativePaths", relativePaths);
module.exports = environment;
