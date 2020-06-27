import { shallowEqual, useSelector } from 'react-redux';

// temporary fix to stop typescript errors. thid voids type inference though so should find a more elegant solution
export default (selector: any): any => useSelector(selector, shallowEqual);
