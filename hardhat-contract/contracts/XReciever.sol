// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

interface ISender {
  function sendMsg(
    uint32 destinationDomain, 
    address target,
    uint256 relayerFee
  ) external payable;
}

/**
 * @title XSender
 */
contract  XSender is IXReceiver {
  // The Connext contract on this domain
  IConnext public immutable connext;

  // Number of msgs this contract has received
  uint256 public msgsent;

  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  /** 
   * @notice Sends a pong to the sender contract.
   * @param destinationDomain The destination domain ID.
   * @param target Address of the sender contract on the destination domain.
   * @param relayerFee The fee offered to relayers. 
   */
  function sendMsg(
    uint32 destinationDomain, 
    address target,
    uint256 relayerFee
  ) internal {
    // Include some data we can use back on sender
    bytes memory callData = abi.encode(msgsent);

    connext.xcall{value: relayerFee}(
      destinationDomain, // _destination: Domain ID of the destination chain
      target,            // _to: address of the target contract (sender)
      address(0),        // _asset: use address zero for 0-value transfers
      msg.sender,        // _delegate: address that can revert or forceLocal on destination
      0,                 // _amount: 0 because no funds are being transferred
      0,                 // _slippage: can be anything between 0-10000 because no funds are being transferred
      callData           // _callData: the encoded calldata to send
    );
  }

  /** 
   * @notice The receiver function as required by the IXReceiver interface.
   * @dev The Connext bridge contract will call this function.
   */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address _originSender,
    uint32 _origin,
    bytes memory _callData
  ) external returns (bytes memory) {
    // Because this call is *not* authenticated, the _originSender will be the Zero Address
    // sender's address was sent with the xcall so it can be decoded and used for the nested xcall
    (
      uint256 _msgrecievedback, 
      address _senderContract, 
      uint256 _relayerFee
    ) = abi.decode(_callData, (uint256, address, uint256));
    
    msgsent++;

    // This contract sends a nested xcall with the same relayerFee value used for sender. That means
    // it must own at least that much in native gas to pay for the next xcall.
    require(
      address(this).balance >= _relayerFee,
      "Not enough gas to pay for relayer fee"
    );

    // The nested xcall
    sendMsg(_origin, _senderContract, _relayerFee);
  }

  /** 
   * @notice This contract can receive gas to pay for nested xcall relayer fees.
   */
  receive() external payable {}
  
  fallback() external payable {}
}