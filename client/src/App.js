import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					{/* <div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</div> */}
					<Footer />
				</div>
			</Router>
		</div>
	);
}

export default App;
