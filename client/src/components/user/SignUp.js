import React, { useState } from "react";
import { API } from "../../config";
import Layout from "../layout/Layout";

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
		error: "",
		success: false,
	});

	// Anytime there is an event in the form, we hv to grab d change and update the state
	// handleChange is a higher order fn, which is a fn returning another fn
	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	// Function to post data to Db
	const signUpUser = (user) => {
		fetch(`${API}/users/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			// Convert the obj sent from handleSubmit to json string
			// Only JSON str can be sent to the backend
			body: JSON.stringify(user),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const { name, email, password, error, success } = values;
	const handleSubmit = (e) => {
		e.preventDefault();
		// Frm d User Model, a user must hv name, email,password,set these fields to what is
		// coming the state(values) as destructured above
		// Take the form entries stored in d state and submit(click submit) to backend using 'signUp() function'
		let newUser = { name: name, email: email, password: password };
		// Javascript object being received as newUser
		signUpUser(newUser).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
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
				{signUpForm()}
				{JSON.stringify(values)}
			</div>
			<div>{API}</div>
		</Layout>
	);
};

export default SignUp;
