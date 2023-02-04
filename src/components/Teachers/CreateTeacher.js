import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from 'firebase/firestore';
import Select from 'react-select';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateTeacher = () => {
	const router = useRouter();
	const studentCollectionRef = collection(db, 'teachers');
	const sectionCollectionRef = collection(db, 'sections');
	const subjectCollectionRef = collection(db, 'subjects');

	// useState
	const [sections, setSections] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [addTeacher, setAddTeacher] = useState({});
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
			const q = query(subjectCollectionRef, orderBy('createdAt'));
			const data = await getDocs(q);
			setSubjects(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
		};
		getAllSubjects();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAddTeacher({ ...addTeacher, [name]: value });
	};

	const handleChangeSections = (selectedOption) => {
		setAddTeacher({ ...addTeacher, section: selectedOption });
	};

	const handleChangeSubject = (selectedOption) => {
		setAddTeacher({ ...addTeacher, subject: selectedOption.label });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addDoc(studentCollectionRef, { ...addTeacher, createdAt: serverTimestamp() });
			setMassage({ status: 'success', text: 'تم اضافة معلم بنجاح' });

			setTimeout(() => {
				router.reload();
				setAddStudent('');
				setMassage('');
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<label htmlFor="fullName" className="form-label">
						اسم المعلم
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="fullName"
							name="fullName"
							placeholder="ادخل اسم المعلم"
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
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="email" className="form-label">
						بريد الالكتروني
					</label>
					<div className="input-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="ادخل بريد الالكتروني"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label">
						الفصل الدراسي
					</label>
					<div className="input-group">
						{sections.length > 0 ? (
							<Select
								id="sections"
								name="sections"
								defaultValue="اختيار الفصل الدراسي"
								closeMenuOnSelect={false}
								options={sections}
								onChange={handleChangeSections}
								isMulti
							/>
						) : (
							<input
								type="text"
								className="form-control"
								value="لايوجد الفصل الدراسي"
								readOnly={true}
								disabled
							/>
						)}
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label">
						اختيار المواد
					</label>
					<div className="input-group">
						{subjects.length > 0 ? (
							<Select
								id="subjects"
								name="subjects"
								defaultValue="اختيار اختيار المواد"
								options={subjects}
								onChange={handleChangeSubject}
							/>
						) : (
							<input
								type="text"
								className="form-control"
								value="لايوجد المواد"
								readOnly={true}
								disabled
							/>
						)}
					</div>
				</div>

				<div className="mt-4">
					<hr />
					<h4 className="my-2 p-0 btn btn-primary">بيانات التسجيل الدخول</h4>
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
							onChange={handleChange}
							required
						/>
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
							required
						/>
					</div>
				</div>

				<Button title="اضافة طالب" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateTeacher;
