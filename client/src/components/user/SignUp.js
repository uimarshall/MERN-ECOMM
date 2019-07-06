import React, { useState } from "react";
import { API } from "../../config";

const SignUp = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false
	});
	const { name, email, password, error, success } = values;

	// Anytime there is an event in the form, we hv to grab d change and update the state
	// handleChange is a higher order fn, which is a fn returning another fn
	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const signup = user => {
		fetch(`${API}/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			// Convert the obj sent from handleSubmit to json string
			body: JSON.stringify(user)
		})
			.then(res => {
				return res.json();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleSubmit = e => {
		e.preventDefault();
		signup({ name: name, email: email, password: password });
	};

	const signUpForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted" htmlFor="">
					Name
				</label>
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
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
				/>
			</div>
			<button onSubmit={handleSubmit} type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);

	return (
		<div className="container col-md-8 offset-md-2">
			<h3>Signup</h3>
			{signUpForm()}
			{JSON.stringify(values)}
		</div>
	);
};

export default SignUp;
