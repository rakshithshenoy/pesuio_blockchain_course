const Factory = require("./build/contracts/Factory.json");
const Campaign = require("./build/contracts/Campaign.json");
const web3 = require("./web3");

const factoryInstance = new web3.eth.Contract(
  Factory.abi,
  "0x75520b69103e31Fb7D5f5081e53aFf466f546d08"
);
// console.log(factoryInstance);

const campaignInstance = (address) => {
  return new web3.eth.Contract(Campaign.abi, address);
};

module.exports = { factoryInstance, campaignInstance };
