import _ from 'lodash';
import { useRouter } from 'next/router';
import { useState, useEffect, use } from 'react';
// import { connect, useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';

import { Header, Sidebar, Footer } from './index';
// import { UIMODE, UIDIRECTION } from '@Action/UIActions';
// import Spinner from '@UI/Spinner';
// import socket from '@Middleware/socketIo';

const AdminLayout = ({ children, isLoggedIn }) => {
	// HOOKS
	const { push, isReady } = useRouter();
	// const dispatch = useDispatch();
	// const { i18n } = useTranslation();

	// COOKIES
	// const currentLangCod = Cookies.get('i18next') || 'ar';
	// const cookieDirecation = Cookies.get('UI_Direction');

	// USE STATE
	// const [isConnected, setIsConnected] = useState(socket.connected);
	const [collapsed, setCollapsed] = useState(false);
	const [userData, setUserData] = useState();
	const [darkMode, setDarkMode] = useState(true);
	const [direction, setDirection] = useState('RTL');
	const [loading, setLoading] = useState(true);
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

	// useEffect for auth page
	// useEffect(() => {
	// 	const storageData =
	// 		localStorage.getItem('Auth-user') !== null
	// 			? JSON.parse(localStorage.getItem('Auth-user'))
	// 			: false;

	// 	// console.log(storageData);

	// 	if (!storageData.isAuth) {
	// 		push('/Login');
	// 	}

	// 	if (storageData) {
	// 		setLoading(false);
	// 		setUserData(storageData.user);
	// 		dispatch({
	// 			type: 'LOGIN',
	// 			user: storageData.user,
	// 		});
	// 	}
	// }, [push]);

	// useEffect for socket io
	// useEffect(() => {
	// 	socket.on('connect', () => {
	// 		setIsConnected(true);
	// 	});

	// 	socket.connect();
	// 	if (isConnected) {
	// 		socket.emit('newUser', {
	// 			name: isLoggedIn && isLoggedIn.user.name,
	// 			userId: isLoggedIn && isLoggedIn.user._id,
	// 			socketId: socket.id,
	// 		});
	// 	}

	// 	return () => {
	// 		socket.off('connect');
	// 	};
	// }, [socket, isLoggedIn, isConnected]);

	//  useEffect for handler UI
	// useEffect(() => {
	// 	// handler dark mode
	// 	const UIStorage =
	// 		localStorage.getItem('UIStorage') !== null
	// 			? JSON.parse(localStorage.getItem('UIStorage'))
	// 			: false;

	// 	setDarkMode(UIStorage);
	// 	dispatch({
	// 		type: 'UI_MODE',
	// 		mode: UIStorage,
	// 	});

	// 	const dir = currentLangCod === 'ar' ? 'RTL' : 'LTR';
	// 	setDirection(dir);
	// 	dispatch(UIDIRECTION(dir));
	// }, [currentLangCod, cookieDirecation, isConnected]);

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

	// if (loading) {
	// 	return <Spinner />;
	// }

	// ${direction === 'RTL' ? 'contentDirRTL' : 'contentDirLTR'}
	// <div className="admin" style={{ direction: direction === 'RTL' ? 'rtl' : 'ltr' }}>
	// return isLoggedIn.user ? (

	return (
		<div className="admin" style={{ direction: direction === 'RTL' ? 'rtl' : 'ltr' }}>
			{/* <Sidebar collapsed={collapsed} userData={isLoggedIn.user} /> */}
			<Sidebar collapsed={collapsed} />

			<div
				className={`admin-content 
							${darkMode ? 'darkMode' : 'lightMode'} 
							${direction === 'RTL' ? contentDirRTL : contentDirLTR}
						`}
				// style={direction === 'RTL' ? contentDirRTL : contentDirLTR}
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

				<main
					className={`container 
					${darkMode ? 'darkMode' : 'lightMode'}`}
					// style={{ minHeight: mainHeight + 'px' }}
				>
					{children}
				</main>
				<Footer />
			</div>
		</div>
	);
};

// ) : (
// 	<Spinner />
// );

// const mapStateToProps = ({ auth }) => ({
// 	isLoggedIn: auth,
// });

export default AdminLayout;
