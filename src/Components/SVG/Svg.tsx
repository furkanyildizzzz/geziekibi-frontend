import React from "react";

interface SvgType {
  iconId?: string;
  className?: string;
  onClick?: () => void;
  title?: string;
  style?: {
    height: string;
    width: string;
    fill: string;
    marginRight: string;
  };
}

const SVG = (props: SvgType) => {
  const { title, iconId, style, ...res } = props;
  return (
    <svg {...res} style={style} role="img" aria-labelledby={`${iconId}-title`}>
      <title id={`${iconId}-title`}>{title}</title>
      <use href={`/assets/svg/icon-sprite.svg#${iconId}`} />
    </svg>
  );
};

export default SVG;
