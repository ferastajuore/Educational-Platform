import React, { useEffect, useState } from 'react';
import {
	collection,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
	getDocs,
	getDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import Select from 'react-select';

import { Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const EditTeacher = ({ getId }) => {
	const router = useRouter();
	const sectionCollectionRef = collection(db, 'sections');
	const subjectCollectionRef = collection(db, 'subjects');

	// useState
	const [sections, setSections] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [teacher, setTeacher] = useState({});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get All Sections
		const getAllSections = async () => {
			const q = query(sectionCollectionRef, orderBy('createdAt'));
			const data = await getDocs(q);
			setSections(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
		};
		getAllSections();

		// Get All Subjects
		const getAllSubjects = async () => {
			const q = query(subjectCollectionRef);
			const data = await getDocs(q);
			setSubjects(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
		};
		getAllSubjects();

		// Get student by id
		const getData = async () => {
			const docRef = doc(db, 'teachers', getId);
			const docSnap = await getDoc(docRef);

			setTeacher(docSnap.data());
		};
		getData();
	}, [getId]);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setTeacher({ ...teacher, [name]: value });
	};

	const handleChangeSections = (selectedOption) => {
		setTeacher({ ...teacher, section: selectedOption });
	};

	const handleChangeSubject = (selectedOption) => {
		setTeacher({ ...teacher, subject: selectedOption.label });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updateSudent = doc(db, 'teachers', getId);
			await updateDoc(updateSudent, teacher);

			setMassage({ status: 'success', text: '???? ?????????? ???????????? ??????????' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(teacher) ? (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<label htmlFor="fullName" className="form-label">
						?????? ????????????
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="fullName"
							name="fullName"
							placeholder="???????? ?????? ????????????"
							value={teacher.fullName}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="phone" className="form-label">
						?????? ????????????
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="phone"
							name="phone"
							placeholder="???????? ?????? ????????????"
							value={teacher.phone}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="city" className="form-label">
						??????????????
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="city"
							name="city"
							placeholder="???????? ??????????????"
							value={teacher.city}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="email" className="form-label">
						???????? ????????????????????
					</label>
					<div className="input-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="???????? ???????? ????????????????????"
							value={teacher.email}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label">
						?????????? ????????????????
					</label>
					<div className="input-group">
						{sections.length > 0 ? (
							<Select
								id="sections"
								name="sections"
								defaultValue="???????????? ?????? ????????????????"
								closeMenuOnSelect={false}
								options={sections}
								value={teacher ? teacher.section : ''}
								onChange={handleChangeSections}
								isMulti
							/>
						) : (
							<input
								type="text"
								className="form-control"
								value="???????????? ?????? ????????????????"
								readOnly={true}
								disabled
							/>
						)}
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label">
						???????????? ????????????
					</label>
					<div className="input-group">
						{subjects.length > 0 ? (
							<Select
								id="subjects"
								name="subjects"
								defaultValue="???????????? ???????????? ????????????"
								options={subjects}
								onChange={handleChangeSubject}
								value={teacher ? { label: teacher.subject, value: 1 } : ''}
							/>
						) : (
							<input
								type="text"
								className="form-control"
								value="???????????? ????????????"
								readOnly={true}
								disabled
							/>
						)}
					</div>
				</div>

				<div className="mt-4">
					<hr />
					<h4 className="my-2 p-0 btn btn-primary">???????????? ?????????????? ????????????</h4>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="username" className="form-label">
						?????? ????????????????
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="???????? ?????? ????????????????"
							value={teacher.username}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="password" className="form-label">
						???????? ????????????
					</label>
					<div className="input-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="???????? ????????????????????"
							value={teacher.password}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<Button title="?????????? ????????????" className="btn-info mt-2" />
			</form>
		</>
	) : (
		<Spinner />
	);
};

export default EditTeacher;
