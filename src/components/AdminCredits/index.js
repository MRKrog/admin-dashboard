import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class AdminCredits extends Component {
  constructor(props) {
    super(props)
    this.state = {
			creditsOnHand: '',
			creditsUsed: '',
			userProducts: '',
			userVariants: '',
			recentTransactions: []
    }
  }

	
	componentDidMount() {
		console.log(this.props)
		this.setState({
			creditsOnHand: this.creditsAvailable(this.props.userTransactions),
			creditsUsed: this.creditsUsed(this.props.userTransactions),
			userProducts: this.props.productCount ||  '',
			userVariants: this.props.variantCount ||  '',
			recentTransactions: this.props.userTransactions.length,
		})
	}

  creditsAvailable = (transactions) => {
		console.log(transactions)
		let sumTrans = 0;
		if(transactions.length > 0) {
			sumTrans = transactions.reduce((acc, invoice) => {
				if(invoice.transaction_type !== 'subscription' && invoice.status === 'accepted') {
					console.log(invoice)
					acc += invoice.credit_amount;
				}
				return acc;
			}, 0);
		}
		return sumTrans;
	}

	creditsUsed = (transactions) => {
		let sumTrans = 0;
		if(transactions.length > 0) {
			sumTrans = transactions.reduce((acc, invoice) => {
				if(invoice.transaction_type === 'debit'){
					acc += invoice.credit_amount;
				}
				return acc;
			}, 0);
		}
		return sumTrans/-1;
	}

//
  render() {
      return (
				<div className="AdminCredits">
					<div className="AdminList">
					<List>
					<ListItem>Credits on hand:</ListItem>
					<Divider />
					<ListItem>Credits used:</ListItem>
					<Divider />
					<ListItem>User products:</ListItem>
					<Divider />
					<ListItem>User variants:</ListItem>
					<Divider />
					<ListItem>All transactions:</ListItem>
					</List>
					<List>
					<ListItem>{this.state.creditsOnHand}</ListItem>
					<Divider />
					<ListItem>{this.state.creditsUsed}</ListItem>
					<Divider />
					<ListItem> {this.state.userProducts}</ListItem>
					<Divider />
					<ListItem>{this.state.userVariants}</ListItem>
					<Divider />
					<ListItem>{this.state.recentTransactions}</ListItem>
					</List>
					</div>
				</div>
    );
  }
}

// style the text for table
// change fields for credist
// Save button 

export default AdminCredits;

