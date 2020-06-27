/* eslint-disable no-console */
import chalk from 'chalk';
import util from 'util';

const { error } = console;
const { warn } = console;
const { log } = console;

const stringifyNestedObjects = message => util.inspect(message, { depth: null });

export default (() => {
  console.error = (...args) => {
    // might want to revisit this, but it is super annoying having all the proptypes, unique key, and other react-specific warnings clogging the server console as though these are actual errors. this filters them all out
    if (!args.some(arg => typeof arg === 'string' && arg.includes('Warning: '))) {
      error(chalk.red.bold(...args.map(stringifyNestedObjects)));
    }
  };

  console.warn = (...args) =>
    warn(
      chalk.yellow.bold(
        ...args
          .filter(arg => {
            if (typeof arg !== 'string') return true;
            return !arg.includes('Warning: ');
          })
          .map(stringifyNestedObjects),
      ),
    );

  console.log = (...args) =>
    log(
      chalk.cyan.bold(
        ...args
          .filter(arg => {
            if (typeof arg !== 'string') return true;
            return !arg.includes('Warning: Failed prop type:');
          })
          .map(stringifyNestedObjects),
      ),
    );

  // in case you want to use the original methods still
  // EX:generator functions in custom are huge. regular version just prints the name which is a lot nicer
  console.originalLog = log;
  console.originalWarn = warn;
  console.originalError = error;
})();
