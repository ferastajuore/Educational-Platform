import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { GoThreeBars } from 'react-icons/go';
import { Avatar } from '@chakra-ui/react';

import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const Header = ({ collapsed, handleCollapsedChange, userData, darkMode }) => {
	const router = useRouter();

	const [isAcitve, setIsAcitve] = useState(false);
	const [Logout, setIsLogout] = useState(false);

	useEffect(() => {
		if (Logout) {
			localStorage.removeItem('auth-user');
			router.push('/Login');
		}
	}, [Logout]);

	return (
		<>
			<header
				className={`header-admin ${darkMode ? 'darkMode' : 'lightMode'}`}
				style={{ width: collapsed ? '95%' : '100%' }}
			>
				<div className="navbar-menu" style={{ color: '#FFF' }}>
					{/* <div className="sidebar-taggle">
						<GoThreeBars
							size="40"
							color="#FFF"
							style={{ cursor: 'pointer' }}
							onClick={() => handleCollapsedChange(collapsed)}
						/>
					</div> */}
					<nav className="user-nav">
						<Menu>
							<MenuButton className="user-nav__info">
								<div className="d-flex flex-row-reverse align-items-center">
									<Avatar
										className="user-avata"
										size="lg"
										name="Segun Adebayo"
										src="/assets/image/avatar.png"
									></Avatar>
									<h4 className="h4 text-capitalize fw-bold">
										{userData?.username}
									</h4>
								</div>
							</MenuButton>

							<MenuList>
								<MenuItem style={{ color: '#000' }}>ملف الشخصي</MenuItem>
								<MenuItem
									style={{ color: '#000' }}
									onClick={() => setIsLogout(!Logout)}
								>
									الخروج
								</MenuItem>
							</MenuList>
						</Menu>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
