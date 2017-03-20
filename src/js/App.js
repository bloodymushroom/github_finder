// @flow
import React, { Component } from 'react'

// mobx
import { observer } from 'mobx-react'
import store from './mobx/Store.js'

// views
import Navbar from './components/Navbar'
import UserView from './views/UserView'
import ComparisonView from './views/ComparisonView'
import AuthModal from './components/AuthModal'

// static components
import Searchbar from './components/Searchbar'

@observer
class App extends Component {

	constructor(props: Props) {
		super(props)

		this.state = {
			count: 0,
			view: 'user'
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

	handleClick(e) {
		e.preventDefault();

		this.setState({
			view: e.target.name
		})
	}

	componentDidMount() {
		setInterval(this.incrementCount.bind(this), 500)
	}

	render() {
		return (
			<div style={{height: '100%'}}>
				<Navbar />
				<AuthModal />
				<Searchbar />
				{store.currentView === 'user' && <UserView />}
				{store.currentView === 'compare' && <ComparisonView />}
			</div>
		)
	}
}

export default App;