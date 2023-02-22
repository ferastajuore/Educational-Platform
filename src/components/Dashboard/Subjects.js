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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { db } from '@/middleware/firebase';
import { Header } from '@/components/UI';

const Subjects = () => {
	const animatedComponents = makeAnimated();
	const sectionCollectionRef = collection(db, 'sections');
	const collectionRef = collection(db, 'subjects');

	// useState
	const [subjects, setSubjects] = useState([]);
	const [sections, setSections] = useState([]);
	const [addSubject, setAddSubject] = useState({
		name: '',
		sections: [],
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get All Sections
		const getAllSections = async () => {
			const data = await getDocs(sectionCollectionRef);
			setSections(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
		};
		getAllSections();

		// Get All Subjects
		const getAllSubjects = async () => {
			const q = query(collectionRef, orderBy('createdAt'));
			const data = await getDocs(q);
			setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllSubjects();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAddSubject({ ...addSubject, [name]: value });
	};

	const handleChangeSelected = (selectedOption) => {
		setAddSubject({ ...addSubject, sections: selectedOption });
	};

	// functoins add new Material
	const AddNewSection = async (e) => {
		e.preventDefault();

		if (_.isEmpty(addSubject.name)) {
			return setMassage({ status: 'error', text: 'يجب عليك ادخال فصل !!' });
		}

		try {
			await addDoc(collectionRef, {
				name: addSubject.name.trim(),
				createdAt: serverTimestamp(),
				sections: addSubject.sections,
			});
			setMassage({ status: 'success', text: 'تم اضافة فصل بنجاح' });
			setSubjects([...subjects, { name: addSubject.name }]);

			setTimeout(() => {
				setAddSubject({ name: '', subjects: [] });
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
			<div className="card box-shadow-dark">
				<div className="card-body">
					<div className="subjects-list mb-3">
						<div className="card-title text-black mb-3">
							<form onSubmit={AddNewSection}>
								<div className="row">
									<div className="col-sm-5">
										<label htmlFor="description">فصل الدراسي</label>
										<div className="input-group">
											{sections.length > 0 ? (
												<Select
													id="description"
													name="description"
													defaultValue="اختيار فصل الدراسي"
													closeMenuOnSelect={true}
													components={animatedComponents}
													options={sections}
													onChange={handleChangeSelected}
													value={addSubject.sections}
													isMulti
												/>
											) : (
												<input
													type="text"
													className="form-control"
													value="لايوجد فصل دراسي"
													readOnly={true}
													disabled
												/>
											)}
										</div>
									</div>

									<div className="col-sm-5">
										<label htmlFor="name"> اضافة المادة</label>
										<input
											type="text"
											className="form-control"
											placeholder="اضافة المادة"
											id="name"
											name="name"
											value={addSubject.name}
											onChange={handleChange}
										/>
										{massage.status === 'error' && (
											<span className="text-danger">{massage.text}</span>
										)}
									</div>

									<div className="col-sm-2 text-center py-4">
										<button className="btn btn-primary">اضافة </button>
									</div>
								</div>
							</form>
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
