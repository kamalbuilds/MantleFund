// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal goerli;

    /**
     * Network: Sepolia
     * Aggregator: ETH/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        goerli = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);


        

    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = goerli.latestRoundData();
        return price;
    }
}
