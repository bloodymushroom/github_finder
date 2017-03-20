import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';

class AuthModal extends Component {
  render() {
    return(
      <div>
        <Dialog>
          <iframe src='https://github.com/login/oauth/authorize'>
          </iframe>
        </Dialog>
      </div>
    )
  }
}

export default AuthModal;