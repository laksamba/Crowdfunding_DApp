// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./CrowdFunding.sol";


contract CrowdFundingFactory {
    address[] public campaigns;

    event campaignCreated(address indexed campaignAddress, string title, address beneficiary);


    function createCampaign(
        string memory _title,
        string memory _description,
        address _beneficiary,
        uint256 _goal,
        uint256 _durationInDays
    ) public returns(address){
        CrowdFunding newCampaign = new CrowdFunding(
            _title,
            _description,
            _beneficiary,
            _goal,
            _durationInDays
        );

        campaigns.push(address(newCampaign));
        emit campaignCreated(address(newCampaign), _title, _beneficiary);
        return address(newCampaign);
    }

    function getCampaigns() public view returns(address[] memory){
        return campaigns;
    }
}