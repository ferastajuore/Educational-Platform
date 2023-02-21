import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiDashboardFill } from 'react-icons/ri';
import { FaUserCircle, FaUserCog } from 'react-icons/fa';
import { BsFillChatTextFill, BsNewspaper } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const Sidebar = ({ collapsed, userData }) => {
	const router = useRouter();
	const [isSSR, setIsSSR] = useState(true);

	// const { t } = useTranslation();
	useEffect(() => {
		setIsSSR(false);
	}, []);

	return (
		!isSSR && (
			<aside className={`sidebar ${collapsed ? 'isClosed' : ''}`}>
				<div className="sidebar-menu">
					<ul className="sidebar-list">
						<>
							<li className={router.pathname == '/' ? 'active' : ''}>
								<Link href="/">
									<div>
										<RiDashboardFill />
										<span>لوحة التحكم</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Users' ? 'active' : ''}>
								<Link href="/Users">
									<div>
										<FaUserCircle />
										<span>المستخدمون</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Students' ? 'active' : ''}>
								<Link href="/Students">
									<div>
										<FaUserGraduate />
										<span>الطلاب</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/NewStudents' ? 'active' : ''}>
								<Link href="/NewStudents">
									<div>
										<FaUserCog />
										<span>الطلاب الجدد</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Teachers' ? 'active' : ''}>
								<Link href="/Teachers">
									<div>
										<FaChalkboardTeacher />
										<span>المعلمين</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Notices' ? 'active' : ''}>
								<Link href="/Notices">
									<div>
										<BsNewspaper />
										<span>اشعارات</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Services' ? 'active' : ''}>
								<Link href="/Services">
									<div>
										<BsFillChatTextFill />
										<span>مراسلة</span>
									</div>
								</Link>
							</li>
						</>
					</ul>
				</div>
			</aside>
		)
	);
};

export default Sidebar;
