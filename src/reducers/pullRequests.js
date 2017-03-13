function pullRequests (state = [], action) {
  switch (action.type) {
    case 'GET_PULL_REQUESTS':
      // return [...state, {
      //   stuff: action.stuff
      // }]
      return state
    default:
      return state
  }
}

export default pullRequests
