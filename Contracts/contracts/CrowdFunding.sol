// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdFunding is Ownable {
    string public title;
    string public description;
    address public beneficiary;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalRaised;
    string public image;
    bool public ended;

    mapping(address => uint256) public donations;

    event Donated(address indexed donator, uint256 amount);
    event DonatorAddress(address indexed donator);
    event Withdrawn(address indexed beneficiary, uint256 amount);
    event CampaignEnded(uint256 totalRaised);

    modifier campaignActive() {
        require(block.timestamp < deadline && !ended, "Campaign has ended");
        _;
    }

    modifier campaignEnded() {
        require(block.timestamp >= deadline || ended, "Campaign not ended");
        _;
    }

    constructor(
        string memory _title,
        string memory _description,
        address _beneficiary,
        uint256 _goal,
        uint256 _durationInDays,
        string memory _image
    ) Ownable(msg.sender) {
        title = _title;
        description = _description;
        beneficiary = _beneficiary;
        goal = _goal;
         image = _image;
        deadline = block.timestamp + (_durationInDays * 1 days);
    }

    // donate 
    function donate() public payable campaignActive {
        require(msg.value > 0, "Donation must be greater than 0");
        donations[msg.sender] += msg.value;
        totalRaised += msg.value;
        emit Donated(msg.sender, msg.value);
        emit DonatorAddress(msg.sender);
    }

    // beneficiary withdraws funds
    function withdraw() public campaignEnded {
        require(msg.sender == beneficiary, "Only beneficiary can withdraw");
        // require(!ended, "Campaign already ended");

        uint256 amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");

        ended = true;
        (bool success, ) = payable(beneficiary).call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawn(beneficiary, amount);
        emit CampaignEnded(totalRaised);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getProgress() public view returns (uint256 raised, uint256 goalAmount, bool goalMet) {
        return (totalRaised, goal, totalRaised >= goal);
    }

    // emergency; owner can end early if needed 
    function endCampaign() public {
    require(msg.sender == beneficiary, "Only beneficiary can end the campaign");
    require(!ended, "Campaign already ended");
    ended = true;
    emit CampaignEnded(totalRaised);
}


    // receive ETH fallback 
    receive() external payable {
        donate();
    }
}
