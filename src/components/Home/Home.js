import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

	render() {

		return (

			<div>
			
			
			
			
				<div class="section no-pad-bot" id="index-banner">
					<div class="container">
						<br /><br />
						<h1 class="header center orange-text">
							Mock API Server
						</h1>
						<div class="row center">
							<h5 class="header col s12 light">
								Create Your Own Mock API's							</h5>
						</div>
						<div class="row center">
							<Link to='/login'>
								<a href="#!" class="btn-large waves-effect waves-light orange">
									<span className='white-text'>Login</span>
								</a>
							</Link>
						</div>
						<br /><br />
					</div>
				</div>


				<div class="container">
					<div class="section">

						<div class="row">
							<div class="col s12 m4">
								<div class="icon-block">
									<h2 class="center light-blue-text">
										<i class="material-icons">flash_on</i>
									</h2>
									<h5 class="center">
										Speeds up development
									</h5>

									<p class="light">
									There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
									</p>
								</div>
							</div>

							<div class="col s12 m4">
								<div class="icon-block">
									<h2 class="center light-blue-text">
										<i class="material-icons">group</i>
									</h2>
									<h5 class="center">
										User Experience Focused
									</h5>

									<p class="light">
									There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
									</p>
								</div>
							</div>

							<div class="col s12 m4">
								<div class="icon-block">
									<h2 class="center light-blue-text">
										<i class="material-icons">settings</i>
									</h2>
									<h5 class="center">
										Easy to work with
									</h5>

									<p class="light">
									There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
									</p>
								</div>
							</div>
						</div>

					</div>
					<br /><br />
				</div>
				
				
			
			</div>

		);
	}
}


export default HomePage;