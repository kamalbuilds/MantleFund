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
      supportAddress="0x0439427C42a099E7E362D86e2Bbe1eA27300f6Cb"
      apiKey="tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm"
      env='staging'
      modalTitle='MantleFund Chat'
    />
  );
};

