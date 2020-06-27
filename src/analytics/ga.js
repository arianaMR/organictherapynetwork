//  general syntax of ga function call

// ga(‘send’, {
// ‘hitType’: ‘event’,
// ‘eventCategory’: [category],
// ‘eventAction’: [Action],
// ‘eventLabel’: [Label],
// ‘eventValue’: [Value],
// ‘nonInteraction’: true
// });
/* eslint-disable @typescript-eslint/no-empty-function */
const { ga = () => {} } = process.browser ? window : {};

ga.send = (...args) => (process.browser ? window.ga('send', ...args) : () => {});
ga.event = event => ga.send('event', event);
ga.nonInteractive = event => ga.event({ ...event, nonInteraction: true });

export default ga;
