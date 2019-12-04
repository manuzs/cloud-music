import React, { useCallback } from "react";
import { renderRoutes } from "react-router-config";
import { Top, Tab, TabItem } from "./HomeLayout.style";
import { NavLink } from "react-router-dom";
// import Player from "../application/Player";

const NavConfig = [
  {
    to: "/recommend",
    activeClassName: "selected",
    text: "推荐"
  },
  {
    to: "/singers",
    activeClassName: "selected",
    text: "歌手"
  },
  {
    to: "/rank",
    activeClassName: "selected",
    text: "排行榜"
  }
];

function Home(props) {
  const { route } = props;

  const searchSource = useCallback(() => {
    props.history.push("/search");
  }, [props.history]);

  return (
    <>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">云音悦</span>
        <span className="iconfont search" onClick={searchSource}>
          &#xe62b;
        </span>
      </Top>
      <Tab>
        {NavConfig.map((nav, index) => {
          return (
            <NavLink
              to={nav.to}
              key={index}
              activeClassName={nav.activeClassName}
            >
              <TabItem>
                <span>{nav.text}</span>
              </TabItem>
            </NavLink>
          );
        })}
      </Tab>
      {renderRoutes(route.routes)}
      {/* <Player></Player> */}
    </>
  );
}

export default React.memo(Home);
