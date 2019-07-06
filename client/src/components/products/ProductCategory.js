import React from "react";
import { API } from "../../config";

const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET"
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		});
};

export default ProductCategory;
