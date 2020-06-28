import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import Dashboard from "./components/user/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminDashboard from "./components/user/AdminDashboard";
import AdminPrivateRoute from "./components/auth/AdminPrivateRoute";

import AddCategory from "./components/admin/AddCategory";
import AddProduct from "./components/admin/AddProduct";

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
						<AdminPrivateRoute
							exact
							path="/admin/dashboard"
							component={AdminDashboard}
						/>
						<AdminPrivateRoute
							exact
							path="/create/category"
							component={AddCategory}
						/>
						<AdminPrivateRoute
							exact
							path="/create/product"
							component={AddProduct}
						/>
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
};

export default Routes;
