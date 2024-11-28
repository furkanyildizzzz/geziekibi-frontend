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
          { path: "/tour/paths", title: "Paths", type: "link" },
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
