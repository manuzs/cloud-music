import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "@app/Recommend/store";
import { reducer as albumReducer } from "@app/Album/store";
// import { reducer as singersReducer } from "../application/Singers/store/index";
// import { reducer as rankReducer } from "../application/Rank/store/index";
// import { reducer as singerInfoReducer } from "../application/Singer/store/index";
// import { reducer as playerReducer } from "../application/Player/store/index";
// import { reducer as searchReducer } from "../application/Search/store/index";
// import { reducer as userReducer } from "../application/User/Login/store/index";

export default combineReducers({
  recommend: recommendReducer,
  album: albumReducer
  //   singers: singersReducer,
  //   rank: rankReducer,
  //   singerInfo: singerInfoReducer,
  //   player: playerReducer,
  //   search: searchReducer,
  //   user: userReducer
});
