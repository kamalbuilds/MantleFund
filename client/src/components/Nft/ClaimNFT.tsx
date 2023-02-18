import { useContract } from '@thirdweb-dev/react';
import { useClaimNFT } from '@thirdweb-dev/react';

export const ClaimNFT = () => {
    const { contract } = useContract("0x31Fd8c44a1869C48D054d8431Fb8F62C746494EF", "edition-drop");
    const {
      mutate: claimNft,
      isLoading,
      error,
    } = useClaimNFT(contract);
  
    if (error) {
      console.error("failed to claim nft", error);
    }
  
    return (
    <>
      <button
        disabled={isLoading}
        onClick={() => claimNft({ to: "0x...", quantity: 1 })}
      >
        Claim NFT!
      </button>
      <iframe
    src="https://gateway.ipfscdn.io/ipfs/QmRHAgPic1HeakAw9EU7WRjt4NPE19pWb8hCorRNhw4Zdy/erc1155.html?contract=0x31Fd8c44a1869C48D054d8431Fb8F62C746494EF&chainId=5001&tokenId=1"
    width="600px"
    height="600px"
    ></iframe>

</>
    );
  };