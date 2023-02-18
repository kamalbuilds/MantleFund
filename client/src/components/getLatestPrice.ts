import { providers, Contract, BigNumber } from 'ethers'
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
// const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/vlMYM7SS4B_MuOraw_QHcBGza_ZCS1Nw")
const addr = '0x9326BFA02ADD2366b30bacB125260Af641031331';
const ETH_USD_RATE_ADDRESS = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
// const priceFeed = new Contract(ETH_USD_RATE_ADDRESS, aggregatorV3InterfaceABI, provider)


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

const daiusd = "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19";

export function getLatestPricedai(): Promise<BigNumber[]> {
  const priceFeed = new ethers.Contract(daiusd, aggregatorV3InterfaceABI, provider)
return priceFeed.latestRoundData()
}