import React from 'react';

import useNavigation from '../../helpers/hooks/useNavigation';
import MobileMenuLink from '../atoms/MobileMenuLink';

type IMobileMenuNavContainer = { setPage: (data: any) => void };

export default function MobileMenuNavContainer({ setPage }: IMobileMenuNavContainer) {
  const navbarItems = useNavigation();

  return navbarItems.map((x: { title: string; url: string }) => (
    <MobileMenuLink nav={x} setPage={setPage} key={`${x.title}${x.url}`} />
  ));
}
