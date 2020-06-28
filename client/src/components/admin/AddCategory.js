import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "../admin/AdminApi";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	// destructure userFound and token from localstorage
	const { userFound, token } = isAuthenticated();

	const handleChange = (e) => {
		setError("");
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		// Make request to Api to create Category
		createCategory(userFound._id, token, { name }).then((data) => {
			console.log(data);
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setSuccess(true);
			}
		});
	};

	const newCategoryForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="">Category</label>
					<input
						type="text"
						className="form-control"
						onChange={handleChange}
						placeholder="Add Category"
						value={name}
						autoFocus
						required
					/>
				</div>
				<button className="btn btn-outline-success">Create Category</button>
			</form>
		);
	};

	const showSuccess = () => {
		if (success) {
			return <h3 className="text-success">{name} is created</h3>;
		}
	};
	const showError = () => {
		if (error) {
			return (
				<h3 className="text-danger">
					<strong>{name}</strong> category should be unique,already existed!
				</h3>
			);
		}
	};
	return (
		<Layout
			title="Add a new category"
			description={`Hi ${userFound.name}, You can add a new category`}
			className="">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showSuccess()}
					{showError()}
					{newCategoryForm()}
				</div>
			</div>
		</Layout>
	);
};

export default AddCategory;
