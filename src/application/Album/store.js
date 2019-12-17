import { fromJS } from "immutable";

const defaultState = fromJS({
  currentAlbum: {},
  enterLoading: false,
  pullUpLoading: false,
  ready: false
});

const CHANGE_PULLUP_LOADING = "album/CHANGE_PULLUP_LOADING";
const CHANGE_ENTER_LOADING = "album/CHANGE_ENTER_LOADING";
const CHANGE_CURRENT_ALBUM = "album/CHANGE_CURRENT_ALBUM";
const CHANGE_READY = "album/CHANGE_READY";

const changePullUpLoading = payload => {
  return {
    type: CHANGE_PULLUP_LOADING,
    payload: fromJS(payload)
  };
};

const changeCurrentAlbum = payload => {
  return {
    type: CHANGE_CURRENT_ALBUM,
    payload: fromJS(payload)
  };
};

const changeEnterLoading = payload => {
  return {
    type: CHANGE_ENTER_LOADING,
    payload: fromJS(payload)
  };
};

const changeReady = payload => {
  return {
    type: CHANGE_READY,
    payload: fromJS(payload)
  };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_ALBUM:
      return state.set("currentAlbum", action.payload);
    case CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.payload);
    case CHANGE_PULLUP_LOADING:
      return state.set("pullUpLoading", action.payload);
    case CHANGE_READY:
      return state.set("ready", action.payload);
    default:
      return state;
  }
};

export {
  changePullUpLoading,
  changeEnterLoading,
  changeCurrentAlbum,
  changeReady,
  reducer
};
