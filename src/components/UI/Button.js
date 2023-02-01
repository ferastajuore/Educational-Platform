import React from 'react';

const Button = ({ title, style, className, onClick }) => {
	return (
		<button className={`btn ${className}`} style={style} onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
