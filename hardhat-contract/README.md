A pair of Solidity contracts designed to work with Connext cross-chain communication and payment channels.

The first contract is XSender.sol and has a function called Fund, which sends funds to another contract on another blockchain using Connext's cross-chain communication protocol. It takes in 3 parameters:

target - the address of the receiving contract on the other blockchain
destinationDomain - the ID of the destination blockchain where the receiving contract resides
relayerFee - the fee offered to relayers for processing this transaction
The function creates a call to connext.xcall, which sends the relayerFee to the destination blockchain and calls the xReceive function of the IXReceiver interface on the receiving contract with encoded callData. callData is an array of bytes that includes information about the transaction, including msgrecievedback, the address of XSender contract, and relayerFee.

The second contract is called XReciever.sol and is designed to be deployed on the receiving end of the cross-chain communication. It includes an xReceive function which is called by the Fund function on the sending contract via Connext's cross-chain communication protocol. The xReceive function takes in several parameters, including _amount, _asset, _originSender, and _origin. It then decodes the callData and processes the transaction accordingly.

If the xReceive function is successful, it sends a "pong" message back to the XSender contract via a nested xcall with the same relayerFee.