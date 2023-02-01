import { AdminLayout } from '@/components/layout';
import { Statistics, Sections, Subjects } from '@/components/Dashboard';
import Header from '@/components/UI/Header.js';

export default function Home() {
	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="لوحة التحكم" />
					<Statistics />
					<Sections />
					<Subjects />
				</div>
			</AdminLayout>
		</>
	);
}
