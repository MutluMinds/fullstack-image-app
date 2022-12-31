import {
  LIMIT,
  APIS,
} from "../static/constants";

export const getNewOffset = (apiType, prevOffset) => {
  return apiType === APIS.giphy
    ? prevOffset + LIMIT + 1
    : prevOffset + 1;
};

export const getDefaultOffset = (apiType) =>
  APIS.find(api => apiType === api.apiType).defaultOffset;
