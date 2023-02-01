import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const ViewContainer = () => {
	const { query } = useRouter();
	const [container, setContainer] = useState({});

	useEffect(() => {
		if (query.container !== undefined) {
			// Get company by id
			const getData = async () => {
				const docRef = doc(db, 'containers', query.container);
				const docSnap = await getDoc(docRef);

				setContainer(docSnap.data());
			};
			getData();
		}
	}, [query.container]);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setContainer({ ...container, [name]: value });
	};

	return !_.isEmpty(container) ? (
		<AdminLayout>
			<div className="card">
				<div className="card-body">
					<div className="d-flex justify-content-center mb-2">
						<Image
							src={container.image}
							alt={container.city}
							width={150}
							height={150}
						/>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="city" className="form-label float-end">
									المدينة
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="city"
										name="city"
										placeholder="ادخل المدينة"
										value={container.city}
										onChange={handleChange}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="address" className="form-label float-end">
									العنوان
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="address"
										name="address"
										placeholder="ادخل العنوان"
										onChange={handleChange}
										value={container.address}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="location" className="form-label float-end">
									الاحداثيات
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="location"
										name="location"
										placeholder="ادخل الاحداثيات"
										value={container.location}
										onChange={handleChange}
										required
										disabled
									/>
								</div>
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

export default ViewContainer;
