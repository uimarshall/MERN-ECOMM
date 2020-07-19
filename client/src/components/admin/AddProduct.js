import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "../admin/AdminApi";

const AddProduct = () => {
	// destructure userFound and token from localstorage
	const { userFound, token } = isAuthenticated();
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		photo: "",
		loading: false,
		error: "",
		createdProduct: "",
		redirectToProfile: false,
		formData: "",
	});
	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		loading,
		error,
		createdProduct,
		redirectToProfile,
		formData,
	} = values;

	// Load categories and set form data
	const init = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					categories: data.data,
					formData: new FormData(),
				});
			}
		});
	};

	// Once the component loads, we update the form data
	useEffect(() => {
		init();
	}, []);
	const handleChange = (name) => (e) => {
		const value = name === "photo" ? e.target.file : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: "", loading: true });
		// When we click submit, loading is false but when we submit it turns  to false
		createProduct(userFound._id, token, formData).then((data) => {
			if (data.error) {
				console.log(data.error);
				setValues({ ...values, error: data.error, loading: false }); //if 'error',populate the error in the state with 'data.error'
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					price: "",
					quantity: "",
					photo: "",
					loading: false,
					createdProduct: data.name,
				});
			}
		});
	};

	// Add Product
	const addProductForm = () => (
		<form className="mb-3" onSubmit={handleSubmit}>
			<h4>Post Photo</h4>
			<div className="form-group">
				<label htmlFor="photo" className="btn btn-success">
					<input
						type="file"
						name="photo"
						accept="image/*"
						onChange={handleChange("photo")}
					/>
				</label>
			</div>
			<div class="form-group">
				<label htmlFor="name" className="text-muted">
					Name
				</label>
				<input
					type="text"
					className="form-control"
					onChange={handleChange("name")}
					value={name}
				/>
			</div>
			<div class="form-group">
				<label htmlFor="name" className="text-muted">
					Description
				</label>
				<textarea
					className="form-control"
					onChange={handleChange("description")}
					value={description}
				/>
			</div>
			<div class="form-group">
				<label htmlFor="name" className="text-muted">
					Price
				</label>
				<input
					type="number"
					className="form-control"
					onChange={handleChange("price")}
					value={price}
				/>
			</div>
			<div class="form-group">
				<label htmlFor="name" className="text-muted">
					Category
				</label>
				<select className="form-control" onChange={handleChange("category")}>
					<option>Please select</option>
					{/* {console.log(categories)} */}
					{categories &&
						categories.map((cat) => (
							<option key={cat._id} value={cat._id}>
								{cat.name}
							</option>
						))}
				</select>
			</div>
			<div class="form-group">
				<label htmlFor="name" className="text-muted">
					Shipping
				</label>
				<select className="form-control" onChange={handleChange("shipping")}>
					<option>Please select</option>
					<option value="0">No</option>
					<option value="1">Yes</option>
				</select>
			</div>
			<div class="form-group">
				<label htmlFor="name" className="text-muted">
					Quantity
				</label>

				<input
					type="number"
					className="form-control"
					onChange={handleChange("quantity")}
					value={quantity}
				/>
			</div>
			<button className="btn btn-outline-warning">Create Product</button>
		</form>
	);

	const showError = () => {
		if (error) {
			return (
				<div
					className="alert alert-danger"
					style={{ display: error ? "" : "none" }}>
					{error}
				</div>
			);
		}
	};
	const showSuccess = () => {
		return (
			<div
				className="alert alert-info"
				style={{ display: createdProduct ? "" : "none" }}>
				<h2>{`${createdProduct} is created!`}</h2>
			</div>
		);
	};
	const showLoading = () =>
		loading && (
			<div
				className="alert alert-success"
				style={{ display: createdProduct ? "" : "none" }}>
				<h2>Loading...</h2>
			</div>
		);

	return (
		<Layout
			title="Add a new product"
			description={`Hi ${userFound.name}, You can add a new product`}
			className="">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{showSuccess()}
					{showError()}
					{addProductForm()}
				</div>
			</div>
		</Layout>
	);
};

export default AddProduct;
