import React, { Component } from 'react';
import Spinner from '../spinner/spinner';
// import ErrorIndicator from '../error-indicator/error-indicator';

import './item-list.css';

export default class ItemList extends Component {

	state = {
		itemList: null
	};

	// Как только компонент подключен
	componentDidMount() {

		const { getData } = this.props;

		getData()
			.then((itemList) => {
			this.setState({
				itemList
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
		return arr.map((item) => {
			const { id } = item;
			const label = this.props.renderItem(item);

			return(
				<li className="list-group-item"
				    key={id}
				    onClick={() => this.props.onItemSelected(id)}>
					{label}
				</li>
			);
		});
	}

	////////////////////////////////////////////// RENDER ///////////////////////////////////////
	render() { 
		const { itemList } = this.state;

		if (!itemList) {
			return <Spinner />
		}

		const items = this.renderItems(itemList);

		return(
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}