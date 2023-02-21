import { useEffect, useState } from 'react';
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { CgMenuRound } from 'react-icons/cg';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { DataType, FilteringMode, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { db } from '@/middleware/firebase';
import { Button, Modal } from '@/components/UI';

const CustomCellStatus = ({ value }) => {
	const router = useRouter();
	const [students, setStudent] = useState({});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'students', value);
			const docSnap = await getDoc(docRef);

			setStudent(docSnap.data());
		};
		getData();
	}, [value]);

	// handler Acssecpt student element
	const handleStatus = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد قبول الطالب ؟')) {
				const userDoc = doc(db, 'students', id);
				await updateDoc(userDoc, { status: true });

				setTimeout(() => {
					router.reload();
				}, 1000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// handler Delete element
	const handleDelete = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد رفض الطالب ؟')) {
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
		<div className="d-flex justify-content-around">
			<Button title="قبول" className="btn-info" onClick={() => handleStatus(value)} />
			<Button title="رفض" className="btn-danger" onClick={() => handleDelete(value)} />
		</div>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'studentName',
			title: 'اسم طالب',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'username',
			title: 'اسم المستخدم',
			dataType: DataType.String,
			style: { width: 150 },
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
			style: { width: 120 },
		},
		{
			key: 'name',
			title: 'اسم ولي الامر',
			dataType: DataType.String,
			style: { width: 180 },
		},
		{
			key: 'phone',
			title: 'رقم الهاتف ولي الامر',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'id',
			title: 'حالة القبول',
			dataType: DataType.String,
			style: { width: 150, textAlign: 'center' },
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
					case 'id':
						return <CustomCellStatus {...props} />;
				}
			},
		},
	},
};
