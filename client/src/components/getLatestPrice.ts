import { providers, Contract, BigNumber } from 'ethers'
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider("https://sleek-lingering-market.ethereum-goerli.discover.quiknode.pro/3f5cc6bcbbd5bb4ac343e9673d1db6352f917c7f/");
// using QUICKNODE rpc PROVIDER

const BTC_USD_RATE_ADDRESS = '0xA39434A63A52E749F02807ae27335515BA4b07F7';
const ETH_USD_RATE_ADDRESS = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
const EUR_USD_RATE_ADDRESS = "0x44390589104C9164407A0E0562a9DBe6C24A0E05";


const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ]

export function getLatestPrice(): Promise<BigNumber[]> {
    const priceFeed = new ethers.Contract(ETH_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)
  return priceFeed.latestRoundData()
}

export function getLatestPricebtc(): Promise<BigNumber[]> {
  const priceFeed = new ethers.Contract(BTC_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)
return priceFeed.latestRoundData()
}

export function getLatestPriceeur(): Promise<BigNumber[]> {
  const priceFeed = new ethers.Contract(EUR_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)
return priceFeed.latestRoundData()
}

