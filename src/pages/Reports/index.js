import React from 'react';

import { AdminLayout } from '@/components/layout';
import { Header } from '@/components/UI';
import { StatusReportsTable, NewReportsTable } from '@/components/reports';

const Reports = () => {
	return (
		<AdminLayout>
			<Header title="حالة البلاغات" className="text-start" />
			<StatusReportsTable />
			<Header title="البلاغات الجديدة" className="text-start" />
			<NewReportsTable />
		</AdminLayout>
	);
};

export default Reports;
