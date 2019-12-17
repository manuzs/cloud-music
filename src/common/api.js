// 全局API
import { axiosInstance } from "./axios";

const Axios = (method, url, data) => {
  return axiosInstance[method](url);
};

const getBannerRequest = () => {
  return Axios("get", "/banner");
};

const getRecommendRequest = () => {
  return Axios("get", "/personalized");
};

const getAlbumDetailRequest = id => {
  return Axios("get", `/playlist/detail?id=${id}`);
};

export { getBannerRequest, getRecommendRequest, getAlbumDetailRequest };
