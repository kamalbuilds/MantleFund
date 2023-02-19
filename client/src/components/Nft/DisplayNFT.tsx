import { useState, useEffect } from "react";
import { ethers } from "ethers";

type NFT = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export function NFTList() {
  const [nfts, setNFTs] = useState<NFT[]>([]);

  

  useEffect(() => {
    const fetchNFTs = async () => {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://sleek-lingering-market.ethereum-goerli.discover.quiknode.pro/3f5cc6bcbbd5bb4ac343e9673d1db6352f917c7f/"
          );
          const connection = { ...provider.connection, headers: { "x-qn-api-version": 1 } };
          const network = {
            name: "custom",
            chainId: 5,
            url: provider.connection.url,
            headers: { "x-qn-api-version": 1 },
          };
          const providerWithHeaders = new ethers.providers.JsonRpcProvider(provider.connection.url, network);
          
          
          
      const nftCollectionDetails = await providerWithHeaders.send("qn_fetchNFTCollectionDetails", [
        {
          contracts: [
            "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
            "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",
          ],
        },
      ]);
      const allNFTs: NFT[] = [];

      for (const contractAddress in nftCollectionDetails) {
        const nfts = nftCollectionDetails[contractAddress].nfts;
        for (const nft of nfts) {
          const { id, name, description, image } = nft;
          allNFTs.push({ id, name, description, image });
        }
      }

      setNFTs(allNFTs);
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      {nfts.map((nft) => (
        <div key={nft.id}>
          <h2>{nft.name}</h2>
          <p>{nft.description}</p>
          <img src={nft.image} alt={nft.name} />
        </div>
      ))}
    </div>
  );
}
