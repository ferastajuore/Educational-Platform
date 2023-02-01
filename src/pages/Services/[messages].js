import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
	onSnapshot,
	orderBy,
	limit,
	query,
	getDoc,
	where,
	getDocs,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { AdminLayout } from '@/components/layout';

const Messages = () => {
	const router = useRouter();
	const [messages, setMessages] = useState([]);
	const [numTicket, setNumTicket] = useState(0);
	const [status, setStatus] = useState(1);
	const [createMessage, setCreateMessage] = useState('');

	const collectionRef = collection(db, 'services');

	useEffect(() => {
		if (router.query.messages !== undefined) {
			const getMessage = async () => {
				const document = doc(db, 'services', router.query.messages);
				const docSnap = await getDoc(document);
				setNumTicket(docSnap.data().ticket);

				const q = query(
					collectionRef,
					orderBy('date'),
					limit(100),
					where('ticket', '==', docSnap.data().ticket)
				);

				onSnapshot(q, (querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}));
					setMessages(data);
					setStatus(docSnap.data().status);
				});
			};

			getMessage();
		}
	}, [router.query.messages]);

	// Handle Status
	const handleStatus = async (status) => {
		if (status === 1) {
			const document = doc(db, 'services', router.query.messages);
			await updateDoc(document, { status: 0 });
			setStatus(0);
		} else {
			const document = doc(db, 'services', router.query.messages);
			await updateDoc(document, { status: 2 });
			setStatus(2);

			setTimeout(() => {
				router.back();
			}, 2500);
		}
	};

	const handleSenderMessage = async () => {
		try {
			const collectionRef = collection(db, 'services');
			// const msgRef = doc(db, 'services', router.query.messages);
			await addDoc(collectionRef, {
				text: createMessage,
				date: serverTimestamp(),
				sender: 'admin',
				received: router.query.messages,
				status: 0,
				ticket: numTicket,
			});

			setCreateMessage('');
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(messages) ? (
		<AdminLayout>
			<div className="card">
				<div
					className={`card-header d-flex ${
						status === 0 ? 'justify-content-end' : 'justify-content-start'
					}`}
				>
					{(status === 1 && (
						<button className="btn btn-success" onClick={() => handleStatus(status)}>
							قبول الخدمة
						</button>
					)) ||
						(status === 0 && (
							<button className="btn btn-danger" onClick={() => handleStatus(status)}>
								انهاء الخدمة
							</button>
						)) ||
						(status === 2 && <p className="h5 text-danger">تم انهاء الخدمة</p>)}
				</div>

				<div className="card-body">
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`message-reseved p-2 mb-3 text-white rounded-start-2 
                                ${msg.sender !== 'admin' ? 'float-end text-end' : ''}`}
							style={{
								width: '30%',
								backgroundColor: msg.sender !== 'admin' ? '#1484a0cf' : '#03213d',
								clear: msg.sender !== 'admin' ? 'none' : 'left',
							}}
						>
							<p>{msg.text}</p>
						</div>
					))}
				</div>

				<div className="card-footer">
					<div className="input-group my-3">
						<input
							type="text"
							className="form-control"
							placeholder="ارسال رسالة ..."
							onChange={(e) => setCreateMessage(e.target.value)}
							value={createMessage}
							disabled={status !== 0 && true}
						/>
						<button
							className="btn btn-info"
							onClick={handleSenderMessage}
							disabled={status !== 0 && true}
						>
							ارسال
						</button>
					</div>
				</div>
			</div>
		</AdminLayout>
	) : (
		<Spinner />
	);
};

export default Messages;
