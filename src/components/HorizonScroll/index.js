import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { HorizonContent } from "./style";
import Scroll from "@components/Scroll";

const HorizonScroll = props => {
  const { title, value, onClick } = props;
  const contentRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (contentRef && contentRef.current) {
      const currentDom = contentRef.current;
      const List = Array.from(currentDom.querySelectorAll("span"));
      // const ListItems = [].slice.call(ListContent.children);
      const w = List.reduce((width, item) => {
        return (width += item.offsetWidth);
      }, 0);
      contentRef.current.style.width = `${w}px`;
      setReady(true);
    }
  }, []);

  const handleSpanClick = useCallback(
    e => {
      const key = e.currentTarget.dataset.key;
      onClick && onClick(key);
    },
    [onClick]
  );

  return (
    <Scroll direction="horizental" ready={ready}>
      <div ref={contentRef}>
        <HorizonContent>
          <span className="horizon__title">{title}:</span>
          {props.data.map(data => (
            <span
              className={`horizon__content ${
                value === data.key ? "selected" : ""
              }`}
              key={data.key}
              data-key={data.key}
              onClick={handleSpanClick}
            >
              {data.name}
            </span>
          ))}
        </HorizonContent>
      </div>
    </Scroll>
  );
};

HorizonScroll.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.string
};

HorizonScroll.defaultProps = {
  title: "",
  value: ""
};

export default memo(HorizonScroll);
