import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

import './item-list.css';

export default class ItemList extends Component {

	swapiService = new SwapiService();

	state = {
		peopleList: null
	};

	// Как только компонент подключен
	componentDidMount() {
		this.swapiService
		.getAllPeople()
		.then((peopleList) => {
			this.setState({
				peopleList
			});
		});
	}

	// Логика обработки ошибки
	onError = (err) => {
		this.setState = ({
			error: false
		});
	};

	// Рендер елментов списка 
	renderItems(arr) {
		return arr.map(({id, name}) => {
			return(
				<li className="list-group-item"
				    key={id}
				    onClick={() => this.props.onItemSelected(id)}>
					{name}
				</li>
			);
		});
	}

	////////////////////////////////////////////// RENDER ///////////////////////////////////////
	render() { 
		const { peopleList } = this.state;

		if (!peopleList) {
			return <Spinner />
		}

		const items = this.renderItems(peopleList);

		return(
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}