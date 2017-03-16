import React from 'react'

import classNames from '../styles/style.css'

const Profile = (props) => (
  <div className={classNames.profileContainer}>
    Image: <img src={props.user.avatar_url} />
    Username: <span>{props.user.username}</span>
    Link: <a href={props.user.url}>{props.user.url}</a>

    This will not change
  </div>
)

export default Profile;