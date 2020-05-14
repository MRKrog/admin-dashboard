import React, { Component } from 'react';
import TransactionTable from './TransactionTable';
import Creditor from './Creditor';

class AdminCreditContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
		
    }
  }

	
	componentDidMount() {
  }
  

  render() {
      return (
				<div className="AdminCreditContainer">
          { this.props.userTransactions.length > 0 ? (
	          <TransactionTable userTransactions={this.props.userTransactions} />
          ) : (
            <div> No Trannys Table Bitch </div>
          ) }
          <Creditor {...this.props.userInfo} />
				</div>
    );
  }
}

export default AdminCreditContainer;



