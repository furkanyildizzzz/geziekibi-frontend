export enum TourTypeEnum {
  YURTICI = "yurtici",
  YURTDISI = "yurtdisi",
  GUNUBIRLIK = "gunubirlik",
}
export const TourTypeDisplayNames: { [key in TourTypeEnum]: string } = {
  [TourTypeEnum.YURTICI]: "Yurt İçi",
  [TourTypeEnum.YURTDISI]: "Yurt Dışı",
  [TourTypeEnum.GUNUBIRLIK]: "Günübirlik",
};

export enum PublishStatusEnum {
  PUBLISH = "publish",
  DRAFT = "draft",
  UNPUBLISH = "unpublish",
}
export const PublishStatusDisplayNames: { [key in PublishStatusEnum]: string } =
  {
    [PublishStatusEnum.PUBLISH]: "Publish",
    [PublishStatusEnum.DRAFT]: "Draft",
    [PublishStatusEnum.UNPUBLISH]: "Unpublish",
  };

export enum CurrencyEnum {
  TRY = "try",
  EUR = "eur",
  USD = "usd",
}
export const CurrencyDisplayNames: { [key in CurrencyEnum]: string } = {
  [CurrencyEnum.TRY]: "TL ₺",
  [CurrencyEnum.EUR]: "Euro €",
  [CurrencyEnum.USD]: "Dolar $",
};

export enum TourServiceTypeEnum {
  INCLUDED = "included",
  INHERIT = "inherit",
  EXCLUDED = "excluded",
}
export const TourServiceTypeEnumDisplayNames: {
  [key in TourServiceTypeEnum]: string;
} = {
  [TourServiceTypeEnum.INCLUDED]: "Included",
  [TourServiceTypeEnum.INHERIT]: "Inherit",
  [TourServiceTypeEnum.EXCLUDED]: "Excluded",
};
