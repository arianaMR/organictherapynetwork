import React from 'react';
import { Link } from 'react-router-dom';

export const removeMedmen = (path = '') => path.replace(/(https?:)?(\/\/)?(www\.)?medmen\.com/, '');

type IToObject = { pathname: string };
type IUniversalLink = { to: string | IToObject; children: Partial<React.ReactNode> };

export default function UniversalLink({ to = '', children = null, ...props }: IUniversalLink) {
  const isString = typeof to === 'string';
  const isObject = typeof to === 'object' && to?.pathname;
  if (isString) to = removeMedmen(to as string);
  if (isObject) (to as IToObject).pathname = removeMedmen((to as IToObject).pathname);
  if (isObject || to[0] === '/')
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  return (
    <a href={to as string} {...props}>
      {children}
    </a>
  );
}
