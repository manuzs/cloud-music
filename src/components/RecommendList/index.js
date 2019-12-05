import React, { memo } from "react";
import LazyLoad from "react-lazyload";
import { withRouter } from "react-router-dom";

import { ListWrapper, ListItem, List } from "./style";
import MusicPlaceholder from "@assets/music-placeholder.png";

function RecommendList(props) {
  const { history, recommendList } = props;
  const enterDetail = e => {
    const ID = e.currentTarget.dataset.id;
    history.push(`/recommend/${ID}`);
  };

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {recommendList.map(recommend => {
          return (
            <ListItem
              key={recommend.id}
              data-id={recommend.id}
              onClick={enterDetail}
            >
              <div className="decorate"></div>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={MusicPlaceholder}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={recommend.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">
                    {Math.floor(recommend.playCount / 10000)}万
                  </span>
                </div>
              </div>
              <div className="desc">{recommend.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

RecommendList.defaultProps = {
  RecommendList: []
};

export default withRouter(memo(RecommendList));
