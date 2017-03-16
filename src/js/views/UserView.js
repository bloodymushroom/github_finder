import React, { Component } from 'react'

// components 
import Profile from '../components/Profile'
// style
import classNames from '../styles/style.css'

// store
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { user1 } from '../mobx/Store'

const icons = {
  loading: 'http://mgiep.unesco.org/wp-content/uploads/2015/11/LoadingSpinner.gif'
}

@observer
class UserView extends Component {
  render() {
    console.log('user1 in component', toJS(user1.profile))
    if (!user1.searchPending) {
      return (
        <div>
          This is user 1 view!
          { user1.username ? (
              <div className={classNames.view}>Found user { user1.username }
                <Profile user={user1.profile}/>
              </div> 
            ) : (
              <div>Message from github API: {user1.searchError}</div>
            )
          }
        </div>
      )
    } else {
      return (
        <div>
          <img src={icons.loading} />
        </div>
      )
    }
  }
}

export default UserView;