let Riverboat = artifacts.require("Rib");


let accounts;

module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function(_networkId) {
  // moonbeam bridge
  // let crownsGlmr = "0x1aBB8FdE5e64be3419FceF80df335C68dD2956C7";
  // let erc20Handler = "0x766E33b910Cd6329a0cBD5F72e48Ec162E38A25D";

  // moonriver
  let crownsMovr = "0x6fc9651f45B262AE6338a701D563Ab118B1eC0Ce";
  let erc20Handler = "0xB1eFA941D6081afdE172e29D870f1Bbb91BfABf7";

  accounts = await web3.eth.getAccounts();

  // contracts
  let token  = await Riverboat.at(crownsMovr);

  // global variables
  let user = accounts[0];
  console.log(`The signer: ${user}`);

  let owner = "";
  try {
    owner = await token.owner();
  } catch (e) {
    console.error(e);
    process.exit(2);
  }
  
  console.log(`Owner of token: ${owner}`)

  let bridged = await token.bridges(erc20Handler)
  console.log(`${erc20Handler} allowed to bridge? ${bridged}`)

  process.exit(1);

  /// call this first
  console.log("attempting to add bridge...");
  try {
    await token.addBridge(erc20Handler, {from: user})
  } catch(err) {
    console.log(err);
    process.exit(1);
  };
  console.log("Bridge was added.");
}.bind(this);
