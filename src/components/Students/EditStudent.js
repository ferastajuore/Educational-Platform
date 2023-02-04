import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Select from 'react-select';

import { Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditUser = ({ getId }) => {
	const router = useRouter();
	const sectionCollectionRef = collection(db, 'sections');

	// useState
	const [sections, setSections] = useState([]);
	const [student, setStudent] = useState({});
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

		// Get student by id
		const getData = async () => {
			const docRef = doc(db, 'students', getId);
			const docSnap = await getDoc(docRef);

			setStudent(docSnap.data());
		};
		getData();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setStudent({ ...student, [name]: value });
	};

	const handleChangeSelected = (selectedOption) => {
		setStudent({ ...student, section: selectedOption });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updateSudent = doc(db, 'students', getId);
			await updateDoc(updateSudent, student);

			setMassage({ status: 'success', text: 'تم تعديل طالب بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(student) ? (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<label htmlFor="studentName" className="form-label">
						اسم الطالب
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="studentName"
							name="studentName"
							placeholder="ادخل اسم الطالب"
							value={student.studentName}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="username" className="form-label">
						اسم المستخدم
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							placeholder="ادخل اسم المستخدم"
							value={student.username}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="age" className="form-label">
						عمر
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="age"
							name="age"
							placeholder="ادخل عمر"
							value={student.age}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

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
							value={student.city}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label">
						السنة الدراسية
					</label>
					<div className="input-group">
						{sections.length > 0 ? (
							<Select
								id="sections"
								name="sections"
								defaultValue="اختيار سنة الدراسية"
								closeMenuOnSelect={false}
								options={sections}
								onChange={handleChangeSelected}
								value={student ? student.section : ''}
							/>
						) : (
							<input
								type="text"
								className="form-control"
								value="لايوجد سنة الدراسية"
								readOnly={true}
								disabled
							/>
						)}
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="password" className="form-label">
						كلمة المرور
					</label>
					<div className="input-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="ادخل كلمةالمرور"
							onChange={handleChange}
							value={student.password}
							required
						/>
					</div>
				</div>

				<div className="mt-4">
					<hr />
					<h4 className="my-2 p-0 btn btn-primary">معلومات ولي الامر</h4>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="parentName" className="form-label">
						اسم ولي الامر
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="parentName"
							name="parentName"
							placeholder="ادخل اسم ولي الامر"
							value={student.parentName}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

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
							value={student.phone}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<Button title="تعديل طالب" className="btn-info mt-2" />
			</form>
		</>
	) : (
		<Spinner />
	);
};

export default EditUser;
