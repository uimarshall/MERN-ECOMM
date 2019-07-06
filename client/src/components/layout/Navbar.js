import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#ff8800" };
	} else {
		return { color: "#ffffff" };
	}
};

// withRouter from react-router-dom opens up props
// destructure history from props and pass it to the Navbar comp
const Navbar = ({ history }) => {
	return (
		<div>
			<nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						BoomPlace
					</Link>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/")}
									to="/"
								>
									Home <span className="sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/signin")}
									to="signin"
								>
									Signin
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/signup")}
									to="signup"
								>
									Signup
								</Link>
							</li>
						</ul>
					</div>
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
								<Link
									className="nav-link"
									style={isActive(history, "/help")}
									to="/help"
								>
									Help?
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/account")}
									to="/account"
								>
									Account
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, "/cart")}
									to="/cart"
								>
									Cart
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default withRouter(Navbar);
