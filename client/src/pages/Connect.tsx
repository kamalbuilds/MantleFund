import { useAccount, useConnect } from "wagmi";


export default function Connect() {
  const { connector, address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <button className="main justify-self-center bg-indigo-500 p-6 rounded-full ring-2 ring-blue-500 place-self-center">
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
      
    </button>
  );
}
