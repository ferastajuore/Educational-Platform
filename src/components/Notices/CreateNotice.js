import React, { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore';
import Select from 'react-select';

import { Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateNotice = () => {
	const collectionRef = collection(db, 'notices');
	const sectionCollectionRef = collection(db, 'sections');
	const [sections, setSections] = useState([]);
	const router = useRouter();

	// useState
	const [notice, setNotice] = useState({});
	const [isLoading, setIsLoading] = useState();
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
		setNotice({ ...notice, [name]: value });
	};

	const handleChangeSections = (selectedOption) => {
		setNotice({ ...notice, section: selectedOption });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			await addDoc(collectionRef, { ...notice, date: serverTimestamp() });
			setMassage({ status: 'success', text: 'تم اضافة اعلان بنجاح' });

			setTimeout(() => {
				router.reload();
				setNotice('');
				setMassage('');
				setIsLoading(false);
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
				<div className="row">
					<div className="form-group mb-2 col-sm-6">
						<label htmlFor="title" className="form-label text-black">
							العنوان
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="title"
								name="title"
								placeholder="ادخل العنوان"
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="form-group mb-2 col-sm-6">
						<label htmlFor="description" className="form-label text-black">
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
									className="text-black"
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

					<div className="form-group mb-2 col-sm-12">
						<label htmlFor="description" className="form-label text-black">
							الوصف
						</label>
						<div className="input-group">
							<textarea
								className="form-control"
								id="description"
								name="description"
								placeholder="ادخل العنوان"
								onChange={handleChange}
								required
								cols="30"
								rows="10"
							></textarea>
						</div>
					</div>
				</div>

				{!isLoading ? (
					<Button title="اضافة اشعار" className="btn-info mt-2" />
				) : (
					<Spinner size="md" color="#03213d" />
				)}
			</form>
		</>
	);
};

export default CreateNotice;
