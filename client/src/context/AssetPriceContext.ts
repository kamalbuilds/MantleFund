import { utils } from 'ethers';
import { createContext, useEffect, useRef, useState } from 'react';
import { getLatestPrice , getLatestPricedai } from '../components/getLatestPrice';


interface ContextProps {
  conversionDate: number | null;
  conversionRate: number | null;
  ethConversionDate: number | null;
  ethConversionRate: number | null;
  daiConversionDate: number | null;
  daiConversionRate: number | null;
}

const UPDATE_INTERVAL_TIMEOUT = 180000 // 3 minutes

export const DEFAULT_CONTEXT: ContextProps = {
  conversionDate: null,
  conversionRate: null,
  ethConversionDate: null,
  ethConversionRate: null,
  daiConversionDate: null,
  daiConversionRate: null,
}

export const AssetPriceContext = createContext<ContextProps>(DEFAULT_CONTEXT)

export const useAssetPrice = (): ContextProps => {
  const [state, setState] = useState<ContextProps>(DEFAULT_CONTEXT)
  const updateInterval = useRef<ReturnType<typeof setTimeout>>()

  const updateAssetPrice = async () => {
    let ethConversionDate : any= null
    let ethConversionRate : any= null
    let daiConversionDate : any= null
    let daiConversionRate : any= null

    try {
      const ethRoundData = await getLatestPrice()
      const daiRoundData = await getLatestPricedai()

      ethConversionDate = Number(ethRoundData[3].toString()) * 1000
      ethConversionRate = Number(utils.formatUnits(ethRoundData[1], 8))
      daiConversionDate = Number(daiRoundData[3].toString()) * 1000
      daiConversionRate = Number(utils.formatUnits(daiRoundData[1], 18))
    } catch (error) {
      console.log(error)
    }

    setState(prevState => ({
      ...prevState,
      ethConversionDate,
      ethConversionRate,
      daiConversionDate,
      daiConversionRate
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


