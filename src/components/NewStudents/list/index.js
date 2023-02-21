import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const StudentsTable = () => {
	const [students, setStudents] = useState([]);
	const collectionRef = collection(db, 'students');

	useEffect(() => {
		const getAllStudents = async () => {
			const q = query(collectionRef, where('status', '==', false));
			const data = await getDocs(q);
			setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllStudents();
	}, []);

	const dataArray =
		students !== undefined &&
		students.map((data, index) => ({
			username: data.username,
			studentName: data.studentName,
			city: data.city,
			createdAt: moment(data.createdAt.toDate().toISOString()).format('YYYY-MM-DD'),
			age: data.age,
			name: data.parentName,
			phone: data.phone,
			id: data ? data.id : index,
		}));

	return students ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default StudentsTable;
