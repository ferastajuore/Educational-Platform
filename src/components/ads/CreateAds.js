import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { Button, Spinner } from '@/components/UI';
import { db, storage } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateAds = () => {
	const collectionRef = collection(db, 'ads');
	const router = useRouter();

	// useState
	const [imageUpload, setImageUpload] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [ads, setAds] = useState({
		title: '',
		description: '',
		image: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAds({ ...ads, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			if (imageUpload === null) return;

			const imageRef = ref(storage, `ads/${imageUpload.name + v4()}`);

			await uploadBytes(imageRef, imageUpload);
			const getURL = await getDownloadURL(imageRef);

			await addDoc(collectionRef, { ...ads, date: serverTimestamp(), image: getURL });
			setMassage({ status: 'success', text: 'تم اضافة اعلان بنجاح' });

			setTimeout(() => {
				router.reload();
				setAds('');
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
				<div className="form-group mb-2">
					<label htmlFor="title" className="form-label">
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

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label">
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

				{!isLoading ? (
					<Button title="اضافة اعلان" className="btn-info mt-2" />
				) : (
					<Spinner size="md" color="#03213d" />
				)}
			</form>
		</>
	);
};

export default CreateAds;
