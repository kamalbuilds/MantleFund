import { AppShell } from "@mantine/core";
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

interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}

const web3Data : Web3ReactState = {
  chainId: 3_141,
  account: "0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132",
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
            <AppShell padding="md" navbar={<Navbar />} header={<Header />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-campaign" element={<CreateCampaign />} />
                <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                <Route path="/Connect" element={<Connect />} />
                <Route path="/ethbalance" element={<EthBalance />} />
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
