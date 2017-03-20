import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import store, { user1, user2 } from '../mobx/Store'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

import classNames from '../styles/style.css'

@observer
class FollowerGraph extends Component {
  constructor(props){
    super(props)

    this.state = {
      pending: false
    }

    this.commonFollowers = this.commonFollowers.bind(this)
  }

  commonFollowers() {
    try {
      return (
        <Table >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={{width: '30px'}}/>
              <TableHeaderColumn>Users ({user1.getSharedFollowers(user2).length} total)</TableHeaderColumn>
              <TableHeaderColumn width={'40%'}>Github</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            style={{maxHeight: '100%', overflow: 'scroll'}}
          >
            {user1.getSharedFollowers(user2).map((f) => {
              return (
                <TableRow>
                  <TableRowColumn style={{width: '30px'}}>
                    <img className={classNames.mediumIcon} src={f.avatar_url} />
                  </TableRowColumn>
                  <TableRowColumn>
                    {f.login}
                  </TableRowColumn>
                  <TableRowColumn>
                    <a target='_blank' href={f.html_url}>github/{f.login}</a>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )
    } 
    catch(e) {
      return (
        <div className={classNames.errorDiv}>
          <span>Pending</span>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
          User 1 followers: 
          {user1.followers.length}
          User 2 followers:
          {user2.followers.length}
        <div className={classNames.view}>
          <div>
          {this.commonFollowers()}
          </div>
        </div>
      </div>
    )
  }
}

export default FollowerGraph;