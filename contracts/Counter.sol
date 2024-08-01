// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

contract Counter {
    uint256 private value;

    function getValue() external view returns (uint256) {
        return value;
    }

    function increment() external {
        value += 1;
    }

    function reset() external {
        value = 0;
    }
}
