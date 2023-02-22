import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { BsNewspaper } from 'react-icons/bs';

import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/middleware/firebase';

const Statistics = () => {
	const [counts, setCounts] = useState({
		teacher: 0,
		student: 0,
		quiz: 0,
	});
	const teacherCollectionRef = collection(db, 'teachers');
	const studentsCollectionRef = collection(db, 'students');
	const quizCollectionRef = collection(db, 'quiz');

	useEffect(() => {
		const countDocs = async () => {
			// count teachers
			const teacherData = await getCountFromServer(teacherCollectionRef);

			// count student
			const studentData = await getCountFromServer(studentsCollectionRef);

			// count quiz
			const quizData = await getCountFromServer(quizCollectionRef);
			setCounts({
				teacher: teacherData.data().count,
				student: studentData.data().count,
				quiz: quizData.data().count,
			});
		};
		countDocs();
	}, []);

	return (
		<div className="statistics row my-5">
			<div className="col-sm-6 col-lg-4">
				<div className="card box-shadow-dark">
					<div className="card-body">
						<div
							className="bg-blue p-2 rounded box-shadow-dark"
							style={{ position: 'absolute', top: '-30px', left: 20 }}
						>
							<FaChalkboardTeacher fontSize="5em" />
						</div>
						<div className="text-center text-black" style={{ float: 'right' }}>
							<h4 className="h5">المعلمين</h4>
							<h4 className="h4">{counts.teacher && counts.teacher}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card box-shadow-dark">
					<div className="card-body">
						<div
							className="bg-pink p-2 rounded box-shadow-dark"
							style={{ position: 'absolute', top: '-30px', left: 20 }}
						>
							<FaUserGraduate fontSize="5em" />
						</div>
						<div className="text-center text-black" style={{ float: 'right' }}>
							<h4 className="h5">الطلاب</h4>
							<h4 className="h4">{counts.student && counts.student}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card box-shadow-dark">
					<div className="card-body">
						<div
							className="bg-green p-2 rounded box-shadow-dark"
							style={{ position: 'absolute', top: '-30px', left: 20 }}
						>
							<BsNewspaper fontSize="5em" />
						</div>
						<div className="text-center text-black" style={{ float: 'right' }}>
							<h4 className="h5">اختبار هدا الشهر</h4>
							<h4 className="h4">{counts.quiz & counts.quiz}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
