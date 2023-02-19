import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
  notifications,
  chainlink,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "analyse",
    imgUrl: chainlink,
    link: "/analyse",
  },
  {
    name: "notifications",
    imgUrl: notifications,
    link: "/notifications",
  },
  {
    name: "Airdrop",
    imgUrl: withdraw,
    link: "/claim",
    disabled: true
  },
  {
    name: "my camps",
    imgUrl: profile,
    link: "/profile"
  },
  {
    name: "Claim NFTS",
    imgUrl: withdraw,
    link: "/claim",
  },
  {
    name: "Arcana",
    imgUrl: logout,
    link: "/Connect",
  },
];
