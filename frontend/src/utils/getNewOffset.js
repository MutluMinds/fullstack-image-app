import {
  LIMIT,
  APIS,
  DEFAULT_GIPHY_OFFSET,
  DEFAULT_PIXABAY_OFFSET,
} from "../static/constants";

export const getNewOffset = (apiType, prevOffset) => {
  return apiType === APIS.giphy
    ? prevOffset + LIMIT + 1
    : prevOffset + 1;
};

export const getDefaultOffset = (apiType) =>
  apiType === APIS.giphy ? DEFAULT_GIPHY_OFFSET : DEFAULT_PIXABAY_OFFSET;
