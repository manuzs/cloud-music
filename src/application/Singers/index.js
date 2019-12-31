import React, { memo, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Container, ListContainer, List, ListItem } from "./style";
import Scroll from "@components/Scroll";
import { categoryTypes, alphaTypes } from "@common/constant";
import HorizonScroll from "@components/HorizonScroll";
import { EnterLoading } from "@common/style";
import Loading from "@components/Loading";
import { ActionCreator } from "./store";
import {
  getHotSingersList,
  refreshMoreHotSingersList,
  getSingersList,
  refreshMoreSingersList
} from "./request";
import LazyLoad, { forceCheck } from "react-lazyload";
import SingerPlaceholder from "@assets/singer.png";

const Singers = props => {
  const {
    category,
    alpha,
    enterLoading,
    pullDownLoading,
    pullUpLoading,
    singersList,
    ready,
    hasMore
  } = props;
  const {
    pullDownRefresh,
    pullUpRefresh,
    dispatchChangeAlpha,
    dispatchChangeCategory,
    dispatchGetHotSingers
  } = props;
  const singersListRef = useRef(null);
  const handleCategoryClick = useCallback(
    cat => {
      if (cat === category) return false;
      dispatchChangeCategory(cat);
      singersListRef.current.refresh();
    },
    [category, dispatchChangeCategory]
  );

  const handleAlphaClick = useCallback(
    newVal => {
      if (newVal === alpha) return false;
      dispatchChangeAlpha(alpha);
      singersListRef.current.refresh();
    },
    [alpha, dispatchChangeAlpha]
  );
  useEffect(() => {
    if (!singersList.size) {
      dispatchGetHotSingers();
    }
    // eslint-disable-next-line
  }, []);

  const handlePullDown = () => {
    pullDownRefresh(category, alpha);
  };

  // 上拉加载更多
  const handlePullUp = () => {
    if (!hasMore) pullUpRefresh(category === "");
  };

  const singersListJS = singersList ? singersList.toJS() : [];

  const renderList = () => {
    return (
      <List>
        {singersListJS.map(singer => {
          return (
            <ListItem key={singer.id}>
              <div className="singer__img_wrap">
                <LazyLoad
                  placeholder={
                    <img
                      className="singer__img"
                      src={SingerPlaceholder}
                      alt="music"
                    />
                  }
                >
                  <img
                    className="singer__img"
                    src={`${singer.picUrl}?param=300x300`}
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="singer__name">{singer.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  return (
    <div>
      <Container>
        <HorizonScroll
          title="分类(默认热门)"
          data={categoryTypes}
          value={category}
          onClick={handleCategoryClick}
        ></HorizonScroll>
        <HorizonScroll
          title="首字母"
          data={alphaTypes}
          value={alpha}
          onClick={handleAlphaClick}
        ></HorizonScroll>
      </Container>
      <ListContainer>
        <Scroll
          ready={ready}
          onScroll={forceCheck}
          pullDown={handlePullDown}
          pullUp={handlePullUp}
          pullDownLoading={pullDownLoading}
          pullUpLoading={pullUpLoading}
          ref={singersListRef}
        >
          {renderList()}
        </Scroll>
      </ListContainer>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      <div>没有更多内容了...</div>
    </div>
  );
};

const mapStateToProps = state => ({
  singersList: state.getIn(["singers", "singersList"]),
  category: state.getIn(["singers", "category"]),
  alpha: state.getIn(["singers", "alpha"]),
  offset: state.getIn(["singers", "offset"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  ready: state.getIn(["singers", "ready"]),
  hasMore: state.getIn(["singers", "hasMore"])
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetHotSingers: () => {
      dispatch(getHotSingersList());
    },
    dispatchChangeCategory: cat => {
      dispatch(ActionCreator.changeCategory(cat));
      dispatch(ActionCreator.changeEnterLoading(true));
      dispatch(ActionCreator.changeOffset(0));
      dispatch(getSingersList());
    },
    dispatchChangeAlpha: alpha => {
      dispatch(ActionCreator.changeAlpha(alpha));
      dispatch(ActionCreator.changeEnterLoading(true));
      dispatch(ActionCreator.changeOffset(0));
      dispatch(getSingersList());
    },
    pullUpRefresh: hot => {
      dispatch(ActionCreator.changePullUpLoading(true));
      hot
        ? dispatch(refreshMoreHotSingersList())
        : dispatch(refreshMoreSingersList());
    },
    pullDownRefresh: (category, alpha) => {
      dispatch(ActionCreator.changePullDownLoading(true));
      if (category === "" && alpha === "") {
        dispatch(getHotSingersList());
      } else {
        dispatch(getSingersList());
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));
