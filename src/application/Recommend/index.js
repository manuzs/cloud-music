import React, { memo, useEffect } from "react";
import { forceCheck } from "react-lazyload";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";

import Slider from "@components/Slider";
import Scroll from "@components/Scroll";
import LoadingV2 from "@components/Loading";
import RecommendList from "./components/RecommendList";

import { getBannerList, getRecommendList } from "./request";
import { EnterLoading } from "@common/style";
import { Content } from "./style";

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;
  const { getBannerDataDispatch, getRecommendDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading && (
        <EnterLoading>
          <LoadingV2></LoadingV2>
        </EnterLoading>
      )}
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

const mapStateToProps = state => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"])
});

const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(getBannerList());
    },
    getRecommendDataDispatch() {
      dispatch(getRecommendList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
