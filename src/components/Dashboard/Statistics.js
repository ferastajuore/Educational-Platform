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
		<div className="row mb-5">
			<div className="col-sm-6 col-lg-4">
				<div className="card text-bg-primary ">
					<div className="card-body px-3 d-flex justify-content-around align-items-center">
						<div>
							{/* <i className="fa fa-users fa-5x"></i> */}
							<FaChalkboardTeacher fontSize="5em" />
						</div>
						<div className="text-center text-white">
							<h4>المعلمين</h4>
							<h4>{counts.teacher && counts.teacher}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card text-bg-success ">
					<div className="card-body px-3 d-flex justify-content-around align-items-center">
						<div className="text-white">
							<FaUserGraduate fontSize="5em" />
						</div>
						<div className="text-center text-white">
							<h4>الطلاب</h4>
							<h4>{counts.student && counts.student}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card text-bg-warning ">
					<div className="card-body px-3  d-flex justify-content-around align-items-center">
						<div className="text-white">
							<BsNewspaper fontSize="5em" />
						</div>
						<div className="text-center text-white">
							<h4>اختبار هدا الشهر</h4>
							<h4>{counts.quiz & counts.quiz}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
