import React, { Component } from 'react'

import classNames from '../styles/style.css'

const icons = {
  star: 'http://findicons.com/files/icons/1620/crystal_project/128/keditbookmarks.png'
}

class Repo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const repo = this.props.repo;

    return (
      <div className={classNames.repo}>
        <div>
          <a target='_blank' href={repo.url}><h1><span>{repo.name}</span></h1></a>
          <span>{repo.description}</span>
          <span>Created at: {repo.created_at}</span>
        </div>
        <div>
          <img className={classNames.smallIcon} src={icons.star} />
          <span>{repo.starCount}</span>
          <a href='#'>See who</a>
        </div>
      </div>
    )
  }
}

export default Repo;