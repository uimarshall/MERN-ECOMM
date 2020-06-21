import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
	const {
		userFound: { _id, name, email, role },
	} = isAuthenticated();

	const adminLinks = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">Admin Links</h3>
				<ul class="list-group">
					<li class="list-group-item">
						<Link className="nav-link" to="/create/category">
							Create Category
						</Link>
					</li>
					<li class="list-group-item">
						<Link className="nav-link" to="/create/product">
							Create Product
						</Link>
					</li>
				</ul>
			</div>
		);
	};

	const adminInfo = () => (
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

	return (
		<Layout
			title="Dashboard"
			description={`Hi ${name}, You're signed in as an Admin!`}
			className="container-fluid">
			<div className="row">
				<div className="col-md-3">{adminLinks()}</div>
				<div className="col-md-9">{adminInfo()}</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;
