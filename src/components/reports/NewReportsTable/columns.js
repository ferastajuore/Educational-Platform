import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { db } from '@/middleware/firebase';
import { Button } from '@/components/UI';

import ViewReport from '../ViewReport';

// Custom cell for controle column
const CustomCellControle = ({ value }) => {
	const router = useRouter();

	// useState
	const [isActiveModel, setIsActiveModel] = useState(false);
	const [getId, setGetId] = useState('');

	// handle modal or update
	const handleModalUpdate = (isAcitve, id) => {
		console.log(id);
		setGetId(id);
		setIsActiveModel(!isAcitve);
	};

	// handler Delete element
	const handleDelete = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف بلاغ ؟')) {
				const document = doc(db, 'reporting-service', id);
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
				<Link href={`/Reports/${value}`}>
					<Button
						title="تعين شركة"
						style={{ backgroundColor: '#03213d', color: '#FFF' }}
					/>
				</Link>
				<Button
					title="تفاصيل"
					onClick={() => handleModalUpdate(isActiveModel, value)}
					style={{ backgroundColor: '#ffa500', color: '#FFF' }}
				/>
				<Button title="حدف" onClick={() => handleDelete(value)} className="btn-danger" />
			</div>
			{getId && (
				<>
					<ViewReport
						activeModel={isActiveModel}
						closeModel={handleModalUpdate}
						getId={getId}
					/>
				</>
			)}
		</>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'title',
			title: 'العنوان',
			dataType: DataType.String,
			style: { width: 180 },
		},
		{
			key: 'phone',
			title: 'رقم الهاتف المرسل',
			dataType: DataType.String,
			style: { width: 130 },
		},
		{
			key: 'dateAdded',
			title: 'تاريخ البلاغ',
			dataType: DataType.String,
			style: { width: 130 },
		},
		{
			key: 'typeReport',
			title: 'نوع البلاغ',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'location',
			title: 'الموقع',
			dataType: DataType.String,
			style: { width: 150 },
		},
		{
			key: 'id',
			title: 'تحكم',
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
	loading: true,
	rowKeyField: 'id',
	childComponents: {
		cellText: {
			content: (props) => {
				switch (props.column.key) {
					case 'id':
						return <CustomCellControle {...props} />;
				}
			},
		},
	},
};
