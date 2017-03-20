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
              <TableHeaderColumn>Common Followers ({user1.getSharedFollowers(user2).length} total)</TableHeaderColumn>
              <TableHeaderColumn>Github</TableHeaderColumn>
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
        <div className={classNames.compareDiv}>
          {
            !user1.username && !user2.username && <div>Start searching to compare!</div>
          }
          {user1.username && ( <div>
            <span className={classNames.followerLabel}>{user1.username}'s total followers: </span>
            <span className={user2.followers.length > user1.followers.length? classNames.number : [classNames.greaterSpan, classNames.number].join(' ')}>
              {user1.followers.length}
            </span>
          </div>
          )}
          {user2.username && (<div>
            <span className={classNames.followerLabel}>{user2.username}'s total followers:</span>
            <span className={user2.followers.length > user1.followers.length? [classNames.greaterSpan, classNames.number].join(' ') : classNames.number}>
              {user2.followers.length}
            </span>
          </div>
          )}
        </div>
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