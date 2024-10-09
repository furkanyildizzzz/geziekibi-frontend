import { MenuItem } from "@/Types/LayoutTypes";

export const MenuList: MenuItem[] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: "Home",
        id: 1,
        icon: "home",
        type: "sub",
        lanClass: "lan-3",
        path: "/dashboard",
      },
      {
        title: "Tags",
        id: 2,
        icon: "Perk-Ui",
        type: "link",
        lanClass: "lan-3",
        path: "/tags",
      },
    ],
  },
  {
    title: "Pages",
    lanClass: "lan-1",
    Items: [
      {
        icon: "sample-page",
        id: 24,
        active: false,
        path: "/pages/sample_page",
        title: "Sample Page",
        type: "link",
      },
    ],
  },

  {
    title: "Support Ticket",
    Items: [
      {
        id: 33,
        path: "https://support.pixelstrap.com/",
        target: "_blank",
        icon: "support-tickets",
        type: "link",
        active: false,
        title: "Support Ticket",
      },
    ],
  },
];
