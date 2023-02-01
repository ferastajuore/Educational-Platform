import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { ContainersTable, CreateContainer } from '@/components/Containers';
import { Header, Modal } from '@/components/UI';

const Containers = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<AdminLayout>
			<Header title="الحاويات" />
			<ContainersTable />

			<Modal title="أضافة حاوية" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
				<CreateContainer />
			</Modal>

			<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
				أضافة حاوية
			</button>
		</AdminLayout>
	);
};

export default Containers;
