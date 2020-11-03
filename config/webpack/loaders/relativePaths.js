const path = require("path");

function srcPath(subdir) {
  return path.join("../../..", subdir);
}
module.exports = {
  resolve: {
    alias: {
      ui: srcPath("app/ui"),
    },
  },
};
