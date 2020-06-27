import './__mocks__';
import './suppressActError';

// need to set up root div in case we use a portal or something to mount onto this
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.append(root);

// remove saga monitor logs
(() => {
  /* eslint-disable no-console */
  const oldLog = console.log;
  console.log = (...args) => {
    /* eslint-enable no-console */
    const remainingMessages = args.filter(message =>
      typeof message === 'string' ? !message.includes('$$LogSagas()') : !!message,
    );
    if (remainingMessages.length) oldLog(...remainingMessages);
  };
})();
