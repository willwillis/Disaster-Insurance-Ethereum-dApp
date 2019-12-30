const Lassie = artifacts.require("Lassie");

module.exports = function(deployer) {
  const name = "State of California Fire Protection Insurance Contract";
  const contractState = 0;
  const responderState = 0;

  deployer.deploy(Lassie, name, contractState, responderState);
};
