import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const ViewTeacher = () => {
	const { query } = useRouter();
	const [teacher, setTeacher] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (query.teacher !== undefined) {
			// Get company by id
			const getData = async () => {
				const docRef = doc(db, 'teachers', query.teacher);
				const docSnap = await getDoc(docRef);

				setTeacher(docSnap.data());
			};
			getData();
		}
	}, [query.teacher]);

	return !_.isEmpty(teacher) ? (
		<AdminLayout>
			<div className="card">
				<div className="card-body">
					<div className="d-flex justify-content-center mb-2">
						<Image
							src="/assets/image/company.png"
							alt={teacher.fullName}
							width={200}
							height={200}
						/>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="username" className="text-black form-label">
									اسم المستخدم
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={teacher.username}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="name" className="text-black form-label">
									كلمة المرور
								</label>
								<div className="input-group">
									<span
										className="input-group-text"
										id="basic-addon1"
										style={{ cursor: 'pointer' }}
										onClick={() => setShow(!show)}
									>
										عرض
									</span>
									<input
										type={show ? 'text' : 'password'}
										className="form-control"
										value={teacher.password}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="name" className="text-black form-label">
									اسم المعلم
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="name"
										name="name"
										value={teacher.fullName}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="email" className="text-black form-label">
									البريد الالكتروني
								</label>
								<div className="input-group">
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										placeholder="ادخل البريد الالكتروني"
										value={teacher.email}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="phone" className="text-black form-label">
									رقم الهاتف
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="phone"
										name="phone"
										placeholder="ادخل رقم الهاتف"
										value={teacher.phone}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="city" className="text-black form-label">
									المدينة
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="city"
										name="city"
										placeholder="ادخل المدينة"
										value={teacher.city}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="subject" className="text-black form-label">
									اسم المادة
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="subject"
										name="subject"
										placeholder="ادخل المدينة"
										value={teacher.subject}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-12">
							<div className="form-group mb-2">
								<label htmlFor="section" className="text-black form-label">
									الفصول الدراسية
								</label>

								<ul className="list-group">
									{teacher.section.map((data) => (
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

export default ViewTeacher;
