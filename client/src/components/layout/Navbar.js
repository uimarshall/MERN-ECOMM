import React, { Component } from "react";

import { Link } from "react-router-dom";

class Navbar extends Component {
	handleLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
					<div className="container">
						<Link className="navbar-brand" to="/">
							BoomPlace
						</Link>
						<div className="flex-grow-1 d-flex">
							<form className="search-box form-inline my-2 my-lg-0">
								<input
									class="form-control mr-sm-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
								/>
							</form>
						</div>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#mobile-nav"
						>
							<span className="navbar-toggler-icon" />
						</button>

						<div className="collapse navbar-collapse" id="mobile-nav">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/help">
										Help?
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/account">
										Account
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/cart">
										Cart
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
