const Factory = require("./build/contracts/Factory.json");
const Campaign = require("./build/contracts/Campaign.json");
const web3 = require("./web3");

const factoryInstance = new web3.eth.Contract(
  Factory.abi,
  "0xe9F36A15dF0fedC798e67984ff43c6c12b693b14"
);
// console.log(factoryInstance);

const campaignInstance = (address) =>
  new web3.eth.Contract(Campaign.abi, address);

module.exports = { factoryInstance, campaignInstance };
