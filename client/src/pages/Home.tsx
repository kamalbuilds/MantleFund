import { Grid, Loader, Title } from "@mantine/core";
import { useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import DisplayCampaigns, {
  DisplayCampaignsProps,
} from "../components/DisplayCampaigns";
import { useAppState } from "../context";

const Home = () => {
  const { contract } = useAppState();
  const { data, isLoading } = useContractRead(contract, "getCampaigns");

  return (
    <div>
      <Title align="center" mb={20}>
        All Campaigns
      </Title>

      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          {data.map((item: DisplayCampaignsProps, i: number) => {
            return (
              <DisplayCampaigns
                key={i}
                {...item}
                target={ethers.utils.formatEther(item.target.toString())}
                amountCollected={ethers.utils.formatEther(
                  item.amountCollected.toString()
                )}
                deadline={new Date(item.deadline.toNumber())}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Home;
