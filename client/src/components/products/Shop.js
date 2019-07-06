import React, { useState, useEffect } from "react";
import DisplayFeaturedProducts from "./DisplayFeaturedProducts";
import React, { getCategories } from "./ProductCategory";

const [categories, setCategories] = useState([]);
const [error, setError] = useState(false);

const init = () => {
	getCategories().then(data => {
		if (data.error) {
			setError(data.error);
		} else {
			setCategories(data);
		}
	});
};

useEffect(() => {
	init();
}, []);

const Shop = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-4">...</div>
				<div className="col-8">...</div>
			</div>
		</div>
	);
};

export default Shop;
