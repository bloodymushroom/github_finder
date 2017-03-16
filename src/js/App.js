// @flow
import React, { Component } from 'react'

// mobx
import { observer } from 'mobx-react'
import store from './mobx/Store.js'

// views
import UserView from './views/UserView'

// static components
import Searchbar from './components/Searchbar'

@observer
class App extends Component {

	constructor(props: Props) {
		super(props)

		this.state = {
			count: 0
		}
	}

	incrementCount() {
		this.setState({
			count: ++this.state.count
		})
	}

	incrementNumber() {
		store.incrementNumber();
	}

	componentDidMount() {
		setInterval(this.incrementCount.bind(this), 500)
	}

	render() {
		return (
			<div>
				<Searchbar />
				<UserView />
			</div>
		)
	}
}

export default App;