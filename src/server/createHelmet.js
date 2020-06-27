import { clientHelmetInstance as Helmet } from '../App';

const nonHeaderContent = ['bodyAttributes', 'htmlAttributes', 'base'];

export default () => {
  const helmet = Helmet.renderStatic();

  return Object.entries(helmet)
    .filter(([key]) => !nonHeaderContent.includes(key))
    .reduce((acc, [, tag]) => acc + tag.toString(), '');
};
