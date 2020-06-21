import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../auth";

const Dashboard = () => {
	const {
		userFound: { _id, name, email, role },
	} = isAuthenticated();

	const userLinks = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">User info</h3>
				<ul class="list-group">
					<li class="list-group-item">
						<Link className="nav-link" to="/cart">
							My Cart
						</Link>
					</li>
					<li class="list-group-item">
						<Link className="nav-link" to="/profile/update">
							Update Profile
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const userInfo = () => (
		<div className="card mb-5">
			<h3 className="card-header">User info</h3>
			<ul class="list-group">
				<li class="list-group-item">{name}</li>
				<li class="list-group-item">{email}</li>
				<li class="list-group-item">
					{role === 1 ? "Admin" : "Registered User"}
				</li>
			</ul>
		</div>
	);

	const purchaseHistory = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">Purchase history</h3>
				<ul class="list-group">
					<li class="list-group-item">history</li>
					<li class="list-group-item disabled">role</li>
				</ul>
			</div>
		);
	};
	return (
		<Layout
			title="Dasboard"
			description={`Hi ${name}!`}
			className="container-fluid">
			<div className="row">
				<div className="col-md-3">{userLinks()}</div>
				<div className="col-md-9">
					{userInfo()}
					{purchaseHistory()}
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
