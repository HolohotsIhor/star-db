import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import './people-page.css';
import SwapiService from '../../services/swapi-service';


const Row = ({left, right}) => {
	return (
		<div className="row mb2">
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
				{left}
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
				{right}
			</div>
		</div>
	);
};


export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson: 3,
		hasError: false
	}

	// Отлавливаем ошибку
	componentDidCatch(error, info) {
		debugger;
		
		this.setState({
			hasError: true
		});
	}

	// Обработка выбора персонажа
	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id
		});
	};

	render() {
		// проверяем наличе ошибки в компоненте
		if(this.state.hasError) {
			return <ErrorIndicator />;
		}

		const itemList = (
			<ItemList 
				onItemSelected={this.onPersonSelected} 
				getData={this.swapiService.getAllPeople} 
				renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`} />
		);

		const personDetails = (
			<PersonDetails personId={this.state.selectedPerson} />
		);

		return (
			<Row left={itemList} right={personDetails} />
		);
	}

}
