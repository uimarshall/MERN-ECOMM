import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import { signUpUser } from "../auth";

// ==========================TODO'S==================================
/** 1. Declare the state variable as 'values'
 * 2. Update the state with entries coming from the form using 'setValue'
 * Take the values stored in the state and send it to backend using d 'signUp' fn
 */

const SignUp = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: [],
		success: false,
	});

	// Anytime there is an event in the form, we hv to grab d change and update the state
	// handleChange is a higher order fn, which is a fn returning another fn
	const { name, email, password, error, success } = values;
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, error: false });
		// Frm d User Model, a user must hv name, email,password,set these fields to what is
		// coming the state(values) as destructured above
		// Take the form entries stored in d state and submit(click submit) to backend using 'signUp() function'
		let newUser = { name: name, email: email, password: password };
		// Javascript object being received as newUser
		signUpUser(newUser).then((data) => {
			if (data.errors) {
				// console.log(data.errors);
				setValues({ ...values, error: data.errors, success: false }); //if 'error',populate the error in the state with 'data.error'
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					error: "",
					success: true,
				});
			}
		});
	};

	// Curly braces attract 'return' statement

	const showError = () => {
		console.log(error);
		return Object.keys(error).map((key, index) => {
			console.log(error[key]);
			return (
				//if no error, dont display the div, else display the error
				<div
					key={index}
					className="alert alert-danger"
					style={{ display: key ? "" : "none" }}>
					{error[key].name}
					{error[key].email}
					{error[key].password}
				</div>
			);
		});
	};

	// Prenthesis wtout curly braces does not attarct 'return'
	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: success ? "" : "none" }}>
			Account Created Successfully, Please <Link to="/signin">Sign In</Link>.
		</div>
	);

	const signUpForm = () => (
		<form className="mb-2" onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="text-muted" htmlFor="">
					Name
				</label>
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>
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
				<h3>Signup</h3>
				{showSuccess()}
				{showError()}
				{signUpForm()}
				{JSON.stringify(values)}
			</div>
		</Layout>
	);
};

export default SignUp;
