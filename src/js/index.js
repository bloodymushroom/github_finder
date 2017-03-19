// @flow
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App'

injectTapEventPlugin();

render(
  <MuiThemeProvider><App /></MuiThemeProvider>,
	window.document.getElementById('app-container')
)
