import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const ViewAds = () => {
	const { query } = useRouter();
	const [ads, setCompany] = useState({});

	useEffect(() => {
		if (query.ads !== undefined) {
			// Get company by id
			const getData = async () => {
				const docRef = doc(db, 'ads', query.ads);
				const docSnap = await getDoc(docRef);

				setCompany(docSnap.data());
			};
			getData();
		}
	}, [query.ads]);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCompany({ ...ads, [name]: value });
	};

	return !_.isEmpty(ads) ? (
		<AdminLayout>
			<div className="card">
				<div className="card-body">
					<div className="d-flex justify-content-center mb-2">
						<Image
							src={ads ? ads.image : '/assets/image/Housing.png'}
							alt={ads.title}
							width={300}
							height={300}
						/>
					</div>
					<div className="row">
						<div className="form-group mb-2">
							<label htmlFor="title" className="form-label float-end">
								العنوان
							</label>
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									id="title"
									name="title"
									placeholder="ادخل العنوان"
									value={ads.title}
									onChange={handleChange}
									required
									disabled
								/>
							</div>
						</div>

						<div className="form-group mb-2">
							<label htmlFor="description" className="form-label float-end">
								الوصف
							</label>
							<div className="input-group">
								<textarea
									className="form-control"
									id="description"
									name="description"
									placeholder="ادخل العنوان"
									onChange={handleChange}
									value={ads.description}
									required
									cols="30"
									rows="10"
									disabled
								></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	) : (
		<Spinner />
	);
};

export default ViewAds;
