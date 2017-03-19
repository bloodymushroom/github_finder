import React, { Component } from 'react'

import store, { user1, user2 } from '../mobx/Store'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import classNames from '../styles/style.css'

@observer
class FollowerGraph extends Component {
  constructor(props){
    super(props)

    this.state = {
      pending: false,
    }

    this.commonFollowers = this.commonFollowers.bind(this)
  }

  commonFollowers() {
    try {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}> 
        {user1.getSharedFollowers(user2).map((f) => {
          return (
            <div key={f.login}>
              <img className={classNames.mediumIcon} src={f.avatar_url} />
              {f.login}
            </div>
          )
        })}
        </div>
      )
    } 
    catch(e) {
      return (
        <div>Pending</div>
      )
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.commonFollowers.bind(this)}>Get common followers</button>
        FollowerGraph
        <div className={classNames.view}>
          User 1 followers: 
          {user1.followers.length}
          <div ref='commonFollowers'/>
          <div>
          Shared:<br/> 
          {this.commonFollowers()}
          </div>
          User 2 followers:
          {user2.followers.length}
        </div>
      </div>
    )
  }
}

export default FollowerGraph;