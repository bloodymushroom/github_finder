import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Repo from './Repo'
import ReposTable from './ReposTable'
import classNames from '../styles/style.css'


class ReposContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      repos: this.props.repos,
      filter: 'name',
      ascending: false,
      filterTerm: ''
    }
  }

  clickHandler(event, index, value) {
    this.setState({
      filter: value
    })

    this.sortRepos(value, this.state.ascending)
  }

  sortRepos(filter, ascending) {
    this.setState({
      repos: this.state.repos.sort((a, b) => {
        var current = filter === 'name'? a[filter].toLowerCase() : a[filter];
        var next = filter === 'name'? b[filter].toLowerCase() : b[filter];
        const first = this.state.ascending? 1 : -1;
        return current < next? first : -first;
      })
    })
  }

  toggleAscending(e){
    this.sortRepos(this.state.filter, !this.state.ascending);

    this.setState({
      ascending: !this.state.ascending
    })

  }

  inputHandler(e) {
    var input = e.target.value
    this.setState({
      filterTerm: e.target.value
    })

    this.setState({
      repos: this.props.repos.filter( (repo) => {
        var term = input.toLowerCase();
        var name = repo.name.toLowerCase();
        var des = repo.description? repo.description.toLowerCase() : '';

        // return true;
        return name.indexOf(term) !== -1 || des.indexOf(term) !== -1
      })
    })
  }

  sortBySelector() {
    return (
      <SelectField
        style={{width: '200px'}}
        menuItemStyle={{width: '200px'}}
        floatingLabelText='Sort by:'
        value={this.state.filter}
        onChange={this.clickHandler.bind(this)}
      >
        <MenuItem value='name' primaryText='Alphabetical'/>
        <MenuItem value='created_at' primaryText='Date Created'/>
        <MenuItem value='starCount' primaryText='Starred'/>
      </SelectField>
    )
  }

  render() {
    return (
      this.props.repos.length > 0 ? (
        <div className={classNames.reposContainer}>
          <div style={{display: 'flex', alignItems: 'flex-end'}}>
            <form style={{flex: 2}} name='filterRepos'>
              <label>
                Filter repos:
                <TextField 
                  style={{marginLeft: '10px'}}
                  hintText='e.g. "react"'
                  onChange={this.inputHandler.bind(this)}
                />
              </label>
            </form>
            {this.sortBySelector()}
            <button onClick={this.toggleAscending.bind(this)}>{this.state.ascending? 'Ascending' : 'Descending'}</button>
          </div>
          <ReposTable repos={this.state.repos}/>
        </div>
      ) : (
        <div>User has no repos.</div>
      )
    )
  }
}

export default ReposContainer;