import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const ContainersTable = () => {
	const [containers, setContainers] = useState([]);
	const collectionRef = collection(db, 'containers');

	useEffect(() => {
		const getAllContainers = async () => {
			const data = await getDocs(collectionRef);
			setContainers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllContainers();
	}, []);

	const dataArray =
		containers !== undefined &&
		containers.map((data, index) => ({
			city: data.city,
			address: data.address,
			image: data.image,
			id: data ? data.id : index,
		}));

	return containers ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default ContainersTable;
