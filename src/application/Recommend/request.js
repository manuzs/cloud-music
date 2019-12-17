import { getBannerRequest, getRecommendRequest } from "@common/api";
import {
  changeBannerList,
  changeRecommentList,
  changeEnterLoading,
  changeReady
} from "./store";

export const getBannerList = () => {
  return dispatch => {
    getBannerRequest()
      .then(data => {
        dispatch(changeBannerList(data.banners));
      })
      .catch(() => {
        console.log("轮播图数据传输错误");
      });
  };
};

export const getRecommendList = () => {
  return dispatch => {
    getRecommendRequest()
      .then(data => {
        dispatch(changeRecommentList(data.result));
        dispatch(changeEnterLoading(false));
        dispatch(changeReady(true));
      })
      .catch(() => {
        console.log("推荐歌单数据传输错误");
      });
  };
};
