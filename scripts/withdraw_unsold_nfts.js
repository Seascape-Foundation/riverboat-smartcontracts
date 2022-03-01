let Riverboat = artifacts.require("Riverboat");
let RiverboatNft = artifacts.require("RiverboatNft");


// global variables
let accounts;
let multiplier = 1000000000000000000;

module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function(networkId) {

    //--------------------------------------------------
    // Accounts and contracts configuration
    //--------------------------------------------------

    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    let riverboat = await Riverboat.at("0x983D3460Fc959ee933EdCd766CfefC9cF9aFc637");
    let riverboatNft     = await RiverboatNft.at("0x7cDc5D0188733eDF08412EECb9AFa840772615dC");


    let owner = accounts[0];
    console.log(`Using account ${owner}`);

    //--------------------------------------------------
    // Parameters setup and function calls
    //--------------------------------------------------

    // let sessionId = parseInt(await riverboat.sessionId.call());
    // sessionId = console.log(`last session id: ${sessionId}`);
    let receiverAddress = "0x394F8B1305Fb835F43561a1675D9Dc1F55908eb4";

    // let sessionId = await riverboat.sessionId();
    // console.log(`Session ID: ${sessionId}`);

    // contract calls
    // await approveUnsoldNfts();
    await withdrawNfts([592, 593, 594, 595, 596, 597, 598, 599]);

    //--------------------------------------------------
    // Functions operating the contract
    //--------------------------------------------------

    // approve withdrawal of unsold nfts - after session end
    async function approveUnsoldNfts(){
      console.log("attempting to approve unsold nfts...");
      await riverboat.approveUnsoldNfts(sessionId, owner, {from: owner});

      console.log("Checking if Nfts are approved ?")
      let approved = await riverboatNft.isApprovedForAll(riverboat.address, owner);
      console.log(approved);
    }

    async function withdrawNfts(nfts){
      if (!nfts) {
        // while(true){
        //   let tokenId = await riverboatNft.tokenOfOwnerByIndex(riverboat.address, 0).catch(console.error);
        //   tokenId = parseInt(tokenId);
        //   if(tokenId == NaN){
        //     console.log("no more nfts in the contract");
        //     break;
        //   }
        //   // TODO check allowance for given nftId

        //   console.log(`attempting to withdraw nft id ${tokenId}`);
        //   await riverboatNft.safeTransferFrom(riverboat.address, receiverAddress, tokenId, {from: owner});
        //   console.log(`${tokenId} was transfered`);
        // }
      } else {
        for (var tokenId of nfts) {
          console.log(`attempting to withdraw nft id ${tokenId}`);
          await riverboatNft.safeTransferFrom(riverboat.address, receiverAddress, tokenId, {from: owner}).catch(console.error);
          console.log(`${tokenId} was transfered`);
          
        }
      }
    }



}.bind(this);
