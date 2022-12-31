export const LIMIT = 12;

export const DEFAULT_GIPHY_OFFSET = 0;
export const DEFAULT_PIXABAY_OFFSET = 1;
export const DEFAULT_UNSPLASH_OFFSET = 1;

export const GIPHY = "giphy";
export const PIXABAY = "pixabay";
export const UNSPLASH = "unsplash";

export const APIS = [
  {
    apiType: GIPHY,
    label: GIPHY.toUpperCase(),
    defaultOffset: DEFAULT_GIPHY_OFFSET
  },
  {
    apiType: PIXABAY,
    label: PIXABAY.toUpperCase(),
    defaultOffset: DEFAULT_PIXABAY_OFFSET
  },
  {
    apiType: UNSPLASH,
    label: UNSPLASH.toUpperCase(),
    defaultOffset: DEFAULT_UNSPLASH_OFFSET
  }
];
