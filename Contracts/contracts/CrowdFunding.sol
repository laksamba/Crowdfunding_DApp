// SPDX-License-Identifier: UNLICENSED 

pragma solidity ^0.8.28;

contract CrowdFunding is Ownable{
    string public title;
    string public description;
    address public beneficiary;
    uint256 public goal;
    uint256 public deadline;
    uint256 public totalRaised;
    bool public ended;

    mapping(address => uint256) public donations;

    event Donated(address indexed donator , uint256 amount);
    event DonatorAddress(address)
}
