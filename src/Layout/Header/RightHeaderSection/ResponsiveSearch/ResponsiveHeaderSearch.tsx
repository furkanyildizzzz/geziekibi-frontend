"use client";
import SVG from "@/Components/SVG/Svg";
import { SearchHere } from "@/Constant/constant";
import { MenuList } from "@/Data/Layout/Menu";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setResponsiveSearch } from "@/Redux/Reducers/LayoutSlice";
import { MenuItem, SearchSuggestionItem } from "@/Types/LayoutTypes";
import { ChangeEvent, useEffect, useState } from "react";
import ResponsiveSearchList from "./ResponsiveSearchList";

export const ResponsiveHeaderSearch = () => {
  const [arr, setArr] = useState<SearchSuggestionItem[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<SearchSuggestionItem[]>(
    []
  );
  const { responsiveSearch } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const toggleShow = () => dispatch(setResponsiveSearch());

  useEffect(() => {
    const suggestionArray: SearchSuggestionItem[] = [];
    const getAllLink = (item: MenuItem, icon: string | undefined) => {
      if (item.children) {
        item.children.forEach((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        suggestionArray.push({
          icon: icon,
          title: item.title,
          path: item.path || "",
        });
      }
    };
    MenuList?.forEach((item) => {
      item.Items?.forEach((child) => {
        getAllLink(child, child.icon);
      });
    });
    setArr(suggestionArray);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    let data = [...arr];
    let result = data.filter((item) =>
      item.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedArray(result);
  };

  return (
    <li className="serchinput">
      <div className="serchbox" onClick={toggleShow}>
        <SVG iconId="fill-search" />
      </div>
      <div
        className={`form-group search-form ${responsiveSearch ? "open" : ""}`}
      >
        <input
          value={searchedWord}
          onChange={(e) => handleSearch(e)}
          type="text"
          className="shadow-none"
          placeholder={SearchHere}
        />
      </div>
      <div
        className={`Typeahead-menu header-menu custom-scrollbar ${
          searchedWord.length && responsiveSearch ? "is-open" : ""
        }`}
      >
        <ResponsiveSearchList
          searchedArray={searchedArray}
          setSearchedWord={setSearchedWord}
        />
      </div>
    </li>
  );
};
