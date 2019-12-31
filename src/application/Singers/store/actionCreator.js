import * as ActionTypes from "./contants";
import { fromJS } from "immutable";

export const changeCategory = data => ({
  type: ActionTypes.CHANGE_CATEGORY,
  payload: data
});

export const changeAlpha = data => ({
  type: ActionTypes.CHANGE_ALPHA,
  payload: data
});

export const changeSingersList = data => ({
  type: ActionTypes.CHANGE_SINGERSLIST,
  payload: fromJS(data)
});

export const changeEnterLoading = data => ({
  type: ActionTypes.CHAGNE_ENTERLOADING,
  payload: data
});

export const changePullUpLoading = data => ({
  type: ActionTypes.CHANGE_PULLUPLOADING,
  payload: data
});

export const changePullDownLoading = data => ({
  type: ActionTypes.CHANGE_PULLDOWNLOADING,
  payload: data
});

export const changeOffset = data => ({
  type: ActionTypes.CHANGE_OFFSET,
  payload: data
});

export const changeReady = data => ({
  type: ActionTypes.CHANGE_READY,
  payload: data
});

export const changeHasMore = data => ({
  type: ActionTypes.CHANGE_HAS_MORE,
  payload: data
});
