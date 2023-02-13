import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';
const arcana_app_address ="9fd9920a68eaf5f65f8011a1f84ed14a3f121d2c";

// wagmi 

import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
 

import { ArcanaConnector } from "@arcana/auth-wagmi";



// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)
 
// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    new ArcanaConnector({
      chains: [mainnet],
      options: {
        appId: `${arcana_app_address}`,// appId = App Address
        theme: 'dark',            // Defaults to 'dark'
        alwaysVisible: false,      // Defaults to true
        position: 'left'           // Defaults to 'right'
      },
    }),
  ],
  provider,
  webSocketProvider,
})

import {Connect } from "../src/pages/Connect";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WagmiConfig client={client}>
    <ThirdwebProvider desiredChainId={ChainId.Goerli}> 
      <Router>
        <StateContextProvider>
          <Connect />
          <App />
        </StateContextProvider>
      </Router>
    </ThirdwebProvider> 
  </WagmiConfig>
)