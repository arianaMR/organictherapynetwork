/* eslint-disable no-console */
import { Store } from 'redux';
import { getDataFromTree } from '@apollo/react-ssr';
// import { mountHeaderSagas } from '../header/saga';

export type CustomStore = {
  runSaga: (arg: () => void) => { toPromise: () => Promise<string> };
} & Store;
interface Client {
  extract: () => object;
}

// const getCriticalSagaPromises = (store: CustomStore) => mountHeaderSagas.map(saga => store.runSaga(saga).toPromise());

export default async (ServerApp: React.ReactNode, store: CustomStore, client: Client) => {
  try {
    // make promise array of 1) apollo calls needed for app render on selected page, 2) all sagas we need to have preopulate redux store on app boot
    // wait for all data to populate before rendering app string/sending back response w/ apollo and redux state written to document for client boot
    // await Promise.all(getCriticalSagaPromises(store));
    await getDataFromTree(ServerApp);
    return { apolloState: client.extract(), reduxState: store.getState() };
  } catch (error) {
    console.error('APOLLO/SAGA ERROR: ', JSON.stringify(error, null, 2));
    return { apolloState: '', reduxState: '' };
  }
};
