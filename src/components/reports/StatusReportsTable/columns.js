import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { CgMenuRound } from 'react-icons/cg';
import { TbEdit } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FiEye } from 'react-icons/fi';

import { db } from '@/middleware/firebase';
import { Button } from '@/components/UI';

// Custom cell for statis column
const CustomCellStatus = ({ value }) => {
	return (
		<div className="d-flex justify-content-around">
			<div
				className={`h5 btn ${
					(value === 0 && 'btn-success') ||
					(value === 1 && 'btn-warning') ||
					(value === 2 && 'btn-danger')
				}`}
			>
				{(value === 0 && 'تم قبول') ||
					(value === 1 && 'قيد الانتظار') ||
					(value === 2 && 'رفض')}
			</div>
			{value !== 0 && (
				<Link href={`/Reports/${value}`}>
					<Button
						title="تعين شركة"
						style={{ backgroundColor: '#03213d', color: '#FFF' }}
					/>
				</Link>
			)}
		</div>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'title',
			title: 'العنوان',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'phone',
			title: 'رقم الهاتف المرسل',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'dateAdded',
			title: 'تاريخ البلاغ',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'typeReport',
			title: 'نوع البلاغ',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'assignedCompany',
			title: 'شركة المرسلة',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'status',
			title: 'حالة البلاغ',
			dataType: DataType.Number,
			style: { width: 280 },
		},
		// {
		// 	key: 'id',
		// 	style: { width: 80, textAlign: 'center' },
		// },
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
					case 'status':
						return <CustomCellStatus {...props} />;
					// case 'id':
					// 	return <CustomCellControle {...props} />;
					// case 'password':
					// 	return <CustomCellPassword {...props} />;
				}
			},
		},
	},
};
