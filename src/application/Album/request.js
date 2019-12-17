import { changeCurrentAlbum, changeEnterLoading, changeReady } from "./store";
import { getAlbumDetailRequest } from "@common/api";

const getAlbumDetail = id => {
  return dispatch => {
    getAlbumDetailRequest(id)
      .then(data => {
        dispatch(changeCurrentAlbum(data.playlist));
        dispatch(changeEnterLoading(false));
        dispatch(changeReady(true));
      })
      .catch(err => {
        console.log("获取歌单详情出错");
      });
  };
};

export { getAlbumDetail };
