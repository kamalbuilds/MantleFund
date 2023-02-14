import { useAccount, useConnect } from "wagmi";


export default function Connect() {
  const { connector, address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div className="main">
      {isConnected && (
        <div className="connected-msg">
          Connected to {connector?.name} with address {address}
        </div>
      )}
      {!isConnected &&
        connectors.map((connector) => (
          <button
            className="connect-btn"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            Connect to {connector.name}
            {isLoading &&
              pendingConnector?.id === connector.id &&
              " (connecting)"}
          </button>
        ))}
      {error && <div>{error.message}</div>}
      
    </div>
  );
}
