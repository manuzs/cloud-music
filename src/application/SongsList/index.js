import React, { memo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { SongList, SongItem } from "./style";
import { getName } from "@common/utils";
// import { ONE_PAGE_COUNT } from "@common/constant";
// import { } from "@app/Player/store/actionCreators"

const SongsLit = props => {
  //   const [startIndex, setStartIndex] = useState(0);
  const {
    songs,
    collectCount,
    showCollect,
    showBackground,
    musicAnimation
    // loading = false
    // usePageSplit
  } = props;
  const {
    changePlayListDispatch,
    changeCurrentIndexDispatch,
    changeSequecePlayListDispatch
  } = props;
  const totalCount = songs.length;

  const renderCollect = count => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
    );
  };

  const selectItem = (e, index) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };

  const renderSongList = songs => {
    return songs.map((song, index) => {
      return (
        <li key={song.id} onClick={e => selectItem(e, index)}>
          <span className="index">{index + 1}</span>
          <div className="info">
            <span>{song.name}</span>
            <span>
              {song.ar ? getName(song.ar) : getName(song.artists)} -{" "}
              {song.al ? song.al.name : song.album.name}
            </span>
          </div>
        </li>
      );
    });
  };

  return (
    <SongList showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? renderCollect(collectCount) : null}
      </div>
      <SongItem>{renderSongList(songs)}</SongItem>
    </SongList>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  scrollY: state.getIn(["album", "scrollY"])
});

// 映射dispatch到props上
const mapDispatchToProps = dispatch => {
  return {
    changePlayListDispatch(data) {
      // dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data) {
      // dispatch(changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data) {
      // dispatch(changeSequecePlayList(data));
    }
  };
};

const withConnect = compose(connect(mapStateToProps, mapDispatchToProps), memo);
export default withConnect(SongsLit);
