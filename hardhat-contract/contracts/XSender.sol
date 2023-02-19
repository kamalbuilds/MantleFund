// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

/**
 * @title Sender
 */
contract XSender is IXReceiver {
  // The Connext contract on this domain
  IConnext public immutable connext;

  // Number of msges this contract has received back
  uint256 public msgrecievedback;

  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  /** 
   * @notice Sends the fund across chain.
   * @param destinationDomain The destination domain ID. 
   * @param target Address of the Reciever contract on the destination domain.
   * @param relayerFee The fee offered to relayers.
   */
  function Fund(
    address target, 
    uint32 destinationDomain, 
    uint256 relayerFee
  ) external payable {
    require(
      msg.value == relayerFee,
      "Must send gas equal to the specified relayer fee"
    );

    // Include the relayerFee so Reciever will use the same fee 
    // Include the address of this contract so Reciever will know where to send the "callback"
    bytes memory callData = abi.encode(msgrecievedback, address(this), relayerFee);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: domain ID of the destination chain
      target,            // _to: address of the target contract (Reciever)
      address(0),        // _asset: use address zero for 0-value transfers
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      0,                 // _amount: 0 because no funds are being transferred
      0,                 // _slippage: can be anything between 0-10000 because no funds are being transferred
      callData           // _callData: the encoded calldata to send
    );
  }

  /** @notice The receiver function as required by the IXReceiver interface.
   * @dev The "callback" function for this example. Will be triggered after Reciever xcalls back.
   */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external returns (bytes memory) {
    uint256 _Recievers = abi.decode(_callData, (uint256));

    msgrecievedback++;
  }
}

