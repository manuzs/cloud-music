import styled, { keyframes } from "styled-components";
import style from "@assets/global-style";

export const HeaderContainer = styled.div`
  position: fixed;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px 5px;
  color: ${style["font-color-light"]};
  z-index: 100;
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style["font-size-l"]};
    font-weight: bold;
  }
`;
const marquee = keyframes`
  0% {
    transform: translateX(0);
    }

    47% {
      transform: translateX(-100%);
    }

    48% {
      transform: translate(-105%, 1000px);
    }

    49% {
      transform: translate(400px, 1000px);
    }

    50% {
      transform: translate(400px, 0);
    }

    100% {
      transform: translateX(0);
    }
`;

export const MarqueeContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Marquee = styled.div`
  transform: translateZ(0);
  will-change: transform;
  animation: ${marquee} 8s linear infinite;
  > h1 {
    white-space: nowrap;
  }
`;
