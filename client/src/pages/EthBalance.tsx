import React, { useContext } from 'react';
import { AssetPriceContext } from '../context/AssetPriceContext';
import {Card}  from 'react-bootstrap';
import ethusd from '../assets/ethusd.png';


const BALANCE_ETH = 1
const BALANCE_DAI = 1


export const EthBalance: React.FC = () => {
  // const { conversionRate, conversionDate } = useContext(AssetPriceContext)

  const { ethConversionRate, ethConversionDate, daiConversionRate, daiConversionDate } = useContext(AssetPriceContext);

  const ethBalanceUSD = ethConversionRate ? BALANCE_ETH * ethConversionRate : '...'
  const daiBalanceETH = daiConversionRate ? BALANCE_DAI / daiConversionRate : '...'
  // const daiBalanceUSD = daiConversionRate ? daiBalanceETH * ethConversionRate : '...'
  const updatedAt = ethConversionDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(ethConversionDate))
    : '...'


  return (
    <>
    <h1 className='text-xl text-center text-color-sky'>Price Feed Data from Chainlink to easily compare cryptos for supporting the campaigns</h1>
    <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 my-6">
        <Card style={{ width: '18rem' }} className='border-double border-2 border-sky-500 hover:border-dotted'>
            <Card.Img variant="top" src={ethusd} className='p-2 mx-16'/>
            <Card.Body className='p-4'>
              <Card.Title className='text-center'>ETH / USD</Card.Title>
              <Card.Text>
                  The Current Price is {BALANCE_ETH} ETH / {ethBalanceUSD} USD
                  Updated at {updatedAt}
              </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className='border-double border-2 border-sky-500 hover:border-dotted'>
        <Card.Img variant="top" src={ethusd} className='p-2 mx-16'/>
        <Card.Body className='p-4'>
          <Card.Title className='text-center'>DAI / USD</Card.Title>
          <Card.Text>
              The Current Price is {BALANCE_ETH} DAI / {daiBalanceETH} USD
              Updated at {updatedAt}
          </Card.Text>
        </Card.Body>
    </Card>
    </div>
    </>

  )
}