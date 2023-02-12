import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
   } from 'wagmi'
   
   export function Connect() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    const { disconnect } = useDisconnect()
   
    if (isConnected) {
    return (
        <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector.name}</div>
        <button onClick={disconnect}>Disconnect</button>
        </div>
    )
    }
   
    return (
        <div>
        {connectors.map((connector) => (
        <button
        disabled={!connector.ready}
        key={connector.id}
        onClick={() => connect({ connector })}
        >
        {connector.name}
        {!connector.ready && ' (unsupported)'}
        {isLoading &&
        connector.id === pendingConnector?.id &&
        ' (connecting)'}
        </button>
        ))}
    
        {error && <div>{error.message}</div>}
    </div>
    )
   }
   