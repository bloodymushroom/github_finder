import React, { Component } from 'react'
import moment from 'moment'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import classNames from '../styles/style.css'

const icons = {
  star: 'http://findicons.com/files/icons/1620/crystal_project/128/keditbookmarks.png'
}

class ReposTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Repo ({this.props.repos.length} total)</TableHeaderColumn>
            <TableHeaderColumn>Date created</TableHeaderColumn>
            <TableHeaderColumn width={'40%'}>Description</TableHeaderColumn>
            <TableHeaderColumn width={'15%'}>Star count</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {
            this.props.repos.map( repo => {
              return (
                <TableRow>
                  <TableRowColumn>
                    <a style={{fontWeight: 'bold'}} target='_blank' href={repo.url}>{repo.name}</a>
                  </TableRowColumn>
                  <TableRowColumn >{moment(repo.created_at).format('YYYY-MM-DD')}</TableRowColumn>
                  <TableRowColumn style={{whiteSpace: 'none', width: '40%'}}>{repo.description}</TableRowColumn>
                  <TableRowColumn width='15%'>
                    <img className={classNames.smallIcon} src={icons.star} />
                    {repo.starCount}
                  </TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}

export default ReposTable