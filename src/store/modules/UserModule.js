export default {
  state: {
    currentUser: {
      email: '2@sehir.edu.tr',
      name: 'Ali Cakmak',
      token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjJAc2VoaXIuZWR1LnRyIiwidW5pcXVlX25hbWUiOiJBbGkgw4dha21hayIsInJvbGUiOiJJbnN0cnVjdG9yIiwibmJmIjoxNTczMzE4MTYxLCJleHAiOjE1NzM0MDQ1NjEsImlhdCI6MTU3MzMxODE2MX0.mgVt9yvo0lcnTwj1bhfm85Lh6SjU_6_NrwP8E3J4XHfbbnnzk07oYPw50T-KER6bUYmtyBI_xq-AZBgjm9roUQ'
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser
    },
    getEmail(state) {
      return state.currentUser.email
    },
    getToken(state) {
      return state.currentUser.token
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    }
  },
  actions: {
    setCurrentUserAction(context, user) {
      context.commit('setCurrentUser', user)
    }
  }
}