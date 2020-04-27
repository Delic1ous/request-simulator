import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { GlobalStateTree } from "../redux/rootReducer";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import { Request, Action } from "../redux/reducers/requests";

import Form, { ErrorMessage, Field } from "@atlaskit/form";
import { Loader } from "../redux/reducers/loader";
import styled from "styled-components";

const StyledForm = styled.form`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

interface InnerProps {}

type Props = Redux & InnerProps;

const RequestInput = (props: Props) => {
  const {
    requests,
    addRequest,
    loader: { loading },
  } = props;
  return (
    <Form<Request>
      onSubmit={(data: Request) => {
        addRequest(data);
      }}
    >
      {({ formProps, submitting, reset, getValues }) => (
        <StyledForm
          onSubmit={(event) => {
            event.preventDefault();
            formProps.onSubmit();
            if (getValues().delay > 0 && getValues().delay <= 10) reset();
          }}
        >
          <Field
            isDisabled={loading}
            name="requestName"
            label="Request name"
            isRequired
            defaultValue=""
          >
            {({ fieldProps }) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
              </Fragment>
            )}
          </Field>
          <Field
            isDisabled={loading}
            name="delay"
            label="Delay (sec)"
            defaultValue={1}
            isRequired
            validate={(value) => {
              if (value) {
                if (value > 10 || value <= 0) return "From 1s to 10s";
              }
            }}
          >
            {({ fieldProps, error, valid, meta }) => (
              <Fragment>
                <TextField type="number" {...fieldProps} />

                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <Button
            isDisabled={requests.length >= 10 || loading}
            type="submit"
            appearance="primary"
            isLoading={submitting}
            style={{ marginTop: 30, height: 40 }}
          >
            Add
          </Button>
        </StyledForm>
      )}
    </Form>
  );
};

const mapStateToProps = (state: GlobalStateTree): State => ({
  requests: state.requests,
  loader: state.loader,
});

const mapDispatchToProps: Dispatch = {
  addRequest: (payload: Request): Action => ({ type: "ADD_REQUEST", payload }),
};

type Redux = Dispatch & State;

interface Dispatch {
  addRequest: (payload: Request) => void;
}

interface State {
  requests: Request[];
  loader: Loader;
}

export default compose<Redux, InnerProps>(
  connect(mapStateToProps, mapDispatchToProps)
)(RequestInput);
