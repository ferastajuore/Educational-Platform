import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment/moment';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const AdsTable = () => {
	const [ads, setAds] = useState([]);
	const collectionRef = collection(db, 'ads');

	useEffect(() => {
		const getAllContainers = async () => {
			const data = await getDocs(collectionRef);
			setAds(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllContainers();
	}, []);

	const dataArray =
		ads !== undefined &&
		ads.map((data, index) => ({
			title: data.title,
			description: data.description,
			date: moment(data.date.toDate().toISOString()).format('a h:mm:ss - YYYY-MM-DD'),
			image: data.image,
			id: data ? data.id : index,
		}));

	return ads ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default AdsTable;
