import { fromJS } from "immutable";
import * as ActionTypes from "./contants";

const defaultState = fromJS({
  category: "",
  alpha: "",
  singersList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  offset: 0,
  ready: false,
  hasMore: true
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_CATEGORY:
      return state.set("category", action.payload);
    case ActionTypes.CHANGE_ALPHA:
      return state.set("alpha", action.payload);
    case ActionTypes.CHANGE_SINGERSLIST:
      return state.set("singersList", action.payload);
    case ActionTypes.CHANGE_PULLUPLOADING:
      return state.set("pullUpLoading", action.payload);
    case ActionTypes.CHANGE_PULLDOWNLOADING:
      return state.set("pullDownLoading", action.payload);
    case ActionTypes.CHANGE_OFFSET:
      return state.set("offset", action.payload);
    case ActionTypes.CHAGNE_ENTERLOADING:
      return state.set("enterLoading", action.payload);
    case ActionTypes.CHANGE_READY:
      return state.set("ready", action.payload);
    case ActionTypes.CHANGE_HAS_MORE:
      return state.set("hasMore", action.payload);
    default:
      return state;
  }
}
