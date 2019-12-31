import styled from "styled-components";

export const HorizonContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 14px;
  height: 30px;
  .horizon__title {
    padding: 5px 0;
    color: grey;
    flex: 0 0 auto;
  }
  .horizon__content {
    flex: 0 0 auto;
    padding: 5px;
    &.selected {
      border-radius: 10px;
      opacity: 0.8;
      color: #d44439;
      border: 1px solid #d44439;
    }
  }
`;
