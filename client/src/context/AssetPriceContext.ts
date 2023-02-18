import { utils } from 'ethers';
import { createContext, useEffect, useRef, useState } from 'react';
import { getLatestPrice , getLatestPricebtc , getLatestPriceeur } from '../components/getLatestPrice';


interface ContextProps {
  conversionDate: number | null;
  conversionRate: number | null;
  ethConversionDate: number | null;
  ethConversionRate: number | null;
  btcConversionDate: number | null;
  btcConversionRate: number | null;
  eurConversionDate: number | null;
  eurConversionRate: number | null;
}

const UPDATE_INTERVAL_TIMEOUT = 180000 // 3 minutes

export const DEFAULT_CONTEXT: ContextProps = {
  conversionDate: null,
  conversionRate: null,
  ethConversionDate: null,
  ethConversionRate: null,
  btcConversionDate: null,
  btcConversionRate: null,
  eurConversionDate: null,
  eurConversionRate: null,
}

export const AssetPriceContext = createContext<ContextProps>(DEFAULT_CONTEXT)

export const useAssetPrice = (): ContextProps => {
  const [state, setState] = useState<ContextProps>(DEFAULT_CONTEXT)
  const updateInterval = useRef<ReturnType<typeof setTimeout>>()

  const updateAssetPrice = async () => {
    let ethConversionDate : any= null
    let ethConversionRate : any= null
    let btcConversionDate : any= null
    let btcConversionRate : any= null
    let eurConversionDate : any= null
    let eurConversionRate : any= null

    try {
      const ethRoundData = await getLatestPrice()
      const btcRoundData = await getLatestPricebtc()
      const eurRoundData = await getLatestPriceeur()

      ethConversionDate = Number(ethRoundData[3].toString()) * 1000
      ethConversionRate = Number(utils.formatUnits(ethRoundData[1], 8))
      btcConversionDate = Number(btcRoundData[3].toString()) * 1000
      btcConversionRate = Number(utils.formatUnits(btcRoundData[1], 18))
      eurConversionDate = Number(eurRoundData[3].toString()) * 1000
      eurConversionRate = Number(utils.formatUnits(eurRoundData[1], 8))
    } catch (error) {
      console.log(error)
    }

    setState(prevState => ({
      ...prevState,
      ethConversionDate,
      ethConversionRate,
      btcConversionDate,
      btcConversionRate,
      eurConversionDate,
      eurConversionRate,
    }))
  }

  const startUpdate = async () => {
    stopUpdate()

    await updateAssetPrice()

    updateInterval.current = setInterval(async () => {
      await updateAssetPrice()
    }, UPDATE_INTERVAL_TIMEOUT)
  }

  const stopUpdate = () => {
    if (updateInterval.current) {
      clearInterval(updateInterval.current)
    }
  }

  useEffect(() => {
    startUpdate()
    return stopUpdate
  }, [])

  return state
}


