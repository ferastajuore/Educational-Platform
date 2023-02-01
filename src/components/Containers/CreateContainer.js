import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { Button, Spinner } from '@/components/UI';
import { db, storage } from '@/middleware/firebase';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

const CreateContainer = () => {
	const collectionRef = collection(db, 'containers');
	const router = useRouter();

	// useState
	const [imageUpload, setImageUpload] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [container, setContainer] = useState({
		city: '',
		address: '',
		location: '',
		image: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setContainer({ ...container, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			if (imageUpload === null) return;

			const imageRef = ref(storage, `containers/${imageUpload.name + v4()}`);

			await uploadBytes(imageRef, imageUpload);
			const getURL = await getDownloadURL(imageRef);
			await addDoc(collectionRef, {
				...container,
				image: getURL,
			});

			setMassage({ status: 'success', text: 'تم اضافة حاوية بنجاح' });

			setTimeout(() => {
				router.reload();
				setContainer('');
				setMassage('');
				setIsLoading(false);
			}, 2500);
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
					<label htmlFor="address" className="form-label">
						العنوان
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="address"
							name="address"
							placeholder="ادخل العنوان"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="location" className="form-label">
						الاحداثيات
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="location"
							name="location"
							placeholder="ادخل الاحداثيات"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="image" className="form-label">
						تحميل الصورة
					</label>
					<div className="input-group">
						<input
							type="file"
							className="form-control"
							id="image"
							name="image"
							placeholder="تحميل الصورة"
							onChange={(e) => setImageUpload(e.target.files[0])}
							required
						/>
					</div>
				</div>

				{!isLoading ? (
					<Button title="اضافة حاوية" className="btn-info mt-2" />
				) : (
					<Spinner size="md" color="#03213d" />
				)}
			</form>
		</>
	);
};

export default CreateContainer;
