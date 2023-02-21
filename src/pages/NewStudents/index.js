import { AdminLayout } from '@/components/layout';
import { StudentsTable } from '@/components/NewStudents';
import { Header, Modal } from '@/components/UI';

const Students = () => {
	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="الطلاب الجدد" />
					<StudentsTable />
				</div>
			</AdminLayout>
		</>
	);
};

export default Students;
