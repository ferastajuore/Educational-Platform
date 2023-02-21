import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from 'firebase/firestore';
import Select from 'react-select';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateStudent = () => {
	const router = useRouter();
	const studentCollectionRef = collection(db, 'students');
	const sectionCollectionRef = collection(db, 'sections');

	// useState
	const [sections, setSections] = useState([]);
	const [addStudent, setAddStudent] = useState({});
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
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAddStudent({ ...addStudent, [name]: value });
	};

	const handleChangeSelected = (selectedOption) => {
		setAddStudent({ ...addStudent, section: selectedOption });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(studentCollectionRef, {
				...addStudent,
				createdAt: serverTimestamp(),
				status: true,
			});
			setMassage({ status: 'success', text: 'تم اضافة طالب بنجاح' });

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

				<Button title="اضافة طالب" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateStudent;
