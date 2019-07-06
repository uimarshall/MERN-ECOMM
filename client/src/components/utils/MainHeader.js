import React from "react";
import fruits from "../../img/fruits.jpg";
import babystoys from "../../img/babystoys.jpg";
import menwears from "../../img/menwears.jpg";

const MainHeader = () => {
	return (
		<React.Fragment>
			<div class="row mb-5">
				<aside class="col-md-4">
					<div class="btn-group-vertical btn-block">
						<button type="button" class="btn btn-outline-secondary btn-lg">
							Groceries
						</button>
						<button type="button" class="btn btn-outline-secondary">
							<span class="caret" />
							Electronics
						</button>
						<button type="button" class="btn btn-outline-secondary">
							Computers
						</button>
						<button type="button" class="btn btn-outline-secondary">
							Machines
						</button>
						<button type="button" class="btn btn-outline-secondary">
							Stationeries
						</button>
						<button type="button" class="btn btn-outline-secondary">
							Sportings
						</button>
						<button type="button" class="btn btn-outline-secondary">
							Bata
						</button>
					</div>
				</aside>
				<header class="col-md-8 mt-0">
					<div
						id="carouselExampleIndicators"
						class="carousel slide"
						data-ride="carousel"
					>
						<ol class="carousel-indicators">
							<li
								data-target="#carouselExampleIndicators"
								data-slide-to="0"
								class="active"
							/>
							<li data-target="#carouselExampleIndicators" data-slide-to="1" />
							<li data-target="#carouselExampleIndicators" data-slide-to="2" />
						</ol>
						<div class="carousel-inner">
							<div class="carousel-item active">
								<img class="d-block w-100" src={fruits} alt="First slide" />
							</div>
							<div class="carousel-item">
								<img class="d-block w-100" src={babystoys} alt="Second slide" />
							</div>
							<div class="carousel-item">
								<img class="d-block w-100" src={menwears} alt="Third slide" />
							</div>
						</div>
						<a
							class="carousel-control-prev"
							href="#carouselExampleIndicators"
							role="button"
							data-slide="prev"
						>
							<span class="carousel-control-prev-icon" aria-hidden="true" />
							<span class="sr-only">Previous</span>
						</a>
						<a
							class="carousel-control-next"
							href="#carouselExampleIndicators"
							role="button"
							data-slide="next"
						>
							<span class="carousel-control-next-icon" aria-hidden="true" />
							<span class="sr-only">Next</span>
						</a>
					</div>
				</header>
			</div>
		</React.Fragment>
	);
};

export default MainHeader;
