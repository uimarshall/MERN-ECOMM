import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link, Redirect } from "react-router-dom";
import { signInUser, authenticateSignInUser, isAuthenticated } from "../auth";

const SignIn = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		redirectToReferrer: false,
	});

	// Anytime there is an event in the form, we hv to grab d change and update the state
	// handleChange is a higher order fn, which is a fn returning another fn
	const { email, password, error, loading, redirectToReferrer } = values;
	const { userFound } = isAuthenticated();
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: false, loading: true });
		// Frm d User Model, a user must hv name, email,password,set these fields to what is
		// coming the state(values) as destructured above
		// Take the form entries stored in d state and submit(click submit) to backend using 'signUp() function'
		let newUser = { email: email, password: password };
		// Javascript object being received as newUser
		signInUser(newUser).then((data) => {
			if (data.message) {
				console.log(data.message);
				setValues({ ...values, error: data.message, loading: false }); //if 'error',populate the error in the state with 'data.error'
			} else {
				authenticateSignInUser(data, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	// Curly braces attract 'return' statement

	const showError = () => {
		console.log(error);

		return (
			//if no error, dont display the div, else display the error
			<div
				className="alert alert-danger"
				style={{ display: error ? "" : "none" }}>
				{error}
			</div>
		);
	};

	// Prenthesis wtout curly braces does not attarct 'return'
	const showLoading = () =>
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (userFound && userFound.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
	};

	const signInForm = () => (
		<form className="mb-2" onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted" htmlFor="">
					Email
				</label>
				<input
					onChange={handleChange("email")}
					type="email"
					className="form-control"
					value={email}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted" htmlFor="">
					Password
				</label>
				<input
					onChange={handleChange("password")}
					type="password"
					className="form-control"
					value={password}
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	return (
		<Layout
			className="mb-5"
			title="Welcome here our esteem customer"
			description="We are at your service to give you the best experience you can get!">
			<div className="container col-md-8 offset-md-2">
				<h3>Signin</h3>
				{showLoading()}
				{showError()}
				{signInForm()}
				{redirectUser()}
				{JSON.stringify(values)}
			</div>
		</Layout>
	);
};

export default SignIn;
