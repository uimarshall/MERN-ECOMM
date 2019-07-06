import React, { useState } from "react";
import { API } from "../../config";

export const getProducts = sortBy => {
	fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
		method: "GET"
	})
		.then(res => {
			return res.json();
		})
		.catch(err => {
			console.log(err);
		});
};
