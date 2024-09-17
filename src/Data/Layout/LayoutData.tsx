import { CartHeaderDataType } from "@/Types/LayoutTypes";
import { FileText, Mail, Settings, User } from "react-feather";

export const FolderPlusData = [
  {
    id: 1,
    link: "/app/file_manager",
    text: "File Manager",
  },
  {
    id: 2,
    link: "/app/social_app",
    text: "Social App",
  },
  {
    id: 3,
    link: "/app/bookmarks",
    text: "Bookmark",
  },
];

export const LeftHeaderData = [
  {
    id: 1,
    icon: "fill-bonus",
    text: "Bonus Ui",
    child: [
      {
        id: 1,
        link: "/bonus_ui/scrollable",
        text: "Scrollable",
      },
      {
        id: 2,
        link: "/bonus_ui/tree_view",
        text: "Tree view",
      },
      {
        id: 3,
        link: "/bonus_ui/toasts",
        text: "Toasts",
      },
      {
        id: 4,
        link: "/bonus_ui/rating",
        text: "Rating",
      },
      {
        id: 5,
        link: "/bonus_ui/dropzone",
        text: "Dropzone",
      },
      {
        id: 6,
        link: "/bonus_ui/tour",
        text: "Tour",
      },
      {
        id: 7,
        link: "/bonus_ui/sweetalert_2",
        text: "SweetAlert2",
      },
      {
        id: 8,
        link: "/bonus_ui/reactstrap_carousel",
        text: "Owl Carousel",
      },
      {
        id: 9,
        link: "/bonus_ui/ribbons",
        text: "Ribbons",
      },
      {
        id: 10,
        link: "/bonus_ui/pagination",
        text: "Pagination",
      },
      {
        id: 11,
        link: "/bonus_ui/breadcrumb",
        text: "Breadcrumb",
      },
      {
        id: 12,
        link: "/bonus_ui/range_slider",
        text: "Range Slider",
      },
      {
        id: 13,
        link: "/bonus_ui/image_cropper",
        text: "Image cropper",
      },
      {
        id: 14,
        link: "/bonus_ui/basic_cards",
        text: "Basic Card",
      },
      {
        id: 15,
        link: "/bonus_ui/creative_cards",
        text: "Creative Card",
      },
      {
        id: 16,
        link: "/bonus_ui/timeline",
        text: "Timeline",
      },
    ],
  },
  {
    id: 2,
    icon: "fill-Grid",
    text: "Level Menu",
    child: [
      {
        id: 1,
        link: "/ecommerce/add_product",
        text: "Add Product",
      },
      {
        id: 2,
        link: "/ecommerce/product",
        text: "Product",
      },
      {
        id: 3,
        link: "/ecommerce/product_page",
        text: "Product page",
      },
      {
        id: 4,
        link: "/ecommerce/product_list",
        text: "Product list",
      },
      {
        id: 5,
        link: "/ecommerce/payment_details",
        text: "Payment Details",
      },
      {
        id: 6,
        link: "/ecommerce/order_history",
        text: "Order History",
      },
      {
        id: 7,
        link: "/ecommerce/invoice/invoice_1",
        text: "Invoice",
      },
      {
        id: 8,
        link: "/ecommerce/cart",
        text: "Cart",
      },
      {
        id: 9,
        link: "/ecommerce/wishlist",
        text: "Wishlist",
      },
      {
        id: 10,
        link: "/ecommerce/checkout",
        text: "Checkout",
      },
      {
        id: 11,
        link: "/ecommerce/pricing",
        text: "Pricing",
      },
    ],
  },
  {
    id: 3,
    icon: "fill-Perk-Ui",
    text: "Project",
    child: [
      {
        id: 1,
        link: "/project/project_list",
        text: "Project List",
      },
      {
        id: 2,
        link: "/project/new_project",
        text: "Create new",
      },
    ],
  },
  {
    id: 4,
    icon: "fill-bonus",
    text: "Blog",
    child: [
      {
        id: 1,
        link: "/blog/blog_details",
        text: "Blog Details",
      },
      {
        id: 2,
        link: "/blog/blog_single",
        text: "Blog Single",
      },
      {
        id: 3,
        link: "/blog/add_post",
        text: "Add Post",
      },
    ],
  },
];

export const NotificationData = [
  {
    color: "primary",
    title: "Delivery processing",
    span: "10 min.",
  },
  {
    color: "secondary",
    title: "Order Complete",
    span: "1 hr",
  },
  {
    color: "success",
    title: "Tickets Generated",
    span: "3 hr",
  },
  {
    color: "info",
    title: "Delivery Complete",
    span: "6 hr",
  },
];

