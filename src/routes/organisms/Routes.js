import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import withHelmet from '../helmet/withHelmet';
import withTracker from '../../analytics/withTracker';

import HomePageHelmet from '../helmet/HomepageHelmet';
import HomePageContainer from '../../homepage/containers/HomePageContainer';
import NotFoundPage from './NotFoundPage';

export const routes = [
	{
		path: '/',
		exact: true,
		component: withHelmet(HomePageContainer)(HomePageHelmet),
	},
	{
		path: '/re-route',
		exact: true,
		component: () => <Redirect to='/' />,
	},
	// Default to 404
	{ component: NotFoundPage, path: '*' },
	// add google analytics tracking for each page
].map((route) => ({ ...route, component: withTracker(route.component) }));

// Routes Component for client side
export default () => (
	<Switch>
		{routes.map((props) => (
			<Route {...props} key={props.path} />
		))}
	</Switch>
);
