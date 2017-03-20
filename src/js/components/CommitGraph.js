import React, { Component } from 'react'

import { user1, user2 } from '../mobx/Store'
import { observer } from 'mobx-react'


import LineChart from './LineChart'

@observer
class CommitGraph extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log('commits',user1.commits)
  }

  render() {
    return (
      <div>
        CommitGraph
        <LineChart />
        user1 = {user1.totalCommits}
        {
          user1.commits.map(c => {
            return <span>hi</span>
          })
        }
      </div>
    )
  }
}

export default CommitGraph