const packageJson = require("../package.json");
const packageLockJson = require("../package-lock.json");

module.exports.helpersPackageJson = (context, complete, modules) => {
  complete()
    .setBody(packageJson)
    .done();
};

module.exports.helpersPackageLockJson = (context, complete, modules) => {
  complete()
    .setBody(packageLockJson)
    .done();
};

module.exports.helpersGetSecurityContext = (context, complete, modules) => {
  const securityContext = modules.requestContext.getSecurityContext();

  complete()
    .setBody({ securityContext })
    .done();
};
