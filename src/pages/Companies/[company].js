import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const ViewCompany = ({ activeModel, closeModel }) => {
	const { query } = useRouter();
	const [company, setCompany] = useState({});

	useEffect(() => {
		if (query.company !== undefined) {
			// Get company by id
			const getData = async () => {
				const docRef = doc(db, 'companies', query.company);
				const docSnap = await getDoc(docRef);

				setCompany(docSnap.data());
			};
			getData();
		}
	}, [query.company]);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCompany({ ...company, [name]: value });
	};

	return !_.isEmpty(company) ? (
		<AdminLayout>
			<div className="card">
				<div className="card-body">
					<div className="d-flex justify-content-center mb-2">
						<Image
							src="/assets/image/company.png"
							alt={company.name}
							width={200}
							height={200}
						/>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="name" className="form-label">
									اسم الشركة
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="name"
										name="name"
										placeholder="ادخل اسم"
										value={company.name}
										onChange={handleChange}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="email" className="form-label">
									البريد الالكتروني
								</label>
								<div className="input-group">
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										placeholder="ادخل البريد الالكتروني"
										value={company.email}
										onChange={handleChange}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="phone" className="form-label">
									رقم الهاتف
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="phone"
										name="phone"
										placeholder="ادخل رقم الهاتف"
										value={company.phone}
										onChange={handleChange}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="city" className="form-label">
									المدينة
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="city"
										name="city"
										placeholder="ادخل المدينة"
										value={company.city}
										onChange={handleChange}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="description" className="form-label">
									اقسام الشركة
								</label>

								<ul className="list-group">
									{company.description.map((data) => (
										<li key={data.value} className="list-group-item">
											{data.label}
										</li>
									))}
								</ul>
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

export default ViewCompany;
