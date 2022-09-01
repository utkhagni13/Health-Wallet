const medChain = artifacts.require("MedicalChain");

module.exports = function (deployer) {
    deployer.deploy(medChain);
};
