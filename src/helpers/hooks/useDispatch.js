import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default action => {
  const dispatch = useDispatch();
  return useCallback((...args) => dispatch(action(...args)), []);
};
