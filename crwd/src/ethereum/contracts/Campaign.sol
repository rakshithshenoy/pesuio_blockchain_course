//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Campaign {
    address public manager;
    string public title;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    uint numRequests;
    mapping(uint => Request) requests;

    constructor(uint _minimum, address _manager, string memory _title) {
        manager = _manager;
        minimumContribution = _minimum;
        title = _title;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "The contribution is too less"
        );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory _description,
        uint _value,
        address _recipient
    ) public restricted {
        require(approvers[msg.sender], "Only manager can create requests");
        Request storage r = requests[numRequests++];
        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
        r.complete = false;
        r.approvalCount = 0;
    }

    function approveRequest(uint _requestId) public {
        Request storage newReq = requests[_requestId];

        require(approvers[msg.sender]);
        require(!newReq.approvals[msg.sender]);

        newReq.approvals[msg.sender] = true;
        newReq.approvalCount++;
    }

    function finalizeRequest(uint _requestId) public restricted {
        Request storage newReq = requests[_requestId];

        require(newReq.approvalCount > (approversCount / 2));
        require(!newReq.complete);

        (bool sent, ) = payable(address(newReq.recipient)).call{
            value: newReq.value
        }("");
        require(sent, "Failed to send Ether");
        newReq.complete = true;
    }

    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }

    function getRequest(
        uint _requestId
    ) public view returns (string memory, uint, address, bool, uint) {
        Request storage newReq = requests[_requestId];
        return (
            newReq.description,
            newReq.value,
            newReq.recipient,
            newReq.complete,
            newReq.approvalCount
        );
    }
}
