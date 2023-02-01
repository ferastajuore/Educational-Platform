import { useEffect, useState } from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from '@chakra-ui/react';

const modal = ({ children, title, isOpen, onClose, footerModal, btnRef }) => {
	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{title}</DrawerHeader>

				<DrawerBody>{children}</DrawerBody>

				<DrawerFooter>{footerModal}</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default modal;
