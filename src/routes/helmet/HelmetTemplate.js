import Helmet from 'react-helmet';
import React from 'react';

const HelmetTemplate = ({
	image = '',
	keywords = '',
	children = null,
	url = '',
	twitterTitle = '',
	fbTitle = '',
	twitterDescription = '',
	fbDescription = '',
	twitterImage = '',
	fbImage = '',
	title,
	description,
}) => (
	<Helmet>
		{title && <title>{title}</title>}
		{keywords && <meta name='keywords' content={keywords} />}
		{description && <meta name='description' content={description} />}
		<meta name='twitter:site' content='@[SITE_TWITTER]' />
		<meta name='twitter:card' content='summary' />
		{twitterTitle || (title && <meta name='twitter:title' content={twitterTitle || title} />)}
		{(twitterDescription || description) && (
			<meta name='twitter:description' content={twitterDescription || description} />
		)}
		{(image || twitterImage) && <meta name='twitter:image' content={`https:${twitterImage || image}`} />}
		{url && <meta name='twitter:url' content={url} />}
		{(title || fbTitle) && <meta property='og:title' content={fbTitle || title} />}
		{fbImage || (image && <meta property='og:image' content={`https:${fbImage || image}`} />)}
		{(fbDescription || description) && <meta property='og:description' content={fbDescription || description} />}
		{children}
	</Helmet>
);

export default HelmetTemplate;
