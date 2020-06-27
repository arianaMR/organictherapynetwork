import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import rootReducer from './reducers';

const saveSubsetFilter = createBlacklistFilter('header', ['navbarItems', 'announcements', 'states', 'stores']);

const storage = process.browser ? require('redux-persist/lib/storage').default : {};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['sidebar'],
  whitelist: ['header', 'cart', 'checkout'],
  transforms: [saveSubsetFilter],
};

export default persistReducer(persistConfig, process.env.NODE_ENV === 'test' ? () => ({}) : rootReducer);
