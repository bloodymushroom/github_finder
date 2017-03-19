import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import classNames from '../styles/style.css'

import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import store, { user1, user2 } from '../mobx/Store'


@observer
class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.id === 'User 2'? user2 : user1; 
    return (
      <div>
        { !this.props.searchPending ? (
          <Card> 
            <CardMedia
              overlay={this.props.user.name? <CardTitle style={{fontSize: '8px'}} title={this.props.user.name} /> : null}>
              <img style={{width: '200px', height: 'auto'}} src={this.props.user.avatar_url} />            
            </CardMedia>
            {this.props.children}
            <CardTitle title={this.props.user.username} 
              subtitle={<a target='_blank' href={this.props.user.url}>github.com/{this.props.user.username}</a>} 
            />
          </Card>
          ) : (
            <div id={this.props.id} className={classNames.profileContainer}>
              <div>Search for another user!</div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Profile;