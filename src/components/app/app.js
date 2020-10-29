import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator/error-indicator';

import './app.css';

export default class App extends Component {

	state = {
		showRandomPlanet: true,
		selectedPerson: 7,
		hasError: false
	};


	// Обработка выбора персонажа
	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		});
	};

	// Скрываем блок рандомной планеты
	toggleRandomPlanet = () => {

		if (this.state.showRandomPlanet) {
			this.setState({
				showRandomPlanet: false
			});
			alert(1);
		}

		if(this.state.showRandomPlanet == false) {
			this.setState({
				showRandomPlanet: true
			});
			alert(2);
		}
	};
    
    // Перехватываем ошибку
    componentDidCatch() {
    	console.log('ComponentDidCatch');
    	this.setState({hasError: true});
    }
    
    ////////////////////////////////////////////// RENDER ///////////////////////////////////////
	render(){

		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return (

			<div>
				<Header />
				<RandomPlanet />

				<button
					className="toggle-planet btn btn-warning btn-lg"
					onClick={this.toggleRandomPlanet}>
					Toggle Random Planet
				</button>

				<div className="row mb2">
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
						<ItemList onItemSelected={this.onPersonSelected} />
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
						<PersonDetails personId={this.state.selectedPerson} />
					</div>
				</div>

			</div>
		);
	}
}


