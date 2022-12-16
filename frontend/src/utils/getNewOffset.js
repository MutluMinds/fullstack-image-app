import {
  LIMIT,
  IMAGE_TYPE_GIFS,
  DEFAULT_GIPHY_OFFSET,
  DEFAULT_PIXABAY_OFFSET,
} from "../static/constants";

export const getNewOffset = (imageType, prevOffset) => {
  return imageType === IMAGE_TYPE_GIFS
    ? prevOffset + LIMIT + 1
    : prevOffset + 1;
};

export const getDefaultOffset = (imageType) =>
  imageType === IMAGE_TYPE_GIFS ? DEFAULT_GIPHY_OFFSET : DEFAULT_PIXABAY_OFFSET;
