import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AdminInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			first_name: '',
			last_name: '',
			address: '',
			business_name: '',
			city: '',
			country: '',
			state: '',
			phone_number: '',
			zip: '',
		}
	}

	componentDidMount() {
		console.log(this.props)
		this.setState({
			email: this.props.userInfo.email,
			business_name: this.props.userInfo.business_name || '',
			first_name: this.props.userInfo.first_name || '',
			last_name: this.props.userInfo.last_name || '',
			address: this.props.userInfo.address || '',
			city: this.props.userInfo.city || '',
			country: this.props.userInfo.country || '',
			state: this.props.userInfo.state || '',
			phone_number: this.props.userInfo.phone_number || '',
			zip: this.props.userInfo.zip || '',
		})
	}

	handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

	handleSave = () => {
		console.log('Saving')
	}

	render() {
		return (
			<div className="Admin-Form-Info">              
				<form>
					<div className="User-Info-Form">
					<TextField
						id="standard-basic-business_name"
						label="Business Name"
						margin="dense"
						type="text"
						name="business_name"
						value={this.state.business_name}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-first-name"
						label="First Name"
						margin="dense"
						type="text"
						name="first_name"
						value={this.state.first_name}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-last-name"
						label="Last Name"
						margin="dense"
						type="text"
						name="last_name"
						value={this.state.last_name}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-address"
						label="Address"
						margin="dense"
						type="text"
						name="address"
						value={this.state.address}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-city"
						label="City"
						margin="dense"
						type="text"
						name="city"
						value={this.state.city}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-country"
						label="Country"
						margin="dense"
						type="text"
						name="country"
						value={this.state.country}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-state"
						label="State"
						margin="dense"
						type="text"
						name="state"
						value={this.state.state}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-phone_number"
						label="Phone Number"
						margin="dense"
						type="text"
						name="phone_number"
						value={this.state.phone_number}
						onChange={this.handleInputChange}
					/>
					<TextField
						id="standard-basic-zip"
						label="Zip"
						margin="dense"
						type="text"
						name="zip"
						value={this.state.zip}
						onChange={this.handleInputChange}
					/>
			</div>
					<div className="submit-button">
							<Button type="submit" variant="contained" onClick={this.handleSave}>Save</Button>
					</div>
				</form>
			</div>
		)
	}
}

export default AdminInfo;