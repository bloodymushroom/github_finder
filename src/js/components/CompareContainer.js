import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';

import store, { user1, user2 } from '../mobx/Store'
import { observer } from 'mobx-react'

import classNames from '../styles/style.css'

import FollowerGraph from './FollowerGraph'
import CommitGraph from './CommitGraph'

class CompareContainer extends Component {
  constructor() {
    super()

    this.state = {
      view: 'followers'
    }
  }

  clickHandler(value) {
    this.setState({
      view: value
    })
  }

  render() {
    return (
      <Tabs
        style={{flex: 1}}
        tabItemContainerStyle={{backgroundColor: 'lightgrey'}}
        value={this.state.view}
        onChange={this.clickHandler.bind(this)}
      >
        <Tab style={{backgroundColor: 'transparent'}} label='Followers' value='followers'>
          <FollowerGraph />
        </Tab>
        <Tab style={{backgroundColor: 'transparent'}} label='Commits' value='commits'>
          <CommitGraph />
        </Tab>
      </Tabs>
    )
  }
}

export default CompareContainer