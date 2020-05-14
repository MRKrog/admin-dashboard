import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UserAggregate extends Component {
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
		this.setState({
			creditsOnHand: this.creditsAvailable(this.props.userTransactions),
			creditsUsed: this.creditsUsed(this.props.userTransactions),
			userProducts: this.props.productCount ||  'N/A',
			userVariants: this.props.variantCount ||  'N/A',
			recentTransactions: this.props.userTransactions.length,
		})
	}

  creditsAvailable = (transactions) => {
		let sumTrans = 0;
		if(transactions.length > 0) {
			sumTrans = transactions.reduce((acc, invoice) => {
				if(invoice.transaction_type !== 'subscription' && invoice.status === 'accepted') {
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

  render() {
      return (
				<div className="AdminCredits">
					<TableContainer component={Paper}>
						<Table aria-label="custom pagination table">
							<TableBody>
									<TableRow>
										<TableCell component="th" scope="row">
											Credits on hand:
										</TableCell>
										<TableCell style={{ width: 160 }} align="left">
											{this.state.creditsOnHand}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" scope="row">
										Credits used:
										</TableCell>
										<TableCell style={{ width: 160 }} align="left">
											{this.state.creditsUsed}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" scope="row">
										User products in ES:
										</TableCell>
										<TableCell style={{ width: 160 }} align="left">
											{this.state.userProducts}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" scope="row">
										User variants in ES:
										</TableCell>
										<TableCell style={{ width: 160 }} align="left">
											{this.state.userVariants}
										</TableCell>
									</TableRow>
								</TableBody>
						</Table>
					</TableContainer>
				</div>
    );
  }
}


const mapStateToProps = () => ({

})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps) (UserAggregate);
