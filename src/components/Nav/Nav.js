import React from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

	componentDidMount() {
		
		var elems = document.querySelectorAll('.sidenav');
    	M.Sidenav.init(elems, {});
	}

	render() {

		return (
			<>

				<nav>
					<div class="nav-wrapper">
						<Link to='/' class="brand-logo">MockAPI</Link>
						
						<a href="#!" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
						<ul class="right hide-on-med-and-down">
							<li><Link to='/'>Home</Link></li>
							<li><Link to='/login'>Login</Link></li>
							<li><Link to='/projects'>Projects</Link></li>
						</ul>
					</div>
				</nav>

				<ul class="sidenav" id="mobile-demo">
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/login'>Login</Link></li>
					<li><Link to='/projects'>Projects</Link></li>
				</ul>
				
			</>

		);
	}
}

export default Nav;