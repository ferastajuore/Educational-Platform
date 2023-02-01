import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { CompaniesTable, CreateCompany } from '@/components/Companies';
import { Header, Modal } from '@/components/UI';

const Companies = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<AdminLayout>
			<Header title="شركات" />
			<CompaniesTable />

			<Modal title="أضافة شركة" isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
				<CreateCompany />
			</Modal>

			<button className="btn btn-info" ref={btnRef} onClick={onOpen}>
				أضافة شركة
			</button>
		</AdminLayout>
	);
};

export default Companies;
