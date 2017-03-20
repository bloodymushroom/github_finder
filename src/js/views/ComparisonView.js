import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import store, { user1, user2 } from '../mobx/Store'
import { observer } from 'mobx-react'

import classNames from '../styles/style.css'
import Profile from '../components/Profile'
import CompareContainer from '../components/CompareContainer'

@observer
class ComparisonView extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e, string){
    console.log('hello')
    // console.log('clicked', e.target, e.target.id)
    store.activeUser = string;

    console.log('yo', document.getElementById('search'))
    document.getElementById('searchInput').focus();
  }

  render() {
    return(
      <div className={classNames.view}>
        <div id='User 1'>
          <Profile id='User 1' user={user1.profile} >
            <RaisedButton 
              backgroundColor='rgba(240,98,146 ,1)'
              label='FIND USER' 
              id='User 1'
              onClick={(e) => this.clickHandler(e, 'User 1')}
              fullWidth={true}
            />
          </Profile>
        </div>
        <CompareContainer />
        <div id='User 2'>
          <Profile id='User 2' user={user2.profile} >
            <RaisedButton 
              backgroundColor='rgba(240,98,146 ,1)'
              label='FIND USER' 
              id='User 2'
              onClick={(e) => this.clickHandler(e, 'User 2')}
              fullWidth={true}
            />
          </Profile>
        </div>
      </div>
    )
  }
}

export default ComparisonView