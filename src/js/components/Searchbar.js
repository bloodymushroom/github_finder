import React, { Component } from 'react'

// state
import store, { user1 } from '../mobx/Store'
// import { user1 } from '../mobx/Store'

const icons = {
  searchIcon: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-128.png'
}

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      username: ''
    }

    console.log('user1: ', user1)
  }

  submitSearch(e) {
    e.preventDefault();
    user1.findRepos(this.state.username)
    console.log('searched for ', this.state.username)
  }

  inputHandler(e) {
    this.setState({
      username: e.target.value
    })

    console.log('search contents: ', this.state.username)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch.bind(this)} id='search'>
          <label>
            Search by username:
            <input type='search' value={this.state.username} name='searchTerm' onChange={this.inputHandler.bind(this)} placeholder='e.g. "bloodymushroom"'/>
          </label>
          <button type='submit'><img src={icons.searchIcon} /></button>
        </form>
      </div>
    )
  }
}

export default Searchbar;