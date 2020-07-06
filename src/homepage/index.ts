import { handleActions, createAction } from 'redux-actions';
import mapActions from '../helpers/mapActions';

export const actions = mapActions(['SET_HOMEPAGE_IMAGE'], 'HOMEPAGE');
export const setHomepageImage = createAction(actions.SET_HOMEPAGE_IMAGE);

export type IHomepageState = {
  homepage: string;
};
type IHomepagePayload = { payload: string };

export const initialState: IHomepageState = {
  homepage: '',
};

export default handleActions(
  {
    [actions.SET_HOMEPAGE_IMAGE]: (state: IHomepageState, { payload: homepage }: IHomepagePayload) => ({
      ...state,
      homepage,
    }),
  },
  initialState,
);
