import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar';

import classNames from '../styles/style.css'

// state
import store, { user1, user2 } from '../mobx/Store'
import { observer } from 'mobx-react'
// import { user1 } from '../mobx/Store'

const icons = {
  searchIcon: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-128.png'
}

@observer
class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      error: null
    }

  }

  submitSearch(e) {
    e.preventDefault();
    store.searchedUser = null;

    if (this.state.username.length === 0 || this.state.username.split(' ').join('').length === 0 ) {
      this.setState({
        error: 'Username must not be blank.'
      })

      return;
    }

    if (!store.activeUser || store.activeUser === 'User 1') {
      user1.findRepos(this.state.username)
    } else {
      user2.findRepos(this.state.username)
    }

    store.hasBeenSearched(this.state.username)

    store.activeUser = null;

    // setTimeout(() => {
    //   this.setState({
    //     username: ''
    //   })
    // }, 100)
  }

  inputHandler(e) {
    this.setState({
      username: e.target.value,
      error: null
    })

  }

  render() {
    return (
    <div style={{textAlign: 'center'}}>
      <form onSubmit={this.submitSearch.bind(this)} id='search'>
        <div className={classNames.searchContainer}>
          <label>
            <span style={{marginRight: '20px'}}>Search by username:</span>
            <input id='searchInput' className={classNames.searchInput} type='search' value={this.state.username} name='searchTerm' onChange={this.inputHandler.bind(this)} placeholder='e.g. "bloodymushroom"'/>
            <button type='submit'><img className={classNames.mediumIcon} src={icons.searchIcon} /></button>
          </label>
        </div>
      </form>
      <Snackbar 
        open={store.showSnackbar}
        message={store.searchedUser && store.searchedUser.wasSearched? `${store.searchedUser.username} has been searched ${store.searchedUser.timesSearched} times in the last 2 minutes.` : ''}
      />
    </div>
    )
  }
}

export default Searchbar;