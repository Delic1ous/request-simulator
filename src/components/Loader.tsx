import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { GlobalStateTree } from "../redux/rootReducer";
import styled from "styled-components";
import { Loader as LoaderInterface } from "../redux/reducers/loader";

import logo from "../logo.svg";

interface InnerProps {}

type Props = Redux & InnerProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface AnimationProps {
  load: boolean;
}

const Animation = styled.div`
  text-align: center;
  img {
    transition: height 0.5s;
    height: 200px;
    
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    img {
      animation: App-logo-spin infinite 6s linear;
      animation-play-state: ${(p: AnimationProps) => (p.load ? "running" : "paused")};
    }
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader = (props: Props) => {
  const {
    loader: { loading, requestName, secondsLeft },
  } = props;
  return (
    <Wrapper>
      <Animation load={loading}>
        <img src={logo} alt="logo" />
      </Animation>
      <h4>{requestName}</h4>
      {!!secondsLeft && <div>({secondsLeft} sec left)</div>}
    </Wrapper>
  );
};

const mapStateToProps = (state: GlobalStateTree): State => ({
  loader: state.loader,
});

type Redux = State;

interface State {
  loader: LoaderInterface;
}

export default compose<Redux, InnerProps>(connect(mapStateToProps, null))(
  Loader
);
