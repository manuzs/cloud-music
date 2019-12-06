import React, { memo } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";

import Slider from "@components/Slider";
import RecommendList from "@components/RecommendList";
import Scroll from "@components/Scroll";
import LoadingV2 from "@components/Loading";
import Header from "@components/Header";
import AlbumDetail from "./components/AlbumDetail";

import { Container } from "./style";
import style from "@assets/global-style";
import { EnterLoading } from "@common/style";

function Album(props) {
  return <div>我是推荐页</div>;
}

export default memo(Album);
