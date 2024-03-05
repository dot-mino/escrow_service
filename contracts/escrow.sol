// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow{
    address public agent;
    address public depositor;
    address public beneficiary;
    bool public isApproved;

    event Approved(uint balance);

    constructor(address _agent, address _beneficiary) payable {
        depositor = msg.sender;
        agent = _agent;
        beneficiary = _beneficiary;
    }

    function approve() external{
        require(msg.sender == agent, "You are not the escrow agent");
        (bool sent, ) = beneficiary.call{ value: address(this).balance }("");
        require(sent, "Failed to send ether");
        isApproved = true;
        emit Approved(address(this).balance);
    }
}
