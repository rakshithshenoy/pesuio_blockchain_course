//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Campaign.sol";

contract Factory {
    address[] public deployedCampaigns;

    function createCampaign(uint _minimum) public {
        address newCampaign = address(new Campaign(_minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
