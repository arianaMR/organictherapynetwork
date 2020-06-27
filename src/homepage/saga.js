import { all, takeLatest } from 'redux-saga/effects';
import { actions } from '.';

function* testSaga() {
  try {
    // yield other functionality something else
    // yield put(anotherFunction());
  } catch (error) {
    yield error;
  }
}

export default function*() {
  yield all([takeLatest(actions.SET_TEST, testSaga)]);
}
