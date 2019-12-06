import styled from "styled-components";
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
