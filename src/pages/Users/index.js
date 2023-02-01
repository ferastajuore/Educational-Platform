import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { UserTable, CreateUser } from '@/components/Users';
import { Header, Modal } from '@/components/UI';

const Users = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="المستخدمين" />
					<UserTable />

					<Modal title="أضافة المستخدم" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
						<CreateUser />
					</Modal>

					<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
						أضافة المستخدم
					</button>
				</div>
			</AdminLayout>
		</>
	);
};

export default Users;
