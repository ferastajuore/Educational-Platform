import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { BsNewspaper } from 'react-icons/bs';
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
										<AiOutlineDashboard />
										<span>لوحة التحكم</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Users' ? 'active' : ''}>
								<Link href="/Users">
									<div>
										<FiUsers />
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
						</>
					</ul>
				</div>
			</aside>
		)
	);
};

export default Sidebar;
