import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { Button, Spinner } from '@/components/UI';
import { db, storage } from '@/middleware/firebase';

const EditContainer = ({ getId }) => {
	const router = useRouter();

	// useState
	const [imageUpload, setImageUpload] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [container, setContainer] = useState({});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'containers', getId);
			const docSnap = await getDoc(docRef);

			setContainer(docSnap.data());
		};
		getData();
	}, []);

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

			const updateContainer = doc(db, 'containers', getId);
			await updateDoc(updateContainer, { ...container, image: getURL });

			setMassage({ status: 'success', text: 'تم تعديل الحاوية بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
				setIsLoading(false);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(container.image);
	return !_.isEmpty(container) ? (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="row">
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
								value={container.city}
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
								value={container.address}
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
								value={container.location}
								onChange={handleChange}
								required
							/>
						</div>
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
							// value={container.image}
							onChange={(e) => setImageUpload(e.target.files[0])}
							required
						/>
					</div>
				</div>

				{!isLoading ? (
					<Button title="تعديل شركة" className="btn-info mt-2" />
				) : (
					<Spinner size="md" color="#03213d" />
				)}
			</form>
		</>
	) : (
		<Spinner />
	);
};

export default EditContainer;
