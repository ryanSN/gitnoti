import React, { PropTypes, Component } from 'react'

class PullRequests extends Component {
  render () {
    return (
      <ul>
        {this.props.pullrequests.map((pr, i) =>
          <li key={i}>{pr.title}</li>
        )}
      </ul>
    )
  }
}

// PullRequests.propTypes = {
//   pullRequests: PropTypes.array.isRequired
// }

export default PullRequests
