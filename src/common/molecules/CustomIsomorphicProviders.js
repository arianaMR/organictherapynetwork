import React from 'react';
import { QueryStringProvider } from '../../helpers/hooks/useQueryString';

const providers = [QueryStringProvider];

const CustomProviders = ({ children }) => {
	const Initial = providers[providers.length - 1];
	return providers.slice(0, -1).reduceRight((acc, X) => <X>{acc}</X>, <Initial>{children}</Initial>);
};

export default CustomProviders;
