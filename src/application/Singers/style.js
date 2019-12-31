import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 95px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  bottom: 0;
  width: 100%;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 0;
  margin: 0 5px;
  border-bottom: 1px solid #e4e4e4;
  .singer__img_wrap {
    margin-right: 20px;
    .singer__img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  .singer__name {
    font-size: 14px;
    color: #2e3030;
    font-weight: 500;
  }
`;
