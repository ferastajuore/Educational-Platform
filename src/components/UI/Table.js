import React, { useEffect, useState } from 'react';
import { kaReducer, Table } from 'ka-table';
import 'ka-table/style.css';

const TableComponent = ({ dataTable, tablePropsInit }) => {
	const [tableProps, changeTableProps] = useState(tablePropsInit);
	const dispatch = (action) => {
		changeTableProps((prevState) => kaReducer(prevState, action));
	};
	const [isSSR, setIsSSR] = useState(true);

	useEffect(() => {
		setIsSSR(false);
	});

	return (
		!isSSR && (
			<Table
				{...tableProps}
				className="table"
				data={dataTable.length !== 0 ? dataTable : []}
				dispatch={dispatch}
			/>
		)
	);
};

export default TableComponent;
