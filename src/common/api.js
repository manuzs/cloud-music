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

export { getBannerRequest, getRecommendRequest };
