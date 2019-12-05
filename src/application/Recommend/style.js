import styled from "styled-components";

export const Content = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  bottom: ${props => (props.play > 0 ? "60px" : 0)};
  width: 100%;
`;
export const EnterLoading = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`;
