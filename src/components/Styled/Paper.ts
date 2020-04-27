import styled from "styled-components";

export const Paper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px auto;
  width: 800px;
  min-height: calc(100vh - 48px - 28px);
  position: relative;
  background: #e8e8e8;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5),
    0px 0px 4px 0px rgba(0, 0, 0, 0.5);
  padding: 14px;
  border-radius: 8px;
  flex-wrap: wrap
`;
