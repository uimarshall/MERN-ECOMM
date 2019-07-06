import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const DisplayFeaturedProducts = ({ product }) => {
	return (
		<div col-md-4 mb-3>
			<div className="card">
				<div className="card-header">{product.name}</div>
				<div className="card-body">
					<ShowImage item={product} url="product" />
					<p>{product.description}</p>
					<p>${product.description}</p>
					<Link to="/">
						<button className="btn btn-outline-primary mr-2">
							View Products
						</button>
					</Link>
					<button className="btn btn-outline-info my-2 mx-2">
						Add To Cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default DisplayFeaturedProducts;
