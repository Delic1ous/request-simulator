export const UPDATE_LOADER = "UPDATE_LOADER";
export const STOP_LOADER = "STOP_LOADER";

export interface Action {
  type: "UPDATE_LOADER" | "STOP_LOADER";
  payload: Loader;
}

export interface Loader {
  loading: boolean;
  requestName: string;
  secondsLeft: number;
}

const initialState = { loading: false, requestName: "", secondsLeft: 0 };

export const loader = (state: Loader = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_LOADER":
      return payload;
    case "STOP_LOADER":
      return initialState;
    default:
      return state;
  }
};
