import _ from 'lodash';
import { useRouter } from 'next/router';
import { Button } from '@/components/UI';
import React, { useEffect, useState } from 'react';

import { db } from '@/middleware/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';

const Login = () => {
	const router = useRouter();
	const usersCollectionRef = collection(db, 'users');

	const [user, setUser] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedIn, setLoggedIn] = useState({
		username: '',
		password: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		const getAllUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			// setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			console.log(data.docs);
		};
		getAllUsers();

		if (loggedIn.username === '') return;

		const getData = async () => {
			const q = query(usersCollectionRef, where('username', '==', loggedIn.username));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => setUser(doc.data()));
		};
		getData();
	}, [loggedIn]);

	useEffect(() => {
		// Cheack is user logged in
		const storageData =
			localStorage.getItem('auth-user') !== null
				? JSON.parse(localStorage.getItem('auth-user'))
				: false;

		if (storageData.isAuth) {
			router.push('/');
		}

		if (isLoggedIn) {
			user !== undefined &&
				localStorage.setItem('auth-user', JSON.stringify({ user, isAuth: true }));
		}
	}, [isLoggedIn]);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoggedIn({ ...loggedIn, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (_.isEmpty(loggedIn.username) && _.isEmpty(loggedIn.password)) {
			return setMassage({ status: 'error', text: 'يرجي ادخال اسم المستخدم وكملة المرور ❌' });
		} else if (user.password !== loggedIn.password || user === undefined) {
			return setMassage({ status: 'error', text: 'خطاء في اسم المستخدم او كلمة المرور ❌' });
		}

		setMassage({ status: 'success', text: 'تم تسجيل الدخول ✅' });

		setTimeout(() => {
			setMassage({ status: '', text: '' });
			setIsLoggedIn(true);
			router.push('/');
		}, 2500);
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: '100vh' }}
		>
			<div className="card text-bg-light" style={{ width: '60%' }}>
				<div className="row">
					<div className="text-center py-5 h3 fw-bold text-success">
						Educational Platform
					</div>
					<div className="col-md-6">
						<div className="card-body py-5 px-3">
							{(massage.status === 'success' && (
								<div className="alert alert-success text-center">
									{massage.text}
								</div>
							)) ||
								(massage.status === 'error' && (
									<div className="alert alert-danger text-center">
										{massage.text}
									</div>
								))}

							<form onSubmit={handleSubmit}>
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

								<div className="d-grid gap-2 col-6 mx-auto">
									<Button title="تسجيل الدخول" className="btn-success mt-2" />
								</div>
							</form>
						</div>
					</div>
					<div className="col-md-6 px-5">
						<Image
							src="/assets/image/login.png"
							width={350}
							height={350}
							className="float-end"
							alt="school"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
