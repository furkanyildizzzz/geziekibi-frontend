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
        path: "/homepageSlider",
      },
      {
        title: "Tags",
        id: 2,
        icon: "Perk-Ui",
        type: "link",
        lanClass: "lan-3",
        path: "/tags",
      },
      {
        title: "Tour",
        id: 6,
        icon: "ecommerce",
        type: "sub",
        active: false,
        children: [
          {
            path: "/tour/add_tour",
            title: "Add Tour",
            type: "link",
          },
          { path: "/tours", title: "Tour List", type: "link" },
          {
            path: "/tour/categories",
            title: "Categories",
            type: "link",
          },
          { path: "/tour/services", title: "Services", type: "link" },
          // { path: "/tour/paths", title: "Paths", type: "link" },
        ],
      },
      {
        title: "Blog",
        id: 6,
        icon: "to-do",
        type: "sub",
        active: false,
        children: [
          {
            path: "/blog/add-blog",
            title: "Add Blog",
            type: "link",
          },
          { path: "/blogs", title: "Blog List", type: "link" },
          {
            path: "/blog/categories",
            title: "Categories",
            type: "link",
          },
        ],
      },
      {
        title: "Catalog",
        id: 6,
        icon: "to-do",
        type: "sub",
        active: false,
        children: [
          {
            path: "/catalogs",
            title: "Catalogs",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Settings",
    lanClass: "lan-1",
    Items: [
      {
        title: "User",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          { path: "/users/edit_profile", type: "link", title: "User Edit" },
          // { path: "/users/user_cards", type: "link", title: "User Cards" },
        ],
      },
    ],
  },

  {
    title: "Pages",
    lanClass: "lan-1",
    Items: [
      {
        title: "Sayfalar",
        icon: "support-tickets",
        type: "sub",
        active: false,
        children: [
          {
            path: "/pages/about-us",
            title: "About Us",
            type: "link",
          },
          {
            path: "/pages/secret-policy",
            title: "Secret Policy",
            type: "link",
          },
          {
            path: "/pages/usage-policy",
            title: "Usage Policy",
            type: "link",
          },
          {
            path: "/pages/information-security-policy",
            title: "Information Security Policy",
            type: "link",
          },
          {
            path: "/pages/kvkk-policy",
            title: "KVKK Policy",
            type: "link",
          },
          {
            path: "/pages/cookie-policy",
            title: "Cookie Policy",
            type: "link",
          },
          {
            path: "/pages/membership-agreement-policy",
            title: "Membership Agreement Policy",
            type: "link",
          },
          {
            path: "/pages/human-resources",
            title: "Human Resources",
            type: "link",
          },
          {
            path: "/pages/tour-packet-agreement",
            title: "Tour Packet Agreement",
            type: "link",
          },
        ],
      },
    ],
  },
  {
    title: "İletişim",
    Items: [
      {
        id: 33,
        path: "/faqs",
        icon: "support-tickets",
        type: "link",
        active: false,
        title: "Frequently Asked Questions",
      },

      {
        id: 33,
        path: "/contact-forms",
        icon: "support-tickets",
        type: "link",
        active: false,
        title: "Contact Forms",
      },
    ],
  },
];
