import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import './random-planet.css';

export default class RandomPlanet extends Component {
	// Соединяемся с сервером по API
	swapiService = new SwapiService();

	// Состояние по умолчанию
	state = {
		planet: {},
		loading: true
	};

	// Логика. Погружаем планету
	// constructor() {
	// 	super(); 
	// }

	// Как только конструктор создан, выполняем. Компонент подключен. 
	componentDidMount() {
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	/* Функция вызывается после тог окак компонент получил новое свойство или обновился state
	componentDidUpdate(prevProps, prevState) {
		
	} */

	/* Функция вызывается после удаления компонента
	componentWillUnmount() {
		
	} */

	// Логика. Обработка ошибки
	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		});
	};

	// Загружаем планету и меняем состояние
	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false,
			error: false
		});
	};

	// Подгружаем рандомную планету
	updatePlanet = () => {
		const id = Math.floor(Math.random()*19) + 3;
		this.swapiService
		.getPlanet(id)
		.then(this.onPlanetLoaded)
		.catch(this.onError);
	};




	////////////////////////////////////////////// RENDER ///////////////////////////////////////
	render() {
		const { planet, loading, error } = this.state;
		const hasData = !(loading || error);

		const errorMessage = error ? <ErrorIndicator /> : null;
		const spinner = loading && !error ? <Spinner /> : null;
		const content = hasData ? <PlanetView planet={planet} /> : null;

		return (
			<div className="random-planet jumbotron rounded">
			{errorMessage}
			{spinner}
			{content}
			</div>
		);
	}
}





const PlanetView = ({planet}) => {
	const { id, name, population, rotationPeriod, diameter } = planet;

	return (
		<React.Fragment>

		<img 
		src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
		<div>
			<h4>{name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">
					<span className="term">Population</span>
					<span>{population}</span>
				</li>
				<li className="list-group-item">
					<span className="term">Rotation period</span>
					<span>{rotationPeriod}</span>
				</li>
				<li className="list-group-item">
					<span className="term">Diametr</span>
					<span>{diameter}</span>
				</li>
			</ul>
		</div>

		</ React.Fragment>
		);
};

