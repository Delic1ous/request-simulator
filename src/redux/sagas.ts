import {
  all,
  cancel,
  take,
  cancelled,
  delay,
  takeLatest,
  put,
} from "redux-saga/effects";
import { Request } from "./reducers/requests";
import { UPDATE_LOADER, STOP_LOADER } from "./reducers/loader";

interface SimulateAction {
  type: "SIMULATE_ASYNC";
  payload: Request[];
}

const generatePayload = (
  loading: boolean,
  requestName: string,
  secondsLeft: number
) => ({
  loading: loading,
  requestName: requestName,
  secondsLeft: secondsLeft,
});

function* simulateAsync(action: SimulateAction) {
  const { payload: requests } = action;
  try {
    for (let i = 0; i < requests.length; i++) {
      for (let q = 0; q < requests[i].delay; q++) {
        const payload = generatePayload(
          true,
          requests[i].requestName,
          requests[i].delay - q
        );
        yield put({ type: UPDATE_LOADER, payload });
        yield delay(1000);
      }
    }
  } finally {
    const payload = generatePayload(false, "", 0);
    if (yield cancelled()) {
      yield put({ type: STOP_LOADER, payload });
    } else {
      yield put({ type: STOP_LOADER, payload });
    }
  }
}

function* watchSimulateAsync() {
  while (true) {
    const task = yield takeLatest("SIMULATE_ASYNC", simulateAsync);
    yield take("SIMULATE_STOP");
    yield cancel(task);
  }
}

export default function* rootSaga() {
  yield all([watchSimulateAsync()]);
}
