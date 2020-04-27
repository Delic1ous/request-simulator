import React from "react";
import RequestInput from "./components/RequestInput";
import RequestsList from "./components/RequestsList";
import Loader from "./components/Loader";
import { Paper } from "./components/Styled/Paper";
import { Title } from "./components/Styled/Title";
import { ControlsWrapper } from "./components/Styled/ControlsWrapper";

const App = () => {
  return (
    <Paper>
      <ControlsWrapper>
        <Title>Request Simulator</Title>
        <RequestInput />
        <RequestsList />
      </ControlsWrapper>
      <Loader />
    </Paper>
  );
};

export default App;
