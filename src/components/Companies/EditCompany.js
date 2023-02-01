import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditCompany = ({ getId }) => {
	const router = useRouter();
	const animatedComponents = makeAnimated();
	const sectionCollectionRef = collection(db, 'sections');

	// useState
	const [company, setCompany] = useState({});
	const [sections, setSections] = useState([]);
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'companies', getId);
			const docSnap = await getDoc(docRef);

			setCompany(docSnap.data());
		};
		getData();

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
			const updateCompany = doc(db, 'companies', getId);
			await updateDoc(updateCompany, company);

			setMassage({ status: 'success', text: 'تم تعديل مستخدم بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(company) ? (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group mb-2">
						<label htmlFor="name" className="form-label">
							اسم الشركة
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								placeholder="ادخل اسم"
								value={company.name}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="form-group mb-2">
						<label htmlFor="description" className="form-label">
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
									value={company.description}
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
						<label htmlFor="email" className="form-label">
							البريد الالكتروني
						</label>
						<div className="input-group">
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								placeholder="ادخل البريد الالكتروني"
								value={company.email}
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
								value={company.phone}
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
								value={company.city}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				</div>

				<Button title="تعديل شركة" className="btn-info mt-2" />
			</form>
		</>
	) : (
		<Spinner />
	);
};

export default EditCompany;
