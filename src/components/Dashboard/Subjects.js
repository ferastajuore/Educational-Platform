import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
} from 'firebase/firestore';
import { BsTrash } from 'react-icons/bs';

import { db } from '@/middleware/firebase';
import { Header } from '@/components/UI';

const Subjects = () => {
	const [addSubject, setAddSubject] = useState('');
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});
	const [subjects, setSubjects] = useState([]);
	const collectionRef = collection(db, 'subjects');

	useEffect(() => {
		// Get All Subjects
		const getAllSubjects = async () => {
			const q = query(collectionRef, orderBy('createdAt'));
			const data = await getDocs(q);
			setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllSubjects();
	}, []);

	// functoins add new Material
	const AddNewSection = async () => {
		if (_.isEmpty(addSubject)) {
			return setMassage({ status: 'error', text: 'يجب عليك ادخال فصل !!' });
		}

		try {
			await addDoc(collectionRef, {
				name: addSubject.trim(),
				createdAt: serverTimestamp(),
			});
			setMassage({ status: 'success', text: 'تم اضافة فصل بنجاح' });
			setSubjects([...subjects, { name: addSubject }]);
			setTimeout(() => {
				setAddSubject('');
				setMassage('');
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	// fucntion delete section
	const deleteSection = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف المادة ؟')) {
				const sectionDoc = doc(db, 'subjects', id);
				await deleteDoc(sectionDoc);
				setMassage({ status: 'success', text: 'تم حدف المادة بنجاح' });

				setSubjects(subjects.filter((data) => data.id !== id));

				setTimeout(() => {
					setAddSubject('');
					setMassage('');
				}, 2000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="managment-subjects">
			<Header title="ادارة المواد الدراسية" className="text-start" textSize="h4" />
			<div className="card">
				<div className="card-body">
					<div className="subjects-list mb-3">
						<div className="card-title text-black mb-3">
							<div className="row">
								<div className="col-sm-10">
									<label htmlFor="section"> اضافة المادة</label>
									<input
										type="text"
										className="form-control"
										placeholder="اضافة المادة"
										value={addSubject}
										onChange={(e) => setAddSubject(e.target.value)}
									/>
									{massage.status === 'error' && (
										<span className="text-danger">{massage.text}</span>
									)}
								</div>
								<div className="col-sm-2 text-center py-4">
									<button className="btn btn-primary" onClick={AddNewSection}>
										اضافة{' '}
									</button>
								</div>
							</div>
						</div>

						{massage.status === 'success' && (
							<div className="alert alert-success text-center">{massage.text}</div>
						)}

						<div className="card">
							<ul className="list-group list-group-flush">
								{subjects.length > 0 ? (
									subjects.map((data, i) => (
										<li
											key={data ? data.id : i}
											className="list-group-item d-flex justify-content-between align-items-start"
										>
											<>
												<div>
													<div className="fw-bold">{data.name}</div>
												</div>

												<div className="d-flex flex-row-reverse">
													<BsTrash
														fontSize="1.2rem"
														color="#d42a3b"
														onClick={() => deleteSection(data.id)}
													/>
												</div>
											</>
										</li>
									))
								) : (
									<div className="alert alert-danger text-center">
										{' '}
										لايوجد بيانات
									</div>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Subjects;
