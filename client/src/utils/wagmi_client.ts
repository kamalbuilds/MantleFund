import { ArcanaConnector } from "@arcana/auth-wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { configureChains, createClient, Chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export const connector = (chains: Chain[]) => {
  return new ArcanaConnector({
    chains,
    options: {
      appId: `9e0c6715d9ea7aab73535c8c359d8b45ac2587bc`,
    },
  });
};

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [connector(chains)],
  provider,
});
