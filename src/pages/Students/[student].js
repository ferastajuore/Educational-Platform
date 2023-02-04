import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const ViewStudent = () => {
	const { query } = useRouter();
	const [student, setStudent] = useState({});
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (query.student !== undefined) {
			// Get company by id
			const getData = async () => {
				const docRef = doc(db, 'students', query.student);
				const docSnap = await getDoc(docRef);

				setStudent(docSnap.data());
			};
			getData();
		}
	}, [query.student]);

	return !_.isEmpty(student) ? (
		<AdminLayout>
			<div className="card">
				<div className="card-body">
					<div className="d-flex justify-content-center mb-2">
						<Image
							src="/assets/image/company.png"
							alt={student.studentName}
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
										value={student.username}
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
										value={student.password}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="name" className="text-black form-label">
									اسم ولي الامر
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="name"
										name="name"
										value={student.parentName}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="name" className="text-black form-label">
									اسم الطالب
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={student.studentName}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="age" className="text-black form-label">
									العمر
								</label>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={student.age}
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
										placeholder="ادخل رقم الهاتف"
										value={student.phone}
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
										placeholder="ادخل المدينة"
										value={student.city}
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
										placeholder="ادخل المدينة"
										value={student.subject}
										required
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="form-group mb-2">
								<label htmlFor="section" className="text-black form-label">
									الفصل الدراسي
								</label>

								<ul className="list-group">
									{student.section.map((data) => (
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

export default ViewStudent;
