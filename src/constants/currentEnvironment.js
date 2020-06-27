export default (() => {
  let env;
  if (process.browser) {
    env = window.__ENVIRONMENT__;
    delete window.__ENVIRONMENT__;
  } else env = process.env.ENVIRONMENT;
  return env || 'prod';
})();
