import { fromJS } from "immutable";

const CHANGE_BANNER = "home/recommend/CHANGE_BANNER";
const CHANGE_RECOMMEND_LIST = "home/recommend/RECOMMEND_LIST";
const CHANGE_ENTER_LOADING = "home/CHANGE_ENTER_LOADING";

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true
}); // 默认state

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_BANNER:
      return state.set("bannerList", action.payload);
    case CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.payload);
    case CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", action.payload);
    default:
      return state;
  }
};

const changeBannerList = payload => ({
  type: CHANGE_BANNER,
  payload: fromJS(payload)
});

const changeRecommentList = payload => ({
  type: CHANGE_RECOMMEND_LIST,
  payload: fromJS(payload)
});

const changeEnterLoading = payload => ({
  type: CHANGE_ENTER_LOADING,
  payload
});

export { reducer, changeBannerList, changeEnterLoading, changeRecommentList };
