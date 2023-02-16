import React, { useContext } from 'react';
import { AssetPriceContext } from '../context/AssetPriceContext';
import {Card}  from 'react-bootstrap';
import ethusd from '../assets/ethusd.png';
import {Button} from 'react-bootstrap';

const BALANCE_ETH = 1

export const EthBalance: React.FC = () => {
  const { conversionRate, conversionDate } = useContext(AssetPriceContext)

  const balanceUSD = conversionRate ? BALANCE_ETH * conversionRate : '...'
  const updatedAt = conversionDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(conversionDate))
    : '...'

  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={ethusd} />
        <Card.Body>
        <Card.Title>ETH / USD</Card.Title>
        <Card.Text>
            My balance is {BALANCE_ETH} ETH / {balanceUSD} USD
            Updated at {updatedAt}
        </Card.Text>
        </Card.Body>
    </Card>

  )
}