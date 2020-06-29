export default (currentPathname, paths = []) =>
  paths.filter(path => path !== '/').some(path => path === currentPathname.slice(0, path.length));
