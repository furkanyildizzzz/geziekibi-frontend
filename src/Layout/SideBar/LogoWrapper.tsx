import SVG from "@/Components/SVG/Svg";
import { Href, ImagePath } from "@/Constant/constant";
import { useAppDispatch } from "@/Redux/Hooks";
import { handleResponsiveToggle } from "@/Redux/Reducers/LayoutSlice";
import Image from "next/image";
import Link from "next/link";

export const LogoWrapper = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="logo-wrapper">
        <Link href={Href}>
          <Image
            width={121}
            height={38}
            className="img-fluid"
            src={`${ImagePath}/logo/logo.png`}
            alt=""
            priority
          />
        </Link>
        <div className="toggle-sidebar">
          <SVG
            className="sidebar-toggle"
            iconId="toggle-icon"
            onClick={() => dispatch(handleResponsiveToggle())}
          />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link href="/">
          <Image
            width={32}
            height={32}
            className="img-fluid"
            src={`${ImagePath}/logo/logo-icon.png`}
            alt="logo"
            priority
          />
        </Link>
      </div>
    </>
  );
};
