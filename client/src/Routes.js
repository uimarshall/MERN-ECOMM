import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Dashboard from "./components/user/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./App.css";

const Routes = () => {
	return (
		<Router>
			<div className="App">
				<Navbar />

				<div className="container">
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/signup" component={SignUp} />
						<PrivateRoute exact path="/user/dashboard" component={Dashboard} />
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
};

export default Routes;
