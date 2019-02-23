import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import HomePage from './components/Home/Home';
import Projects from './components/Projects/Projects'
import Api from './components/API/API';
import Nav from './components/Nav/Nav';

class App extends Component {

	render() {
		return (
			
			<BrowserRouter>
				<>
				<Nav />
					<Switch>
						
						<Route exact path='/login' component={Login} />
						<Route exact path='/' component={HomePage} />
						<Route exact path='/projects' component={Projects} />
						<Route exact path='/projects/:projectName' component={Api} />
					
					</Switch>	
				</>
			</BrowserRouter>
				
		);
	}
}

export default App;