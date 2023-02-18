import React, { useContext } from 'react';
import { AssetPriceContext } from '../context/AssetPriceContext';
import {Card}  from 'react-bootstrap';
import ethusd from '../assets/ethusd.png';
import btc from '../assets/btc.png';
import eur from '../assets/eur.png';

const BALANCE_ETH = 1
const BALANCE_btc = 1
const BALANCE_EUR = 1

export const EthBalance: React.FC = () => {

  const { ethConversionRate, ethConversionDate, btcConversionRate, btcConversionDate, eurConversionDate , eurConversionRate } = useContext(AssetPriceContext);

  const ethBalanceUSD = ethConversionRate ? BALANCE_ETH * ethConversionRate : '...'
  const btcBalanceETH = btcConversionRate ? BALANCE_btc / btcConversionRate : '...'
  const eurBalanceETH = eurConversionRate ? BALANCE_EUR / eurConversionRate : '...'

  // const btcBalanceUSD = btcConversionRate ? btcBalanceETH * ethConversionRate : '...'
  const updatedAt = ethConversionDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(ethConversionDate))
    : '...'

  const updatedAtbtc = btcConversionDate
  ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(btcConversionDate))
  : '...'

  const updatedAteur = eurConversionDate
  ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(eurConversionDate))
  : '...'


  return (
    <>
    <h1 className='text-xl text-center text-color-sky my-3'>Price Feed Data from Chainlink to easily compare cryptos for supporting the campaigns</h1>
    <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 my-6">
        <Card style={{ width: '18rem' }} className='border-double border-2 border-sky-500 hover:border-dotted'>
            <Card.Img variant="top" src={ethusd} className='p-2 mx-16'/>
            <Card.Body className='p-4'>
              <Card.Title className='text-center'>ETH / USD</Card.Title>
              <Card.Text>
                  The Current Price of {BALANCE_ETH} ETH is {ethBalanceUSD} USD
                  Updated at {updatedAt}
              </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className='border-double border-2 border-sky-500 hover:border-dotted'>
          <Card.Img variant="top" src={btc} className='p-2 mx-6'/>
          <Card.Body className='p-4'>
            <Card.Title className='text-center'>BTC / USD</Card.Title>
            <Card.Text>
                The Current Price of {BALANCE_ETH} BTC is {btcBalanceETH} USD
                Updated at {updatedAtbtc}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className='border-double border-2 border-sky-500 hover:border-dotted'>
          <Card.Img variant="top" src={eur} className='p-2 mx-2'/>
          <Card.Body className='p-4'>
            <Card.Title className='text-center'>EUR / USD</Card.Title>
            <Card.Text>
                The Current Price of {BALANCE_ETH} EUR is {eurBalanceETH} USD
                Updated at {updatedAteur}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
    </>

  )
}