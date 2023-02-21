import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import moment from 'moment/moment';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const ServicesTable = () => {
	const [services, setServices] = useState([]);
	const collectionRef = collection(db, 'services');

	useEffect(() => {
		const getAllContainers = async () => {
			const q = query(collectionRef, where('sender', '!=', 'admin'));
			// const q = query(collectionRef);
			const data = await getDocs(q);
			setServices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllContainers();
	}, []);

	const dataArray =
		services !== undefined &&
		services.map((data, index) => ({
			sender: data.sender,
			date: moment(data.date.toDate().toISOString()).format('YYYY-MM-DD'),
			status: data.status,
			id: data ? data.id : index,
		}));

	return services ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default ServicesTable;
