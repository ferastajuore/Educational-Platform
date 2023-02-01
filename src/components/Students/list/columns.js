import { useState } from 'react';
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { CgMenuRound } from 'react-icons/cg';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { db } from '@/middleware/firebase';
import { Modal } from '@/components/UI';

import EditStudent from '../EditStudent';

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
			if (confirm('هل انت متاكد تريد حدف الطالب ؟')) {
				const userDoc = doc(db, 'students', id);
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
						تعديل الطالب
					</MenuItem>
					<MenuItem
						icon={<MdDelete fontSize="1.8em" color="#333" />}
						onClick={() => handleDelete(value)}
					>
						حدف الطالب
					</MenuItem>
				</MenuList>
			</Menu>

			{getId && (
				<Modal title="تعديل الطالب" isOpen={isOpen} onClose={onClose}>
					<EditStudent getId={getId} />
				</Modal>
			)}
		</>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'username',
			title: 'اسم المستخدم',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'city',
			title: 'المدينة',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'createdAt',
			title: 'تاريخ الاضافة',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'age',
			title: 'العمر',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'name',
			title: 'اسم ولي الامر',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'phone',
			title: 'رقم الهاتف ولي الامر',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'id',
			style: { width: 200, textAlign: 'center' },
		},
	],
	// data: dataTable,
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
