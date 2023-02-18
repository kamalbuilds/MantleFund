// @ts-nocheck
import { showNotification } from "@mantine/notifications";
import {
  useAddress,
  useContract,
  useContractWrite,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, ethers } from "ethers";
import React, { createContext, useContext } from "react";
import { CreateCampaignValidationType } from "../pages/CreateCampaign";



interface StateContextType {
  address?: string;
  contract?: SmartContract<BaseContract> | undefined;
  createCampaign?: (values: CreateCampaignValidationType) => Promise<void>;
  createCampaignIsLoading?: boolean;
  createCampaignError?: unknown;
  connect?: () => Promise<
    | {
        data?: import("wagmi").ConnectorData<any> | undefined;
        error?: Error | undefined;
      }
    | {
        error: Error;
      }
  >;
  disconnect?: () => Promise<void | {
    data?: import("wagmi").ConnectorData<any> | undefined;
    error?: Error | undefined;
  }>;
}

const StateContext = createContext<StateContextType>({});

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
  const { contract } = useContract(
    "0xc17a907d751241d2f1f78802b1cf1f701349986a"
    // 0xc17a907d751241d2f1f78802b1cf1f701349986a contract deployed to mantle network
    // contract address 0x8d72887163f8bD8A65649Ef4af37dcc21500e5A1 - gorerelli 2 
  );

  const {
    mutateAsync: createCampaign,
    isLoading,
    error,
  } = useContractWrite(contract, "createCampaign");

  const address = useAddress();

  const connect = useMetamask();

  // disconnect
  const disconnect = useDisconnect();

  const handleCreateCampaign = async (values: CreateCampaignValidationType) => {
    try {
      const data = await createCampaign([
        address,
        values.title,
        values.description,
        ethers.utils.parseUnits(values.target.toString(), 18),
        values.deadline.getTime(),
        values.image,
      ]);

      showNotification({
        title: "Success",
        message: "Campaign created",
        color: "blue",
      });

      return data;
    } catch (error: any) {
      console.error(error);
      showNotification({
        title: "something went wrong",
        message: "Failed to create campaign",
        color: "red",
      });
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        createCampaign: handleCreateCampaign,
        createCampaignIsLoading: isLoading,
        createCampaignError: error,
        connect,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext<StateContextType>(StateContext);
