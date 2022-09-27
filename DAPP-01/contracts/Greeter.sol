// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract Greeter {
    string private greetings;

    constructor(string memory _greetings) {
        greetings = _greetings;
    }

    function setGreetings(string memory _greetings) public {
        greetings = _greetings;
    }

    function getGreetings() public view returns (string memory) {
        return greetings;
    }
}
