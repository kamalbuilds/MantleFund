import { Grid, Card, Group, Button, Image, Text } from "@mantine/core";
import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CreateCampaignValidationType } from "../pages/CreateCampaign";

export interface DisplayCampaignsProps {
  id: string;
  title: string;
  description: string;
  image: string;
  target: ethers.BigNumber;
  deadline: ethers.BigNumber;
  amountCollected: ethers.BigNumber;
  owner: string;
  donators: string[];
}

export interface DisplayCampaignsCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  target: string;
  deadline: Date;
  amountCollected: string;
  owner: string;
  donators: string[];
}

const DisplayCampaigns = (item: DisplayCampaignsCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/campaign-details/${item.id}`);
  };

  return (
    <Grid.Col sm={6} md={4} lg={3}>
      <Card
        onClick={handleCardClick}
        className="cursor-pointer hover:transform hover:scale-105 transition-all duration-300 mx-2"
        shadow="sm"
        p="lg"
        radius="md"
      >
        <Card.Section>
          <Image src={item.image} height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{item.title}</Text>
          <Text weight={500}>ETH {item.target}</Text>
        </Group>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>End Date :</Text>
          <Text weight={500}>{item.deadline.toDateString()}</Text>
        </Group>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}> Total collected amount:</Text>
          <Text weight={500}>ETH {item.amountCollected}</Text>
        </Group>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}> Owner by </Text>
          <Text weight={500}>{item.owner.substring(0, 10)}...</Text>
        </Group>

        <Text size="sm" color="dimmed">
          {item.description}
        </Text>
      </Card>
    </Grid.Col>
  );
};

export default DisplayCampaigns;
