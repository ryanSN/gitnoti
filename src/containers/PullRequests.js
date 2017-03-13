import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
// import Picker from '../components/Picker'
// import Posts from '../components/Posts'

class PullRequests extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  handleChange (nextReddit) {
  }

  handleRefreshClick (e) {
    e.preventDefault()
  }

  render () {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        Pull Requests
      </div>
    )
  }
}

PullRequests.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(PullRequests)
