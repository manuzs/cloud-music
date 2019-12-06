import React, { memo } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { CSSTransition } from "react-transition-group";

import Slider from "@components/Slider";
import Scroll from "@components/Scroll";
import LoadingV2 from "@components/Loading";
import Header from "@components/Header";
import AlbumDetail from "./components/AlbumDetail";

import { Container } from "./style";
import style from "@assets/global-style";
import { EnterLoading } from "@common/style";

function Album(props) {
  return (
    <CSSTransition in={true} timeout={30} classNames="fly" appear={true}>
      <Container>
        <Header
          title={"我是标题我是标题我是标题我是标题"}
          isMarque={true}
        ></Header>
      </Container>
    </CSSTransition>
  );
}

export default memo(Album);
