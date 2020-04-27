import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { GlobalStateTree } from "../redux/rootReducer";
import { Request, Action } from "../redux/reducers/requests";
import Button, { ButtonGroup } from "@atlaskit/button";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import styled from "styled-components";
import { Loader } from "../redux/reducers/loader";

interface InnerProps {}

type Props = Redux & InnerProps;

const List = styled.div`
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const RequestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: calc(100% - 16px);
  border: 1px solid grey;
  padding: 0 8px;
  margin: 8px 0px;
  border-radius: 4px;
  p {
    font-size: 18px;
  }
  p.name {
    width: calc(50% - 30px);
    line-break: anywhere;
  }
  p.delay {
    width: calc(50% - 15px);
  }
`;

const IconButton = styled.button`
  border: none;
  cursor: pointer;
  height: 60px;
  background-color: transparent;
  &:hover {
    color: red;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

const StyledButton = styled(Button)`
  margin-right: 14px;
`;

const RequestsList = (props: Props) => {
  const {
    requests,
    removeRequest,
    start,
    stop,
    loader: { loading },
  } = props;
  return (
    <List>
      {requests.map((request, index) => (
        <RequestContainer key={index}>
          <p className="name">{request.requestName}</p>
          <p className="delay">{request.delay} sec</p>
          <IconButton
            disabled={loading}
            onClick={() => removeRequest(request, index)}
          >
            <TrashIcon label="Delete" />
          </IconButton>
        </RequestContainer>
      ))}
      <br />
      <ButtonGroup>
        <StyledButton
          isDisabled={requests.length < 1 || loading}
          onClick={() => start(props.requests)}
          appearance="primary"
        >
          Run
        </StyledButton>
        <Button
          isDisabled={requests.length < 1 || !loading}
          onClick={stop}
          appearance="danger"
        >
          Stop
        </Button>
      </ButtonGroup>
    </List>
  );
};

const mapStateToProps = (state: GlobalStateTree): State => ({
  requests: state.requests,
  loader: state.loader,
});

const mapDispatchToProps: Dispatch = {
  removeRequest: (payload: Request, index: number): Action => ({
    type: "REMOVE_REQUEST",
    payload,
    index,
  }),
  start: (payload: Request[]) => ({ type: "SIMULATE_ASYNC", payload }),
  stop: () => ({ type: "SIMULATE_STOP" }),
};

type Redux = Dispatch & State;

interface Dispatch {
  removeRequest: (payload: Request, index: number) => void;
  start: (payload: Request[]) => void;
  stop: () => void;
}

interface State {
  requests: Request[];
  loader: Loader;
}

export default compose<Redux, InnerProps>(
  connect(mapStateToProps, mapDispatchToProps)
)(RequestsList);
