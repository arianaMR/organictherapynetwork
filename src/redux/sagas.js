import { fork, all } from 'redux-saga/effects';
import homepage from '../homepage/saga';

export default function* rootSaga() {
  yield all([fork(homepage)]);
}
