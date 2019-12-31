import { getHotSingersListRequset, getSingersListRequest } from "@common/api";
import { ActionCreator, ActionTypes } from "./store";
import { fromJS } from "immutable";

export const getHotSingersList = () => {
  return dispatch => {
    getHotSingersListRequset(0)
      .then(data => {
        dispatch(ActionCreator.changeEnterLoading(false));
        dispatch(ActionCreator.changeSingersList(data.artists));
        dispatch(ActionCreator.changeOffset(data.artists.length));
        dispatch(ActionCreator.changePullDownLoading(false));
        dispatch(ActionCreator.changeReady(true));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const refreshMoreHotSingersList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const artists = state.getIn(["singers", "singersList"]);
    const offset = state.getIn(["singers", "offset"]);
    const hasMore = state.getIn(["singers", "hasMore"]);
    if (!hasMore) {
      dispatch(ActionCreator.changePullUpLoading(false));
      return false;
    }
    getHotSingersListRequset(offset)
      .then(data => {
        const singersList = [...artists.toJS(), ...data.artists];
        hasMore !== data.more &&
          dispatch(ActionCreator.changeHasMore(data.more));
        dispatch(ActionCreator.changePullUpLoading(false));
        dispatch(ActionCreator.changeSingersList(fromJS(singersList)));
        dispatch(ActionCreator.changeOffset(singersList.length));
        dispatch(ActionCreator.changeReady(true));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getSingersList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const offset = state.getIn(["singers", "offset"]);
    const category = state.getIn(["singers", "category"]);
    const alpha = state.getIn(["singers", "alpha"]);
    getSingersListRequest(category, alpha, offset)
      .then(data => {
        const singersList = data.artists;
        dispatch(ActionCreator.changeEnterLoading(false));
        dispatch(ActionCreator.changeSingersList(fromJS(singersList)));
        dispatch(ActionCreator.changeOffset(singersList.length));
        dispatch(ActionCreator.changePullDownLoading(false));
        dispatch(ActionCreator.changeReady(true));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const refreshMoreSingersList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const artists = state.getIn(["singers", "singersList"]);
    const offset = state.getIn(["singers", "offset"]);
    const category = state.getIn(["singers", "category"]);
    const alpha = state.getIn(["singers", "alpha"]);
    const hasMore = state.getIn(["singers", "hasMore"]);
    if (!hasMore) {
      dispatch(ActionCreator.changePullUpLoading(false));
      return false;
    }
    getSingersListRequest(category, alpha, offset)
      .then(data => {
        hasMore !== data.more &&
          dispatch(ActionCreator.changeHasMore(data.more));
        const singersList = [...artists.toJS(), ...data.artists];
        dispatch(ActionCreator.changeSingersList(fromJS(singersList)));
        dispatch(ActionCreator.changeOffset(singersList.length));
        dispatch(ActionCreator.changePullUpLoading(false));
        dispatch(ActionCreator.changeReady(true));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
