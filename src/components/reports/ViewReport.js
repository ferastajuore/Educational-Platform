import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal2, Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const ViewReport = ({ activeModel, closeModel, getId }) => {
	const [report, setReport] = useState({});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'reporting-service', getId);
			const docSnap = await getDoc(docRef);

			setReport(docSnap.data());
		};
		getData();
	}, []);

	return !_.isEmpty(report) ? (
		<Modal2 title="عرض البلاغ" isActive={activeModel} isClosed={closeModel}>
			<div className="d-flex justify-content-center mb-2">
				<Image
					src="/assets/image/company.png"
					alt={report.title}
					width={200}
					height={200}
				/>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label className="form-label float-start">عنوان البلاغ</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								value={report.title}
								read-only="true"
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label className="form-label float-start">رقم الهاتف المرسل</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								value={report.senderPhone}
								read-only="true"
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label className="form-label float-start">نوع بلاغ</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								value={report.typeReport}
								read-only="true"
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label className="form-label float-start">الاحداتيات</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								value={report.location}
								read-only="true"
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-12">
					<div className="form-group mb-2">
						<label className="form-label float-start">تفاصيل</label>
						<div className="input-group">
							<textarea
								cols="30"
								rows="10"
								className="form-control"
								value={report.description}
								read-only="true"
								disabled
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</Modal2>
	) : (
		<Spinner />
	);
};

export default ViewReport;
