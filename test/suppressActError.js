/* eslint-disable no-console */

// temporary patch until act error is fixed
const actErrorMatcher = arg => typeof arg === 'string' && !arg.includes('act(');
const originalError = console.error;
console.error = (...args) => {
  const isActError = args.some(actErrorMatcher);
  if (isActError) return;
  const remaining = args.filter(actErrorMatcher);
  if (remaining.length) originalError(...remaining);
};
