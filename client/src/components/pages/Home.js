import React, { useState, useEffect } from "react";
import { getProducts } from "../products/FeatureProducts";
import DisplayFeaturedProducts from "../products/DisplayFeaturedProducts";

// import PropTypes from "prop-types";

const Home = () => {
	// Create a state that will hold the products by arrival and sales-featured Products
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	// Function to load productsBySell
	const loadProductsBySell = () => {
		// getProducts takes in the param 'sold'=sortBy
		// getProducts("sold").then(data => {
		// 	if (data.error) {
		// 		setError(data.error);
		// 	} else {
		// 		// Set state = data
		// 		setProductsBySell(data);
		// 	}
		// });
	};

	// Function to load productsByArrival
	const loadProductsByArrival = () => {
		// getProducts takes in the param 'sold'=sortBy
		// 	getProducts("createdAt").then(data => {
		// 		if (data.error) {
		// 			setError(data.error);
		// 		} else {
		// 			// Set state = data
		// 			setProductsByArrival(data);
		// 		}
		// 	});
	};

	// The fns will run once the Component mounts
	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, []);
	return (
		<div className="container">
			<h2 className="mb-4">New Arrivals</h2>
			<div className="row">
				{/* Map each product loaded by arrival and display it in DisplayFeaturedProducts */}
				{/* pass the 'product' as props to DisplayFeaturedProducts */}
				{productsByArrival.map((product, i) => (
					<DisplayFeaturedProducts key={i} product={product} />
				))}
			</div>

			<h2 className="mb-4">Best Sellers</h2>
			<div className="row">
				{/* Map each product loaded by sell and display it in DisplayFeaturedProducts */}
				{/* pass the 'product' as props to DisplayFeaturedProducts */}
				{productsBySell.map((product, i) => (
					<DisplayFeaturedProducts key={i} product={product} />
				))}
			</div>
		</div>
	);
};

export default Home;
