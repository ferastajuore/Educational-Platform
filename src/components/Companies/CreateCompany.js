import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateCompany = () => {
	const animatedComponents = makeAnimated();
	const collectionRef = collection(db, 'companies');
	const sectionCollectionRef = collection(db, 'sections');
	const router = useRouter();

	// useState
	const [company, setCompany] = useState({
		name: '',
		email: '',
		phone: '',
		city: '',
		phone: '',
		description: null,
		numberOfOrederFiexd: 0,
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	const [sections, setSections] = useState([]);

	useEffect(() => {
		// Get All Sections
		const getAllSections = async () => {
			const data = await getDocs(sectionCollectionRef);
			setSections(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
		};
		getAllSections();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCompany({ ...company, [name]: value });
	};

	const handleChangeSelected = (selectedOption) => {
		setCompany({ ...company, description: selectedOption });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(company);
			await addDoc(collectionRef, company);
			setMassage({ status: 'success', text: 'تم اضافة شركة بنجاح' });

			setTimeout(() => {
				router.reload();
				setCompany('');
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
					<label htmlFor="name" className="form-label float-end">
						اضافة اسم الشركة
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							placeholder="ادخل اسم"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label float-end">
						اقسام الشركة
					</label>
					<div className="input-group">
						{sections.length > 0 ? (
							<Select
								id="description"
								name="description"
								defaultValue="اختيار القسم"
								closeMenuOnSelect={false}
								components={animatedComponents}
								options={sections}
								onChange={handleChangeSelected}
								isMulti
							/>
						) : (
							<input
								type="text"
								className="form-control"
								value="لايوجد اقسام"
								readOnly={true}
								disabled
							/>
						)}
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="email" className="form-label float-end">
						البريد الالكتروني
					</label>
					<div className="input-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="ادخل البريد الالكتروني"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="phone" className="form-label float-end">
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
					<label htmlFor="city" className="form-label float-end">
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
					<label htmlFor="password" className="form-label float-end">
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

				<Button title="اضافة شركة" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateCompany;
