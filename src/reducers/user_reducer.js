const user_reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export { user_reducer }