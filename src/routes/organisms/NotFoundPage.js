import React from 'react';
import NotFoundSrc from '../../assets/images/page-not-found.jpg';
import Status from '../atoms/Status';

const NotFoundPage = () => (
	<Status status={404}>
		<img title='404' src={NotFoundSrc} />
	</Status>
);
export default NotFoundPage;
