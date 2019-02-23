import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

class Projects extends React.Component {

	constructor(props) {
		super(props);

	
		this.state = {
			projectName: "",
			projects: []
		};
		
		this.fetchProjects = this.fetchProjects.bind(this);
		this.addProject = this.addProject.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	fetchProjects () {
		let token = localStorage.getItem('token');
		if(!token) {
			alert('Please Login Again');
			this.props.history.push('/login');
			return;
		}

		const reqOptions = {
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
		}
		reqOptions.method = "GET";
		reqOptions.headers.Authorization = token;
		fetch(`${config.api.url}/project`, reqOptions)
		.then(res => res.json())
		.then(res => {
			this.setState({
				projects: res.data.projects
			})
		})
	}

	componentWillMount() {
		this.fetchProjects();
	}

	handleChange (e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	addProject (e) {

		let proj = this.state.projectName.trim();
		if(proj === '') {
			alert('Enter Project Name');
			return;
		}

		let token = localStorage.getItem('token');
		if(!token) {
			alert('Please Login Again');
			this.props.history.push('/');
			return;
		}

		const data = {
			projectName: proj,
		};

		const reqOptions = {
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
		};
		reqOptions.body = JSON.stringify(data);
		reqOptions.headers.Authorization = token;
		reqOptions.method = "PUT";
		fetch(`${config.api.url}/project`, reqOptions)
			.then(response => response.json())
			.then(res => {
				if(res.success) {
					this.fetchProjects();
				}
				else {
					alert(res.message);
				}
			})
		
	}

	render() {
		return (
			<>

				<div className='container'>


					<label htmlFor='projectName'>Project Name</label>
					<input name='projectName' id='projectName' type='text' value={this.state.projectName} onChange={this.handleChange} />

					<button 
						className="btn waves-effect waves-light" 
						type="submit" 
						onClick={this.addProject}
					>
						Add Project
						<i class="material-icons right">send</i>
					</button>
				
					<br/>
					<br/>
					<br/>
					<br/>
			
					{
						(this.state.projects && this.state.projects.length > 0) ?
						(
							<>
							<h1>Your Projects:</h1>
							<ul className='collection'>
							{
								this.state.projects.map((projectName) => {
									return (
										<Link to={`/projects/${projectName}`}>
											<li className='collection-item'>{projectName}</li>
										</Link>
									);
								})
							}
							</ul>
							</>
						) : (
							'Add Projects :)'
						)
					}
					
				</div>
			</>
		);
	}
}


export default Projects;