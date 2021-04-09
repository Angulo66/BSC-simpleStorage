const Token = artifacts.require("Token");
const SimpleStorage = artifacts.require('SimpleStorage');

module.exports = async function (deployer) {
  deployer.deploy(Token);
  deployer.deploy(SimpleStorage);
};
