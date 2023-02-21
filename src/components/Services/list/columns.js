import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { db } from '@/middleware/firebase';
import { Button } from '@/components/UI';

// Custom cell for statis column
const CustomCellStatus = ({ value }) => {
	return (
		<div
			className={`h5 ${
				(value === 0 && 'text-success') ||
				(value === 1 && 'text-warning') ||
				(value === 2 && 'text-danger')
			}`}
		>
			{(value === 0 && 'نشيطه') ||
				(value === 1 && 'قيد الانتظار') ||
				(value === 2 && 'منتهية')}
		</div>
	);
};

// Custom cell for controle column
const CustomCellControle = ({ value }) => {
	const router = useRouter();

	// handler Delete element
	const handleDelete = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف رسالة ؟')) {
				const document = doc(db, 'Services', id);
				await deleteDoc(document);

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
			<div className="d-flex justify-content-between">
				<Link href={`/Services/${value}`}>
					<Button title="الرد" style={{ backgroundColor: '#03213d', color: '#FFF' }} />
				</Link>
				<Button title="الحدف" className="btn-danger" onClick={() => handleDelete(value)} />
			</div>
		</>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'sender',
			title: 'المرسل',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'date',
			title: 'التاريخ',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'status',
			title: 'الحالة',
			dataType: DataType.Number,
			style: { width: 100 },
		},
		{
			key: 'id',
			style: { width: 90, textAlign: 'center' },
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
					case 'id':
						return <CustomCellControle {...props} />;
					case 'status':
						return <CustomCellStatus {...props} />;
				}
			},
		},
	},
};
