import React, { Component } from 'react'

// components 
import Profile from '../components/Profile'
import ReposContainer from '../components/ReposContainer'
import Chart from '../components/Chart'

// style
import classNames from '../styles/style.css'

// store
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import store, { user1 } from '../mobx/Store'

const icons = {
  loading: 'http://mgiep.unesco.org/wp-content/uploads/2015/11/LoadingSpinner.gif'
}

@observer
class UserView extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    console.log('user1 in component', toJS(user1.profile))
    if (!user1.searchPending) {
      return (
        <div className={classNames.view}>
          { user1.username ? (
              <div className={classNames.subView}>
                <Profile user={user1.profile}/>
                <ReposContainer repos={user1.repos} />
                <Chart />
              </div> 
            ) : (
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {
                  user1.searchError ? 'Could not find user. Try again' : 'Search to start!' 
                }
              </div>
            )
          }
        </div>
      )
    } else {
      return (
        <div style={{height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <img src={icons.loading} />
        </div>
      )
    }
  }
}

export default UserView;