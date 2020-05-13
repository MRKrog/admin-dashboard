import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class UserInfo extends Component {
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

	handleSubmit = () => {
		console.log('Saving', this.state)
		
	}

	render() {
		return (
			<div className="UserInfo">              
				<div className="User-Info-Form">
					<section className="infoRow">
						<TextField
						id="standard-basic-business_name"
						label="Business Name"
						margin="dense"
						type="text"
						name="business_name"
						className='User-Field'
						value={this.state.business_name}
						onChange={this.handleInputChange}
						/>
						<TextField
						id="standard-basic-first-name"
						label="First Name"
						margin="dense"
						type="text"
						name="first_name"
						className='User-Field'
						value={this.state.first_name}
						onChange={this.handleInputChange}
						/>
						<TextField
						id="standard-basic-last-name"
						label="Last Name"
						margin="dense"
						type="text"
						name="last_name"
						className='User-Field'
						value={this.state.last_name}
						onChange={this.handleInputChange}
						/>
					</section>
					<section className="infoRow">
						<TextField
							id="standard-basic-address"
							label="Address"
							margin="dense"
							type="text"
							name="address"
							className='User-Field'
							value={this.state.address}
							onChange={this.handleInputChange}
						/>
						<TextField
							id="standard-basic-city"
							label="City"
							margin="dense"
							type="text"
							name="city"
							className='User-Field'
							value={this.state.city}
							onChange={this.handleInputChange}
						/>
						<TextField
							id="standard-basic-country"
							label="Country"
							margin="dense"
							type="text"
							name="country"
							className='User-Field'
							value={this.state.country}
							onChange={this.handleInputChange}
						/>
					</section>
					<section className="infoRow">
						<TextField
							id="standard-basic-state"
							label="State"
							margin="dense"
							type="text"
							name="state"
							className='User-Field'
							value={this.state.state}
							onChange={this.handleInputChange}
						/>
						<TextField
							id="standard-basic-phone_number"
							label="Phone Number"
							margin="dense"
							type="text"
							name="phone_number"
							className='User-Field'
							value={this.state.phone_number}
							onChange={this.handleInputChange}
						/>
						<TextField
							id="standard-basic-zip"
							label="Zip"
							margin="dense"
							type="text"
							name="zip"
							className='User-Field'
							value={this.state.zip}
							onChange={this.handleInputChange}
						/>
					</section>
				</div>
				<div className="submit-button">
					<Button type="submit" variant="contained" onClick={this.handleSubmit}>Save</Button>
				</div>
			</div>
		)
	}
}

export default UserInfo;