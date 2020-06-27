import { handleActions, createAction } from 'redux-actions';
import mapActions from '../helpers/mapActions';

export const actions = mapActions(['SET_TEST'], 'HOMEPAGE');
export const setTest = createAction(actions.SET_TEST);

export type ITestState = {
  test: string;
};
type ITestPayload = { payload: string };

export const initialState: ITestState = {
  test: 'hello World',
};

export default handleActions(
  {
    [actions.SET_TEST]: (state: ITestState, { payload: test }: ITestPayload) => {
      debugger;
      return {
        ...state,
        test,
      };
    },
  },
  initialState,
);