export const BookMarkData = [
  {
    icon: "form",
    path: "/forms/form_controls/validation_form",
    title: "Form",
  },
  {
    icon: "user",
    path: "/users/user_profile",
    title: "Profile",
  },
  {
    icon: "table",
    path: "/table/reactstrap_table/basic_table",
    title: "Tables",
  },
];

export const MessageData = [
  {
    src: "3.jpg",
    title: "Helen Walter",
    tag: "Do you want to go see movie?",
  },
  {
    src: "6.jpg",
    title: "Jason Borne",
    tag: "Thank you for rating us.",
  },
  {
    src: "10.jpg",
    title: "Sarah Loren",
    tag: "What`s the project report update?",
  },
];

export const UserListData = [
  {
    icon: <User />,
    path: "/users/user_profile",
    title: "Account",
  },
  {
    icon: <Mail />,
    path: "/email/email_app",
    title: "Inbox",
  },
  {
    icon: <FileText />,
    path: "/app/task",
    title: "Taskboard",
  },
  {
    icon: <Settings />,
    path: "/users/edit_profile",
    title: "Settings",
  },
];

export const LanguagesData = [
  {
    data: "en",
    logo: "flag-icon flag-icon-us",
    language: "English",
  },
  {
    data: "es",
    logo: "flag-icon flag-icon-is",
    language: "Spanish",
  },
  {
    data: "pt",
    logo: "flag-icon flag-icon-uy",
    language: "Portuegse",
  },
  {
    data: "fr",
    logo: "flag-icon flag-icon-nz",
    language: "French",
  },
  {
    data: "ae",
    logo: "flag-icon flag-icon-ae",
    language: "لعربية",
  },
  {
    data: "du",
    logo: "flag-icon flag-icon-de",
    language: "Deutsch",
  },
  {
    data: "cn",
    logo: "flag-icon flag-icon-cn",
    language: "简体中文",
  },
];

export const CartHeaderData: CartHeaderDataType[] = [
  {
    color: "primary",
    image: "06.jpg",
    title: "Winter T-shirt",
    price: 299.0,
    value: 1,
  },
  {
    color: "secondary",
    image: "02.jpg",
    title: "Men Shirt",
    price: 249.0,
    value: 2,
  },
];

export const NavLinkList = [
  {
    path: "https://docs.pixelstrap.net/next/dunzo/document/index.html",
    image: "2.png",
    name: "Document",
  },
  {
    path: "https://themeforest.net/user/pixelstrap/portfolio",
    image: "3.png",
    name: "Buy Now",
  },
  {
    path: "https://landing.pixelstrap.net/next/dunzo/template/landing-page.html",
    image: "4.png",
    name: "Check Features",
  },
  {
    path: "https://support.pixelstrap.com/",
    image: "5.png",
    name: "Support",
  },
];

export const LightColorData = [
  { primary: "#307EF3", secondary: "#EBA31D" },
  { primary: "#33BFBF", secondary: "#FF6150" },
  { primary: "#006666", secondary: "#FE6A49" },
  { primary: "#7A70BA", secondary: "#48A3D7" },
  { primary: "#6271EB", secondary: "#FF8575" },
  { primary: "#3949ab", secondary: "#4fc3f7" },
];

export const DarkColorData = [
  {  primary: "#4466f2", secondary: "#1ea6ec" },
  {  primary: "#33BFBF", secondary: "#FF6150" },
  {  primary: "#006666", secondary: "#FE6A49" },
  {  primary: "#7A70BA", secondary: "#48A3D7" },
  {  primary: "#6271EB", secondary: "#FF8575" },
  {  primary: "#3949ab", secondary: "#4fc3f7" },
];

export let LanguageData = [
  {
      languageParameter: "en",
      languageName: "English",
      languageIconClassName: "us",
      subTitle:"US"
  },
  {
      languageParameter: "du",
      languageName: "Deutsch",
      languageIconClassName: "de",
  },
  {
      languageParameter: "es",
      languageName: "Español",
      languageIconClassName: "es",
  },
  {
      languageParameter: "fr",
      languageName: "Français",
      languageIconClassName: "fr",
  },
  {
      languageParameter: "pt",
      languageName: "Português",
      languageIconClassName: "pt",
      subTitle:"BR"
  },
  {
      languageParameter: "cn",
      languageName: "简体中文",
      languageIconClassName: "cn",
  },
  {
      languageParameter: "ae",
      languageName: "لعربي",
      languageIconClassName: "ae",
      subTitle:"ae"
  },
];