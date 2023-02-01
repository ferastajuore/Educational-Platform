import { useEffect } from 'react';

const modal = ({ children, title, isActive, isClosed }) => {
	//  useEffert to close model with Escap key
	useEffect(() => {
		// Add a keyboard event to close all modals
		document.addEventListener('keydown', (event) => {
			const e = event || window.event;

			if (e.keyCode === 27) {
				// Escape key
				isClosed(isActive);
			}
		});

	}, [isClosed, isActive]);

	return (
			<div className={`modal ${isActive ? 'is-active' : ''}`}>
				<div
					className="modal-background"
					onClick={() => isClosed(isActive)}
				></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title text-center text-capitalize">
							{title}
						</p>
						<button
							className="delete"
							aria-label="close"
							onClick={() => isClosed(isActive)}
						></button>
					</header>
					<section className="modal-card-body">{children}</section>
				</div>
			</div>
	);
};

export default modal;
