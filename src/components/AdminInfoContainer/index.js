import React, { Component } from 'react';
import UserAggregate from './UserAggregate';
import UserInfo from './UserInfo';

class AdminInfoContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="AdminInfoContainer">              
				<UserInfo userInfo={this.props.userInfo} />
				<UserAggregate userTransactions={this.props.userTransactions} 
											 productCount={this.props.productCount}
											 variantCount={this.props.variantCount}
				/>
			</div>
		)
	}
}

export default AdminInfoContainer;