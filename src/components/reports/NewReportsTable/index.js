import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import moment from 'moment';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const NewReportsTable = () => {
	const [reports, setCompanies] = useState([]);
	const collectionRef = collection(db, 'reporting-service');

	useEffect(() => {
		const getAllCompanies = async () => {
			const q = query(collectionRef, where('assignedCompany', '==', null));
			const data = await getDocs(q);
			setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllCompanies();
	}, []);

	const dataArray =
		reports !== undefined &&
		reports.map((data, index) => ({
			title: data.title,
			phone: data.senderPhone,
			dateAdded: moment(data.dateAdded.toDate().toISOString()).format('YYYY-MM-DD'),
			typeReport: data.typeReport,
			location: data.location,
			status: data.companyStatus,
			id: data ? data.id : index,
		}));

	return reports ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default NewReportsTable;
