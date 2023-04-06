// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Campaign.sol";

contract Factory {
    struct CampaignSummary {
        address deployedAddress;
        string title;
    }

    CampaignSummary[] public campaigns;

    function createCampaign(uint _minimum, string memory _title) public {
        address newCampaignAddress = address(
            new Campaign(_minimum, msg.sender, _title)
        );
        campaigns.push(CampaignSummary(newCampaignAddress, _title));
    }

    function getCampaigns() public view returns (CampaignSummary[] memory) {
        return campaigns;
    }
}
