import { API } from "../../config";

/**CREATE CATEGORY */
// Function to post data to Db
export const createCategory = (userId, token, category) => {
	//return is used to turn fetch to promise or make promise available
	return fetch(`${API}/categories/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `${token}`,
		},
		// Convert the obj sent from handleSubmit to json string
		// Only JSON str can be sent to the backend
		body: JSON.stringify(category),
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
};
/**CREATE PRODUCT */
// Function to post data to Db
export const createProduct = (userId, token, product) => {
	//return is used to turn fetch to promise or make promise available
	return fetch(`${API}/products/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json", //we will send form data
			Authorization: `${token}`,
		},
		// Convert the obj sent from handleSubmit to json string
		// Only JSON str can be sent to the backend
		body: product,
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
};
