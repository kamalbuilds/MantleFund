import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StateProvider } from "./context";
import { wagmiClient } from "./utils/wagmi_client";
import { WagmiConfig } from "wagmi";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <WagmiConfig client={wagmiClient}>
      <MantineProvider
        emotionCache={myCache}
        withGlobalStyles
        theme={{
          colorScheme: "dark",
          primaryColor: "green",
          defaultGradient: {
            from: "blue",
            to: "green",
            deg: 10,
          },
        }}
      >
        <NotificationsProvider position="top-right">
          <Router>
            <StateProvider>
              <App />
            </StateProvider>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </WagmiConfig>
  </ThirdwebProvider>
);
