import React, { Component } from 'react'

// components 
import Profile from '../components/Profile'
import ReposContainer from '../components/ReposContainer'
import RepoChart from '../components/RepoChart'

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
  }

  render() {
      return (
        <div className={classNames.view}>
        { !user1.searchPending? (
            user1.username ? (
              <div className={classNames.subView}>
                <Profile user={user1.profile}/>
                <ReposContainer repos={user1.repos} />
                {user1.repos.length > 0 && <RepoChart />}
              </div> 
            ) : (
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {
                  user1.searchError ? <span>{user1.searchError}<br/>Please try again.</span>  : 'Search to start!' 
                }
              </div>
            )
          ) : (
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img src={icons.loading} />
          </div>
          )
        }
        </div>
      )
  }
}

export default UserView;