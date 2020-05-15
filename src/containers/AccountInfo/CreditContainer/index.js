import React from 'react';
import TransactionTable from './TransactionTable';
import Creditor from './Creditor';

const AdminCreditContainer = (props) => {
  
  return (
		<div className="AdminCreditContainer">
      { props.userTransactions.length > 0 ? (
        <TransactionTable userTransactions={props.userTransactions} />
      ) : (
        <div> No Transactions Table </div>
      ) }
      <Creditor {...props.userInfo} />
		</div>
  );
}

export default AdminCreditContainer;
