import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { setTest } from '../index';
import useDispatch from '../../helpers/hooks/useDispatch';
import Button from '../../common/atoms/button/Button';
import endpoints from '../../config/endpoints';
import GET_HOMEPAGE from '../graphql';

const HomePageContainer = ({ test }) => {
  const setTestAction = useDispatch(setTest);
  const { data, loading, error } = useQuery(GET_HOMEPAGE, {
    variables: endpoints.contentful.homepage,
    context: { clientName: 'contentful' },
  });

  if (error || loading || !data) return null;

  const { homepage } = data;
  const { header, subtext, image } = homepage;

  return (
    <div className="Home">
      <Button type="submit" onClick={() => setTestAction('Goodnight world')}>
        Update Text
      </Button>
      <div className="Home-header">
        <img src={image.url} className="Home-logo" alt="logo" />
        <h2>{test}</h2>
      </div>
      <p className="Home-intro">{header}</p>
      <p className="Home-intro">{subtext}</p>
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  );
};

const mstp = s => ({
  test: s.homepage.test,
});

export default connect(mstp, null)(HomePageContainer);
