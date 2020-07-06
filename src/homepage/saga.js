import { all, takeLatest } from 'redux-saga/effects';
import { actions } from '.';

function* setHomepageImageSaga() {
  try {
    // yield other functionality something else
    // yield put(anotherFunction());
  } catch (error) {
    yield error;
  }
}

export default function*() {
  yield all([takeLatest(actions.SET_HOMEPAGE_IMAGE, setHomepageImageSaga)]);
}
