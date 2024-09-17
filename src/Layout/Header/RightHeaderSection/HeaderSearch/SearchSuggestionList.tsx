import SVG from "@/CommonComponent/SVG/Svg";
import { useAppDispatch } from "@/Redux/Hooks";
import { setResponsiveSearch } from "@/Redux/Reducers/LayoutSlice";
import { MenuItem, SearchSuggestionListType } from "@/Types/LayoutTypes";
import Link from "next/link";

const SearchSuggestionList = ({ searchedArray, setSearchedWord }: SearchSuggestionListType) => {
  const dispatch = useAppDispatch();

  const handleLinkClick = () => {
    dispatch(setResponsiveSearch());
    setSearchedWord("");
  };

  return (
    <>
      {searchedArray?.map((item: MenuItem, index: number) => (
        <div className="ProfileCard u-cf" key={index}>
          <div className="ProfileCard-details">
            <div className="ProfileCard-realName">
              <Link className="realname w-auto d-flex justify-content-start gap-2" href={`${item.path}`} onClick={handleLinkClick}>
                <SVG iconId={`fill-${item.icon}`} />
                {item.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
      {!searchedArray.length && <p>Opps!! There are no result found.</p>}
    </>
  );
};

export default SearchSuggestionList;