export const ADD_REQUEST = "ADD_REQUEST"
export const REMOVE_REQUEST = "REMOVE_REQUEST"

export interface Action {
  type: "ADD_REQUEST" | "REMOVE_REQUEST";
  payload: Request,
  index?: number
}

export interface Request {
  requestName: string;
  delay: number
}

export const requestsList = (state: Request[] = [], action: Action) => {
  const {type, payload, index = 0} = action
  switch (type) {
    case ADD_REQUEST:
      return [...state].concat(payload);
    case REMOVE_REQUEST: 
      return [...state.slice(0, index), ...state.slice(index + 1)]
    default:
      return state;
  }
};
