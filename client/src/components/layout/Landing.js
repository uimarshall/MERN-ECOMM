import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import MainHeader from "../utils/MainHeader";

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
					<div className="container">
						<MainHeader />
						{/* <Home /> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
