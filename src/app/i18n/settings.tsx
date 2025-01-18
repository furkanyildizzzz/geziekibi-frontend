export const fallbackLng = "tr";
export const languages = ["en", "ae", "fr", "es", "du", "pt", "cn", "tr"];
export const defaultNS = "translation";

export function getOptions(ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
