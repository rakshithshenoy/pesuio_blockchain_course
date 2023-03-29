const Factory = require("./build/contracts/Factory.json");
const Campaign = require("./build/contracts/Campaign.json");
const web3 = require("./web3");

const factoryInstance = new web3.eth.Contract(
  Factory.abi,
  "0xaFB221062ba245436be11C97dC4bfa27d42ABB16"
);
console.log(factoryInstance);

const campaignInstance = (address) =>
  new web3.eth.Contract(Campaign.abi, address);

module.exports = { factoryInstance, campaignInstance };
