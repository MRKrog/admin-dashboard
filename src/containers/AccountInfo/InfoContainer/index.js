import React from 'react';
import UserAggregate from './UserAggregate';
import UserInfo from './UserInfo';

const AdminInfoContainer = (props) => {
	
	return (
		<div className="AdminInfoContainer">
			<UserAggregate userTransactions={props.userTransactions}
										 productCount={props.productCount}
										 variantCount={props.variantCount}
			/>
			<UserInfo closeDrawer={props.closeDrawer} userInfo={props.userInfo} />
		</div>
	)
}

export default AdminInfoContainer;
