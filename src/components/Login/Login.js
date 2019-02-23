import React from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';

import { GoogleLogin } from 'react-google-login';
import './Login.css';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			name: '',
			picture: ''
		}

		this.responseGoogle = this.responseGoogle.bind(this);
	}

	responseGoogle = (response) => {

		console.log(response.profileObj);
		this.setState({
			loading: false,
			name: response.profileObj.name,
			picture: response.profileObj.imageUrl
		})

		if(!response.tokenId) {
			return alert('Login Faled. Please Try Again');
		}

		const reqOptions = {
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
		};
		reqOptions.body = JSON.stringify({
			id_token: response.tokenId
		});
		reqOptions.method = "POST";
		
		fetch(`${config.api.url}/user/login`, reqOptions)
		.then(res => res.json())
		.then(res => {
			localStorage.setItem('token', res.data.token);
		})

	}


	render() {

		return (

			<div className='container'>
				<div id='loginDiv'>
					<GoogleLogin
						clientId='258614999580-4thjtp8a6vcr0qmerrnf05jgu5561v55.apps.googleusercontent.com'
						onSuccess={this.responseGoogle}
						onFailure={this.responseGoogle}
						className='googleLoginButton'
					/>
				</div>

				<br />
				<br />
				<br />


				<br />
				<br />
				{
					(this.state.loading) ?
					(null) : 
					(
						<div>
							Logged In As:

							<div className='userInfo'>
								<img 
								className='userDisplayPicture'
								src={this.state.picture}
								alt='display'
								/>
								<span>
									{this.state.name}
								</span>
							</div>

							<Link to='/projects'>
								<button class="projectsButton btn waves-effect waves-light">
									See Your Projects
									<i class="material-icons right">send</i>
								</button>
							</Link>	

						</div>
					)
				}
			</div>

		);
	}
}

export default Login;