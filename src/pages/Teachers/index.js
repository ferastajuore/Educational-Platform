import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { StudentsTable, CreateStudent } from '@/components/Students';
import { Header, Modal } from '@/components/UI';

const Teachers = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="الطلاب" />
					<StudentsTable />

					<Modal title="أضافة طالب" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
						<CreateStudent />
					</Modal>

					<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
						أضافة طالب
					</button>
				</div>
			</AdminLayout>
		</>
	);
};

export default Teachers;
