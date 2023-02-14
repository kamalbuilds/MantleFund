export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization
export const url =
  "https://eth-goerli.g.alchemy.com/v2/vlMYM7SS4B_MuOraw_QHcBGza_ZCS1Nw";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
