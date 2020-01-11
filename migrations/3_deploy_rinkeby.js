const Lassie = artifacts.require("Lassie");

console.log("Running 3_deploy_rink");

module.exports = function(deployer, network, accounts) {
  const name = "State of California Fire Protection Insurance Contract";
  const contractState = 1;
  const responderState = 1;
  //   console.log("deployer:" + deployer);
  //   console.log("netwrok: " + netwrok);
  //   console.log("accounts: " + accounts);
  deployer.deploy(Lassie, name, contractState, responderState, {
    from: accounts[0]
  });
};
