// import fetch from 'isomorphic-fetch'

export function getPullRequests () {
  return {
    type: 'GET_PULL_REQUESTS',
    pullRequests: {}
  }
}
