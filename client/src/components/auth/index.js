import { API } from "../../config";

/**SIGN UP */
// Function to post data to Db
export const signUpUser = (user) => {
	//return is used to turn fetch to promise or make promise available
	return fetch(`${API}/users/signup`, {
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

/**SIGN IN */
export const signInUser = (user) => {
	//return is used to turn fetch to promise or make promise available
	return fetch(`${API}/users/signin`, {
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

/**SAVE SIGNIN USER TO LOCAL STORAGE */
// STEPS
// 1. Get the token coming from the user signin
// 2. store the token in local storage in JSON format wt key 'jwt'
// Execute next middleware with next()
export const authenticateSignInUser = (userTokenData, next) => {
	// localStorage is a pty of the window object
	if (typeof window !== "undefined") {
		//check to see that window object is available
		localStorage.setItem("jwt", JSON.stringify(userTokenData)); //convert the Js obj to Json strings,localStorage stores only JSON
		next();
	}
};

/**SIGN OUT USER */
// To achieve this, you clear the signin user token frm localStorage
export const signOutUser = (next) => {
	if (typeof window !== "undefined") {
		//check to see that window object is available
		localStorage.removeItem("jwt");
		next();
		// Make req to Backend to signout user
		return fetch(`${API}/users/signout`, {
			method: "GET",
		})
			.then((response) => {
				console.log("out", response);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

/**SHOW/HIDE SIGNIN SIGNOUT CONDITIONALLY */
// You can extract user info frm the signedin user such as name, email etc from the token
export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		//check if 'jwt is present in localStorage or if a user in signedin after signup
		return JSON.parse(localStorage.getItem("jwt")); //use the token to authenticate user
	} else {
		return false; //esle do nothing
	}
};
