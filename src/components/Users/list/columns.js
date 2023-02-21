import { useState } from 'react';
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { CgMenuRound } from 'react-icons/cg';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { DataType, FilteringMode, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { db } from '@/middleware/firebase';
import { Modal } from '@/components/UI';

import EditUser from '../EditUser';

// Custom cell for controle column
const CustomCellControle = ({ value }) => {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// useState
	const [getId, setGetId] = useState('');

	// handle modal or update
	const handleModal = (isAcitve, id) => {
		setGetId(id);
		onOpen(isAcitve);
	};

	// handler Delete element
	const handleDelete = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف المستخدم ؟')) {
				const userDoc = doc(db, 'users', id);
				await deleteDoc(userDoc);

				setTimeout(() => {
					router.reload();
				}, 1000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Menu>
				<MenuButton>
					<CgMenuRound fontSize="1.8em" />
				</MenuButton>
				<MenuList>
					<MenuItem
						icon={<TbEdit fontSize="1.8em" color="#333" />}
						onClick={() => handleModal(onOpen, value)}
					>
						تعديل المستخدم
					</MenuItem>
					<MenuItem
						icon={<MdDelete fontSize="1.8em" color="#333" />}
						onClick={() => handleDelete(value)}
					>
						حدف المستخدم
					</MenuItem>
				</MenuList>
			</Menu>

			{getId && (
				<Modal title="تعديل المستخدم" isOpen={isOpen} onClose={onClose}>
					<EditUser getId={getId} />
				</Modal>
			)}
		</>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'name',
			title: 'اسم المستخدم',
			dataType: DataType.String,
			style: { width: 200 },
		},
		// {
		// 	key: 'city',
		// 	// title: 'المدينة',
		// 	dataType: DataType.String,
		// 	style: { width: 150 },
		// },
		// {
		// 	key: 'numOfOrders',
		// 	// title: 'عدد بلاغات',
		// 	dataType: DataType.Number,
		// 	style: { width: 150 },
		// },
		{
			key: 'phone',
			title: 'رقم الهاتف',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'id',
			style: { width: 200, textAlign: 'center' },
		},
	],
	paging: {
		enabled: true,
		pageIndex: 0,
		pageSize: 5,
		pageSizes: [5, 10, 15],
		position: PagingPosition.Bottom,
	},
	sortingMode: SortingMode.Single,
	// editingMode: EditingMode.Cell,
	loading: true,
	rowKeyField: 'id',
	childComponents: {
		cellText: {
			content: (props) => {
				switch (props.column.key) {
					// case 'role':
					// 	return <CustomCellRole {...props} />;
					case 'id':
						return <CustomCellControle {...props} />;
					// case 'password':
					// 	return <CustomCellPassword {...props} />;
				}
			},
		},
	},
};
