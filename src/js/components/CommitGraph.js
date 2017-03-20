import React, { Component } from 'react'

import { user1, user2 } from '../mobx/Store'

class CommitGraph extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    // user1.getCommits();
  }

  render() {
    return (
      <div>
        CommitGraph
        user1 = {user1.totalCommits}
      </div>
    )
  }
}

export default CommitGraph