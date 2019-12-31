import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";

import Loading from "../Loading";
import Loading2 from "../LoadingV2";
import { debounce } from "@common/utils";
import { ScrollContainer, PullUpLoading, PullDownLoading } from "./style";

const Scroll = forwardRef(function(props, ref) {
  const [bScroll, setBScroll] = useState(null);
  const ScrollContainerRef = useRef(null);

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
    ready
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);

  useEffect(() => {
    if (!ready) return;
    const scroll = new BScroll(ScrollContainerRef.current, {
      scrollX: direction === "horizental", // 是否开启横向滚动
      scrollY: direction === "vertical", // 是否开启纵向滚动
      probeType: 3, // 实时派发scroll事件
      click: click, // 是否派发click事件
      bounce: {
        // 滚动超过边缘的时候会有一小段回弹动画
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    console.log(scroll);
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, [ready]);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", scroll => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [bScroll, onScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      // 滚动结束
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [bScroll, pullUp, pullUpDebounce]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", pos => {
      // 鼠标/手指离开 pos: 位置坐标
      if (pos.y > 50) {
        // 滑动Y距离超过50
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [bScroll, pullDown, pullDownDebounce]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 调用Scroll组件的父组件可用的方法
  useImperativeHandle(
    ref,
    () => ({
      refresh() {
        if (bScroll) {
          bScroll.refresh();
          bScroll.scrollTo(0, 0);
        }
      },
      getBScroll() {
        return bScroll || null;
      }
    }),
    [bScroll]
  );

  return (
    <ScrollContainer ref={ScrollContainerRef}>
      {props.children}
      {/** 滑到底部加载动画 */}
      <PullUpLoading display={pullUpLoading.toString()}>
        <Loading></Loading>
      </PullUpLoading>
      {/** 滑到顶部加载动画 */}
      <PullDownLoading display={pullDownLoading.toString()}>
        <Loading2></Loading2>
      </PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
  ready: false
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool, //是否支持向上吸顶
  bounceBottom: PropTypes.bool, //是否支持向下触底
  ready: PropTypes.bool
};

export default Scroll;
