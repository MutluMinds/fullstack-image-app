import { LIMIT, IMAGE_TYPE_GIFS } from "../static/constants";

export const getNewOffset = (imageType, prevOffset) => {
  return imageType === IMAGE_TYPE_GIFS
    ? prevOffset + LIMIT + 1
    : prevOffset + 1;
};
