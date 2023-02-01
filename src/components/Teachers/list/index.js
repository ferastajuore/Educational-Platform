import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const UsersTable = () => {
	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, 'users');

	useEffect(() => {
		const getAllUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllUsers();
	}, []);

	const dataArray =
		users !== undefined &&
		users.map((user, index) => ({
			name: user.username,
			phone: user.phone,
			id: user ? user.id : index,
		}));

	return users ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default UsersTable;
