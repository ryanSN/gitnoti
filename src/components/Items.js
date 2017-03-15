import React, { Component } from 'react'
import {connect} from 'react-redux'
import {itemsFetchData} from '../actions'

class Items extends Component {
  componentDidMount () {
    this.props.fetchData('http://58c8a64d939d711200e9d229.mockapi.io/PullRequests')
  }

  render () {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loadin items</p>
    }
    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    return (
      <ul>
        {this.props.items.map((item) => (
          <li key={item.id}>
            {item.label}
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items)
