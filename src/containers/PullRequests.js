import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'

class PullRequests extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
    actionCreators.getPullRequests()
  }

  componentWillReceiveProps (nextProps) {
  }

  handleChange (nextReddit) {
  }

  handleRefreshClick (e) {
    e.preventDefault()
  }

  render () {
    return (
      <div>
        Pull Requests
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    pullRequests: {}
  }
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PullRequests)
