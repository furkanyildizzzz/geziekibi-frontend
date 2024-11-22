"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import SVG from "@/Components/SVG/Svg";
import { SearchDunzo } from "@/Constant/constant";
import { MenuItem, SearchSuggestionItem } from "@/Types/LayoutTypes";
import { useAppDispatch } from "@/Redux/Hooks";
import { MenuList } from "@/Data/Layout/Menu";
import { getLinkItemsArray } from "@/Redux/Reducers/HeaderBookmarkSlice";
import SearchSuggestionList from "./SearchSuggestionList";

export const HeaderSearch = () => {
  const [arr, setArr] = useState<SearchSuggestionItem[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<SearchSuggestionItem[]>(
    []
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const suggestionArray: SearchSuggestionItem[] = [];
    let num = 0;
    const getAllLink = (item: MenuItem, icon: string | undefined) => {
      if (item.children) {
        item.children.forEach((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        num = num + 1;
        suggestionArray.push({
          icon: icon,
          title: item.title,
          path: item.path ? item.path : "",
          bookmarked: false,
          id: num,
        });
      }
    };
    MenuList?.forEach((item) => {
      item.Items?.forEach((child) => {
        getAllLink(child, child.icon);
      });
    });
    setArr(suggestionArray);
    dispatch(getLinkItemsArray(suggestionArray));
  }, [dispatch]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    const result = arr.filter((item) =>
      item.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedArray(result);
  };

  return (
    <li>
      <div className="form-group w-100">
        <div className="Typeahead Typeahead--twitterUsers">
          <div className="u-posRelative d-flex">
            <SVG iconId="fill-search" className="me-2" />
            <input
              onChange={(e) => handleSearch(e)}
              value={searchedWord}
              className="demo-input py-0 Typeahead-input form-control-plaintext w-100 border-0 shadow-none"
              type="text"
              placeholder={SearchDunzo}
              name="q"
            />
          </div>
        </div>
      </div>
      <div
        className={`Typeahead-menu header-menu custom-scrollbar ${
          searchedWord.length ? "is-open" : ""
        }`}
      >
        <SearchSuggestionList
          searchedArray={searchedArray}
          setSearchedWord={setSearchedWord}
        />
      </div>
    </li>
  );
};
