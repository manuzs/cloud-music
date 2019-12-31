// 全局API
import { axiosInstance } from "./axios";

export const Axios = (method, url, data) => {
  return axiosInstance[method](url);
};

export const getBannerRequest = () => {
  return Axios("get", "/banner");
};

export const getRecommendRequest = () => {
  return Axios("get", "/personalized");
};

export const getAlbumDetailRequest = id => {
  return Axios("get", `/playlist/detail?id=${id}`);
};

export const getHotSingersListRequset = count => {
  return Axios("get", `/top/artists?offset=${count}`);
};

export const getSingersListRequest = (category, alpha, count) => {
  return Axios(
    "get",
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};
