import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Header, Sidebar, Footer } from './index';

const AdminLayout = ({ children }) => {
	// HOOKS
	const { push } = useRouter();

	const [collapsed, setCollapsed] = useState(false);
	const [userData, setUserData] = useState();
	const [darkMode, setDarkMode] = useState(true);
	const [direction, setDirection] = useState('RTL');
	const [mainHeight, setMainHeight] = useState(0);

	useEffect(() => {
		const storageData =
			localStorage.getItem('auth-user') !== null
				? JSON.parse(localStorage.getItem('auth-user'))
				: false;

		setUserData(storageData.user);

		if (!storageData.isAuth) {
			push('/Login');
		}
	}, []);

	// useEffect for width and heigth
	useEffect(() => {
		// display none win window  with size in 600
		setCollapsed(window.innerWidth < 600);

		const updateHeightMain = () => {
			const newHeight = window.innerHeight;
			setMainHeight(newHeight);
		};

		window.addEventListener('resize', updateHeightMain);

		return () => window.removeEventListener('resize', updateHeightMain);
	}, [setMainHeight]);

	// handler Collapsed
	const handleCollapsedChange = (collapsed) => {
		setCollapsed(!collapsed);
	};

	// handle dark Mode
	const handleDarkMode = (mode) => {
		setDarkMode(!mode);
		// dispatch(UIMODE(!mode));
	};

	// handle direction
	const handleDirection = (direction, lang) => {
		setDirection(direction);
		// i18n.changeLanguage(lang);
	};

	const contentDirRTL = !collapsed ? 'contentDirRTL-short' : 'contentDirRTL-full';
	const contentDirLTR = !collapsed ? 'contentDirLTR-short' : 'contentDirLTR-full';

	return (
		<div className="admin">
			<Sidebar collapsed={collapsed} />

			<div
				className={`admin-content 
							
							${direction === 'RTL' ? contentDirRTL : contentDirLTR}
						`}
			>
				<Header
					collapsed={collapsed}
					userData={userData}
					handleCollapsedChange={handleCollapsedChange}
					darkMode={darkMode}
					handleDarkMode={handleDarkMode}
					handleDirection={handleDirection}
					// socket={isConnected}
				/>

				<main className="container">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default AdminLayout;
