import { Spinner } from '@chakra-ui/react';
import React from 'react';

const SpinnerReload = ({ size = 'xl', color = 'blue.500' }) => {
	return (
		<div className="Spinner text-center my-4">
			<Spinner size={size} color={color} />
		</div>
	);
};

export default SpinnerReload;
