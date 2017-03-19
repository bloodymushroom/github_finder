import React, { Component } from 'react'

import store, { user1, user2 } from '../mobx/Store'
import { observer } from 'mobx-react'

import classNames from '../styles/style.css'
import Profile from '../components/Profile'
import CompareContainer from '../components/CompareContainer'

@observer
class ComparisonView extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler(e){
    store.activeUser = e.target.dataset.user;
  }

  render() {
    return(
      <div className={classNames.view}>
        <div onClick={this.clickHandler.bind(this)} id='User 1'>
          <Profile id='User 1' user={user1.profile} >
            <button data-user='User 1' onClick={this.clickHandler.bind(this)}>
              Select
            </button>
          </Profile>
        </div>
        <CompareContainer />
        <div onClick={this.clickHandler.bind(this)} id='User 2'>
          <Profile id='User 2' user={user2.profile} >
            <button data-user='User 2' onClick={this.clickHandler.bind(this)}>
              Select
            </button>
          </Profile>
        </div>
      </div>
    )
  }
}

export default ComparisonView