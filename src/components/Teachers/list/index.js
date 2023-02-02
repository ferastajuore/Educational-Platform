import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const TeachersTable = () => {
	const [teachers, setTeachers] = useState([]);
	const collectionRef = collection(db, 'teachers');

	useEffect(() => {
		const getAllStudents = async () => {
			const data = await getDocs(collectionRef);
			setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllStudents();
	}, []);

	const dataArray =
		teachers !== undefined &&
		teachers.map((data, index) => ({
			name: data.fullName,
			city: data.city,
			createdAt: moment(data.createdAt.toDate().toISOString()).format('YYYY-MM-DD'),
			email: data.email,
			username: data.username,
			phone: data.phone,
			id: data ? data.id : index,
		}));

	return teachers ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default TeachersTable;
