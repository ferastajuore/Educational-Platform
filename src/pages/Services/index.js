import { useState, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { AdminLayout } from '@/components/layout';
import { ServicesTable } from '@/components/Services';
import { Header, Modal } from '@/components/UI';

const Services = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="خدمة العملاء" />
					<ServicesTable />
				</div>
			</AdminLayout>
		</>
	);
};

export default Services;
