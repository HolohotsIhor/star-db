// Api-клиент
export default class SwapiService {

	_apiBase = 'https://swapi.dev/api';

	async getResource(url) {

		// Получаем ответ сервера
		const res = await fetch(`${this._apiBase}${url}`);

		// Проверка на ошибки
		if(!res.ok) {
			throw new Error(`Could not fetch ${url}`+
				`, received ${res.status}`)
		}

		// Возвращаем тело запроса
		return await res.json();
	}

	// Полуем все данные
	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results.map(this._transformPerson);
	}

	// Полуем конкретный id
	async getPersone(id) {
		const person = await this.getResource(`/people/${id}/`);
		return this._transformPerson(person);
	}

	// Полуем все планету
	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results.map(this._transformPlanet);
	}

	// Полуем планету по id
	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transformPlanet(planet);
	}

	// Полуем все космические корабли
	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformStarship);
	}

	// Полуем конкретный корабль id
	async getStarship(id) {
		const starship = this.getResource(`/starships/${id}/`);
		return this._transformStarship(starship);
	}

	// Получаем id
	_extractId(item) {
		const idRegExp =/\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];
	}

	// Принимает планету от api => возвращает объект
	_transformPlanet = (planet) => {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter
		}
	}

	// Принимает корабль от api => возвращает объект
	_transformStarship = (starship) => {
		return {
			id: this._extractId(starship),
			name: starship.name,
			model: starship.model,
			manufacturer: starship.manufacturer,
			costInCredits: starship.costInCredits,
			length: starship.length,
			crew: starship.crew,
			passengers: starship.passengers,
			cargoCapacity: starship.cargoCapacity
		}
	}

	// Принимает порсонажа от api => возвращает объект
	_transformPerson = (person) => {
		return {
			id: this._extractId(person),
			name: person.name,
			gender: person.gender,
			birthYear: person.birthYear,
			eyeColor: person.eyeColor
		}
	}
}

const swapi = new SwapiService();

// swapi.getPersone(3).then((p) => {
// 	console.log(p.name);
// });
