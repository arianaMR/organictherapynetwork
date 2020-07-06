export default () =>
  process.browser &&
  document
    .createElement('canvas')
    .toDataURL('image/webp')
    .includes('data:image/webp');
