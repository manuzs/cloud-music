import React, { memo, useState, useRef, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Scroll from "@components/Scroll/index";
import Loading from "@components/Loading";
import Header from "@components/Header";
import AlbumDetail from "./components/AlbumDetail";

import style from "@assets/global-style";
import { Container } from "./style";
import { EnterLoading } from "@common/style";
import { isEmptyObject } from "@common/utils";
import { HEADER_HEIGHT } from "@common/constant";
import { getAlbumDetail } from "./request";
import { changePullUpLoading, changeEnterLoading, changeReady } from "./store";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarque, setIsMarque] = useState(false);

  const headerEl = useRef(null);
  // const musicNoteRef = useRef(null);
  const ID = props.match.params.id;

  const {
    songsCount,
    currentAlbum,
    pullUpLoading,
    enterLoading,
    ready
  } = props;
  const { musicAnimation } = props;
  const {
    getAlbumDataDispatch,
    changePullUpLoadingState,
    changeReadyDispatch
  } = props;

  const currentAlbumJS = currentAlbum ? currentAlbum.toJS() : {};

  const handleBack = useCallback(() => {
    setShowStatus(false);
    changeReadyDispatch(false);
  }, [changeReadyDispatch]);

  const handlePullUp = useCallback(() => {
    changePullUpLoadingState(true);
    changePullUpLoadingState(false);
  }, [changePullUpLoadingState]);

  const handleScroll = useCallback(
    pos => {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDom = headerEl.current;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbumJS && currentAlbumJS.name);
        setIsMarque(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarque(false);
      }
    },
    [currentAlbumJS]
  );
  useEffect(() => {
    getAlbumDataDispatch(ID);
  }, [ID, getAlbumDataDispatch]);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container play={songsCount}>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarque={isMarque}
        ></Header>
        {!isEmptyObject(currentAlbumJS) ? (
          <Scroll
            onScroll={handleScroll}
            pullUp={handlePullUp}
            pullUpLoading={pullUpLoading}
            bounceTop={false}
            ready={ready}
          >
            <AlbumDetail
              currentAlbum={currentAlbumJS}
              pullUpLoading={handlePullUp}
              musicAnimation={musicAnimation}
            ></AlbumDetail>
          </Scroll>
        ) : null}
        {enterLoading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
        {/* <MusicNote ref={musicNoteRef}></MusicNote> */}
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  currentAlbum: state.getIn(["album", "currentAlbum"]),
  // songsCount: state.getIn(["album", "songsCount"]), // 正在播放列表
  enterLoading: state.getIn(["album", "enterLoading"]),
  pullUpLoading: state.getIn(["album", "pullUploading"]),
  ready: state.getIn(["album", "ready"])
});

const mapDispatchToProps = dispatch => {
  return {
    getAlbumDataDispatch: id => {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumDetail(id));
    },
    changePullUpLoadingState: state => {
      dispatch(changePullUpLoading(state));
    },
    changeReadyDispatch: state => {
      dispatch(changeReady(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Album));
