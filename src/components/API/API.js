import React from 'react';
import M from 'materialize-css';
import config from '../../config';

class Api extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			serveUrl: '',
			loadingUrl: true,
			apis: [],
			projectName: this.props.match.params.projectName,
			endpoint: '/',
			apiresponse: '',
			reqmethod: 'GET',
			resheaders: '',
			type: 'HTML',
		}

		this.handleChange = this.handleChange.bind(this);
		this.addApi = this.addApi.bind(this);
		this.fetchProjectAPIs = this.fetchProjectAPIs.bind(this);
	}

	addApi (e) {

		let data = {
			projectName: this.state.projectName,  
			endpoint: this.state.endpoint,
			apiresponse: this.state.apiresponse,
			reqmethod: this.state.reqmethod,
			resheaders: this.state.resheaders,
			type: this.state.type,
		}

		let token = localStorage.getItem('token');
		if(!token) {
			alert('Please Login Again');
			this.props.history.push('/');
			return;
		}

		const reqOptions = {
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
		};
		reqOptions.headers.Authorization = token;
		reqOptions.method = "POST";
		reqOptions.body = JSON.stringify(data);
		fetch(`${config.api.url}/mockapi`, reqOptions)
			.then(response => response.json())
			.then(res => {
				console.log(res);
				if(res.success) {
					this.fetchProjectAPIs();
					return;
				}
				else {
					alert('Error Occured.Please Try Again.');
					return;
				}
			});
	}

	fetchProjectAPIs() {
		let token = localStorage.getItem('token');
		if(!token) {
			alert('Please Login Again');
			this.props.history.push('/');
			return;
		}

		let projectName = this.props.match.params.projectName;

		const reqOptions = {
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
		};
		reqOptions.method = "GET";
		reqOptions.headers.Authorization = token;

		fetch(`${config.api.url}/mockapi?projectName=${projectName}`, reqOptions)
		.then(res => res.json())
		.then((res) => {

			if(res.success) {
				return this.setState({
					apis: res.data.apis,
					loadingUrl: false,
					serveUrl: res.data.serveUrl
				})
			} else {
				alert('Could not fetch apis');
			}
			
		})
	}

	componentWillMount() {

		this.fetchProjectAPIs();
	}

	handleChange (e) {

		this.setState({
			[e.target.name]: e.target.value
		})
	}

	componentDidMount() {
		let select = document.querySelectorAll('select');
		M.FormSelect.init(select, {});

		let collap = document.querySelectorAll('.collapsible');
		M.Collapsible.init(collap, {});
	}

	render() {

		return (

			<div className='container'>
	
				<h1 className='black-text'>{this.props.match.params.projectName} API's</h1>
				<h5 className='black-text'>Add/Edit Api</h5>
				<br />

				<div class="input-field col s12">
					<input 
						placeholder='Endpoint' 
						id='endpoint' 
						name='endpoint'
						type='text'
						value={this.state.endpoint}
						onChange={this.handleChange}
						required
					/>
					<label for="endpoint">Endpoint</label>
				</div>

				<div class="input-field col s12">
					<select
						id='reqmethod'
						name='reqmethod'
						value={this.state.reqmethod}
						onChange={this.handleChange}
					>
						<option selected value="GET">GET</option>
						<option value="POST">POST</option>
						<option value="PUT">PUT</option>
						<option value="DELETE">DELETE</option>
					</select>
					<label htmlFor='reqmethod'>Request Method</label>
				</div>

				<div class="input-field col s12">
					<select
						id='type'
						name='type'
						value={this.state.type}
						onChange={this.handleChange}
					>
						<option selected value="HTML">HTML</option>
						<option value="JSON">JSON</option>
						<option value="TEXT">TEXT</option>
					</select>
					<label htmlFor='type'>Response Type</label>
				</div> 

				<div class="input-field col s12">
					<input 
						placeholder='API Response' 
						id='apiresponse' 
						name='apiresponse'
						type='text'
						value={this.state.apiresponse}
						onChange={this.handleChange}
						required
					/>
					<label for="apiresponse">API Response</label>
				</div>

				<div class="input-field col s12">
					<input 
						placeholder='Type valid JSON' 
						id='resheaders' 
						name='resheaders'
						type='text'
						value={this.state.resheaders}
						onChange={this.handleChange}
						required
					/>
					<label for="resheaders">Headers (if any)</label>
				</div>

				<button 
					className="btn waves-effect waves-light" 
					type="submit" 
					onClick={this.addApi}
				>
					Add API
					<i class="material-icons right">send</i>
				</button>

				<br /><br /><br />

				<div class="row">
					<div class="col s12">
					<div class="card-panel teal">
						<span class="white-text">
							The APIs are served at: 
							
							<br />
							{
								(this.state.loadingUrl) ? 
								(
									'Loading URL'
								) : (
									config.api.url + '/serve/' + this.state.serveUrl
								)
							}
						</span>
					</div>
					</div>
				</div>

				<h5>Current API's</h5>
				{
					(this.state.apis && this.state.apis.length > 0) ?
					(
						<ul class="collection">
						{
							this.state.apis.map((api) => {
								return (
									<li className='collection-item'>
										<strong>{api.reqmethod}</strong> - {api.endpoint}
										<br />
										Response Type: {api.type.toUpperCase()}
										<br />
										Response: {api.apiresponse}
										<br />
										Headers: {api.headers}
										<br />
									</li>
								);
							})
						}
						</ul>
					) : (
						'No Apis Added Yet'
					)
				}

			</div>
			
		);
	}
}


export default Api;