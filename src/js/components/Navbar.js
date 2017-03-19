import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs';
import store from '../mobx/Store'

// import UserView from '../views/'

var git = 'https://cdn0.iconfinder.com/data/icons/social-circle/595/github-128.png'

class Navbar extends Component {
  constructor() {
    super()

    this.state = {
      value: 'user'
    }
  }

  handleChange(value) {
    this.setState({
      value: value
    })
    store.currentView = value;
  }

  toolBar() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      >
        <Tab label='Find User' value='user' />
        <Tab label='Compare Users' value='compare' />
      </Tabs>
    )
  }

  render() {
    return(
      <AppBar
        style={{padding: '0 100px 0 100px'}}
        title="GithubFinder"
        iconElementLeft={<img style={{height: '48px', width: 'auto'}} src={git} />}
        iconElementRight={this.toolBar()}
        iconStyleRight={{width: '50%'}}
      />
    )
  }
}

export default Navbar;