import { AppShell, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import CampaignDetails from "./pages/CampaignDetails";
import CreateCampaign from "./pages/CreateCampaign";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Connect from "./pages/Connect";
// importing the context
import { AssetPriceContext, useAssetPrice } from '../src/context/AssetPriceContext';
import { EthBalance } from '../src/pages/EthBalance';
import { Web3Context } from "./context/web3Context";
import { EnvContext } from "./context/envContext";
import NotificationsTest from "./pages/Notifications";
import { useState } from "react";
import { Footer } from "./components/Footer";
import {MantleNFT} from "./pages/MantleNFT";

interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}

const web3Data : Web3ReactState = {
  chainId: 5_001,
  account: "0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb",
  active: true,
  error: undefined,
  library: undefined,
}
const env ="staging";

const App = () => {
  const assetPrice = useAssetPrice();
  const [isCAIP, setIsCAIP] = useState(false);

  return (
    <div>
      <EnvContext.Provider value={{ env, isCAIP }}>
        <Web3Context.Provider value={web3Data}>
          <AssetPriceContext.Provider value={assetPrice}>
            <AppShell padding="md" navbar={<Navbar />} header={<Header />} footer={<Footer />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-campaign" element={<CreateCampaign />} />
                <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                <Route path="/Connect" element={<Connect />} />
                <Route path="/analyse" element={<EthBalance />} />
                <Route path="/claim" element={<MantleNFT />} />
                <Route path="/notifications" element={<NotificationsTest />} />
                {/* will be updated to manage the flow later */}
              </Routes>
            </AppShell>.
          </AssetPriceContext.Provider>
        </Web3Context.Provider>
      </EnvContext.Provider>
    </div>
  );
};

export default App;
