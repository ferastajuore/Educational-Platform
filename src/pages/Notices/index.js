import { AdminLayout } from '@/components/layout';
import { CreateNotice } from '@/components/Notices';
import { Header } from '@/components/UI';

const Ads = () => {
	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="اشعارات" />

					<CreateNotice />
				</div>
			</AdminLayout>
		</>
	);
};

export default Ads;
