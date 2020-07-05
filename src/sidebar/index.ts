import { handleActions, createAction } from 'redux-actions';
import mapActions from '../helpers/mapActions';

// TODO should go through these and rename/rewrite/consolidate. just cleaned up all unused, but the remaining used options are not intuitive
export const actions = mapActions(
  ['RESET_SIDEBAR', 'CLOSE_SIDEBAR', 'INIT_SIDEBAR', 'CLOSE_MOBILE_MENU', 'TOGGLE_SIDEBAR_LOGIC'],
  'SIDEBAR',
);

export const resetSidebar = createAction(actions.RESET_SIDEBAR);
export const closeSidebar = createAction(actions.CLOSE_SIDEBAR);
export const initSidebar = createAction(actions.INIT_SIDEBAR);

export const closeMobileMenu = createAction(actions.CLOSE_MOBILE_MENU);

export const toggleSidebarLogic = createAction(actions.TOGGLE_SIDEBAR_LOGIC);

export type SidebarState = {
  detailInfo: { component?: { key: string } };
  showSidebar: boolean;
  showMobileMenu: boolean;
};

const initialState = {
  detailInfo: {},
  showSidebar: false,
  showMobileMenu: false,
};

type Action = { type: string; payload?: { component: { key: string } } };

const show = (state: SidebarState, action: Action) => ({
  ...state,
  showSidebar: true,
  detailInfo: action.payload,
});

export default handleActions(
  {
    [actions.RESET_SIDEBAR]: () => initialState,
    [actions.OPEN_SIDEBAR]: (state: SidebarState) => ({
      ...state,
      showSidebar: !state.showSidebar,
      showMobileMenu: !state.showMobileMenu,
    }),
    [actions.CLOSE_SIDEBAR]: (state: SidebarState) => ({ ...state, showSidebar: false, detailInfo: {} }),

    [actions.INIT_SIDEBAR]: show,

    [actions.OPEN_MOBILE_MENU]: (state: SidebarState) => ({
      ...state,
      showSidebar: false,
      showMobileMenu: !state.showMobileMenu,
    }),
    [actions.CLOSE_MOBILE_MENU]: (state: SidebarState) => ({ ...state, showMobileMenu: false }),
    [actions.TOGGLE_SIDEBAR_LOGIC]: (state: SidebarState, { payload }: Action) => {
      let newState;

      if (payload !== undefined) {
        const currentKey = state.detailInfo.component ? state.detailInfo.component.key : '';
        const newKey = payload.component.key;
        const closebar = currentKey === newKey;

        if (closebar) {
          newState = {
            detailInfo: {},
            showSidebar: false,
            showMobileMenu: false,
          };
        } else {
          newState = {
            detailInfo: payload,
            showSidebar: true,
            showMobileMenu: false,
          };
        }
      } else {
        newState = {
          detailInfo: {},
          showSidebar: false,
          showMobileMenu: !state.showMobileMenu,
        };
      }

      return {
        ...state,
        ...newState,
      };
    },
  },
  initialState,
);
