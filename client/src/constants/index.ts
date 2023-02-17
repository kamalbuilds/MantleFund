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
    link: "/ethbalance",
  },
  {
    name: "notifications",
    imgUrl: notifications,
    link: "/notifications",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "my campaigns",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "Arcana",
    imgUrl: logout,
    link: "/Connect",
  },
];
