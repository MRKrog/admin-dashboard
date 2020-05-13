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
            <>
	          <TransactionTable userTransactions={this.props.userTransactions} />
            <Creditor {...this.props.userInfo} />
            </>
          ) : (
            <div> No Trannys </div>
          ) }
				</div>
    );
  }
}

export default AdminCreditContainer;



