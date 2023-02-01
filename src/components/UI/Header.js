import React from 'react';

const HeaderTitle = ({ title, className = 'text-center', textSize }) => {
	return (
		<div className={`mb-3 ${className}  headerTitle`}>
			<h2 className={textSize ? textSize : ''}>{title}</h2>
		</div>
	);
};

export default HeaderTitle;
