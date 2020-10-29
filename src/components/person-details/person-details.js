import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import './person-details.css';



export default class PersonalDetails extends Component {
	swapiService = new SwapiService();

	state = {
		person: null
	};

	// Устанавливаем персонажа как только компонент подгрузился
	componentDidMount() {
		this.updatePerson();
	}

	// Меняем персонажа как только id изменился
	componentDidUpdate(prevProps) {

		// Новый персонаж не равен предидущему
		if (this.props.personId != prevProps.personId) {
			this.updatePerson();
		}
	}

	// Обновляем данные о персонаже
	updatePerson() {
		const {personId} = this.props;

		if (!personId) {
			return;
		}

		this.swapiService
			.getPersone(personId)
			.then((person) => {
				this.setState({person});
			});
	}

	render() {

		if(!this.state.person) {
			return <span>Select a person from a list</span>;	
		}

		const {id, name, gender, birthYear, eyeColor} = this.state.person;

		return(
			<div className="person-details card">
				<img className="person-image"
					 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} 
					 alt="charter"/>

				<div className="card-body">
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group list-group-item">
							<span className="term">Gender</span>
							<span>{gender}</span>
						</li>
						<li className="list-group list-group-item">
							<span className="term">Birth year</span>
							<span>{birthYear}</span>
						</li>
						<li className="list-group list-group-item">
							<span className="term">Eye Color</span>
							<span>{eyeColor}</span>
						</li>
					</ul>
				</div>
			</div>
			
		);
	}
}
