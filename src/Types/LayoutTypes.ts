export interface HeaderTabContentType {
  tabs: string;
}

export interface SidebarMenuType {
  title: string;
  lanClass?: string;
  Items: SidebarItemType[];
}

export interface SidebarItemType {
  id?: number;
  title?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  path?: string;
  children?: SidebarChildrenType[];
  lanClass?: string;
}

export interface SidebarChildrenType {
  path?: string;
  title: string;
  type: string;
  lanClass?: string;
  children?: SubChildrenType[];
}

export interface SubChildrenType {
  title: string;
  type: string;
  path: string;
}

export interface MenuListType {
  menu?: MenuItem[] | undefined;
  level: number;
  setActiveMenu: Function;
  activeMenu: unknown[];
}

export interface SidebarItemTypes {
  item: {
    id?: number;
    title?: string | undefined;
    icon?: string;
    type?: string;
    active?: boolean;
    path?: string;
    children?: SidebarChildrenType[];
    lanClass?: string;
  };
}

export interface MenuItem {
  title: string;
  lanClass?: string;
  Items?: MenuItem[];
  id?: number;
  icon?: string;
  type?: string;
  active?: boolean;
  children?: MenuItem[];
  path?: string;
  mainTitle?: string;
  target?:string
}

export interface SearchSuggestionListType {
  searchedArray: SearchSuggestionItem[];
  setSearchedWord: (key: string) => void;
}

export interface SearchSuggestionItem {
  icon: string | undefined;
  title: string;
  path: string;
  bookmarked?: boolean;
  id?: number;
}

export interface ChangeLngType {
  data: string;
  logo: string;
  language: string;
}

export interface LanguageFlags {
  [key: string]: string;
}

export interface PropsLightColor {
  primary: string;
  secondary: string;
}

export interface BookmarkedDataType {
  icon: string;
  path: string;
  title: string;
  color?: string;
  id?: number;
  bookmarked?: boolean;
}

export interface BookmarkSliceType {
  linkItemsArray: BookmarkedDataType[] | [];
  bookmarkedData: BookmarkedDataType[];
  notification: boolean;
  flip: boolean;
  bookmark: boolean;
  cart: boolean;
  message: boolean;
}

export interface CartHeaderDataType {
  color: string;
  image: string;
  title: string;
  price: number
  value: number;
}

export interface HeaderMessageType {
  src: string;
  title: string;
  tag: string;
}

export interface LanguageDataType{
  languageParameter:string,
  languageName:string,
  languageIconClassName:string,
  subTitle?:string
}