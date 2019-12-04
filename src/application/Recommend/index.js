import React, { memo } from "react";
import { forceCheck } from "react-lazyload";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";

import Slider from "../../components/slider/";
import RecommendList from "../../components/list/";
import Scroll from "../../baseUI/scroll/index";
import { EnterLoading } from "./../Singers/style";
import Loading from "../../baseUI/loading-v2/index";

import * as actionTypes from "./store/actionCreators";
import { Content } from "./style";

function Recommend(props) {
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider></Slider>
          <RecommendList></RecommendList>
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Content>
  );
}

export default memo(Recommend);
