import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import PullRequests from './PullRequests'

const store = configureStore()

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        <PullRequests />
      </Provider>
    )
  }
}
