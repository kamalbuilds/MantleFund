import React from 'react';
import { Chat } from '@pushprotocol/uiweb';

export const Footer = () => {

//   const theme: ITheme = {
//     bgColorPrimary: 'gray',
//     bgColorSecondary: 'purple',
//     textColorPrimary: 'white',
//     textColorSecondary: 'green',
//     btnColorPrimary: 'red',
//     btnColorSecondary: 'purple',
//     border: '1px solid black',
//     borderRadius: '40px',
//     moduleColor: 'pink',
//   };
  return (
    <Chat
      account='0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb'
      supportAddress="0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7"
      apiKey="tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm"
      env='staging'
      modalTitle='Welcome to MantleFund'
    />
  );
};

// Campaign owners- Get Notified when a supporter funds your campaign.

// For Supporters- Get Notified when there are important updates about the campaigns you are suppoting.
// The stage of improvements going on, NFT drops, Money Stream Informations etc.