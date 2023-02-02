import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { TeachersTable, CreateTeacher } from '@/components/Teachers';
import { Header, Modal } from '@/components/UI';

const Teachers = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="المعلمين" />
					<TeachersTable />

					<Modal title="أضافة معلم" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
						<CreateTeacher />
					</Modal>

					<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
						أضافة معلمين
					</button>
				</div>
			</AdminLayout>
		</>
	);
};

export default Teachers;
