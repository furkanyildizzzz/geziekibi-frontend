import React from "react";

interface SvgType {
  iconId?: string;
  className?: string;
  onClick?: () => void;
  style?: {
    height: string;
    width: string;
    fill: string;
    marginRight: string;
  };
}

const SVG = (props: SvgType) => {
  const { iconId, style, ...res } = props;
  return (
    <svg {...res} style={style}>
      <use href={`/assets/svg/icon-sprite.svg#${iconId}`}></use>
    </svg>
  );
};

export default SVG;
