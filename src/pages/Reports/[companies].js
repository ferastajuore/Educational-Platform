import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const ViewCompany = () => {
	const { query } = useRouter();
	const [companies, setCompanies] = useState([]);
	const [report, setReport] = useState({});
	const [sender, setSender] = useState(null);
	const NotCollectionRef = collection(db, 'notifications');
	const companiesCollectionRef = collection(db, 'companies');

	useEffect(() => {
		const getAllCompanies = async () => {
			const data = await getDocs(companiesCollectionRef);
			setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllCompanies();

		if (query.companies !== undefined) {
			// Get company by id
			const getData = async () => {
				const docRef = doc(db, 'reporting-service', query.companies);
				const docSnap = await getDoc(docRef);

				setReport(docSnap.data());
			};
			getData();
		}
	}, []);

	// Handler Sender
	const handleSender = async (queryId, companyId, companyName) => {
		try {
			const updateReport = doc(db, 'reporting-service', queryId);
			await updateDoc(updateReport, {
				assignedCompany: companyName,
				companyId,
			});

			// Add Notifications
			await addDoc(NotCollectionRef, {
				title: report.title,
				reportId: queryId,
				date: serverTimestamp(),
			});

			setSender(companyId);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(query.companies) ? (
		<AdminLayout>
			{companies.length > 0 ? (
				<div className="d-flex flex-nowrap align-items-center">
					{companies.map((data) => (
						<div key={data.id} className="card mx-3" style={{ minWidth: '10rem' }}>
							<div className="card-body d-flex flex-column align-items-center">
								<Image
									src="/assets/image/company.png"
									alt={data.name}
									width={70}
									height={70}
									className="mb-2"
								/>
								<div className="info mb-3">
									<h4 className="h5 text-center text-dark">{data.name}</h4>
									<div className="d-flex">
										{data.description.map((data) => (
											<p key={data.value} className="text-secondary">
												{data.label}
											</p>
										))}
									</div>
								</div>
								<Button
									title={sender !== data.id ? 'ارسال' : 'تم ارسال'}
									style={{
										backgroundColor: sender !== data.id ? '#03213d' : '#ffa500',
										color: '#FFF',
									}}
									onClick={() =>
										handleSender(query.companies, data.id, data.name)
									}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="alert alert-danger text-center">لايوجد شركات</div>
			)}
		</AdminLayout>
	) : (
		<Spinner />
	);
};

export default ViewCompany;
