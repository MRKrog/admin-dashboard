import React, { Component } from 'react';
import UserAggregate from './UserAggregate';
import UserInfo from './UserInfo';

class AdminInfoContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<div className="AdminInfoContainer">
				<UserAggregate userTransactions={this.props.userTransactions}
											 productCount={this.props.productCount}
											 variantCount={this.props.variantCount}
				/>
				<UserInfo toggleDrawer={this.props.toggleDrawer} userInfo={this.props.userInfo} />
			</div>
		)
	}
}

export default AdminInfoContainer;
