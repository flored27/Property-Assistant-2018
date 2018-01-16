
export const authReducer = (state = {currentUser: {}}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: {id: action.payload.id, email: action.payload.email, properties: action.payload.properties}};
    case 'LOGIN_USER':
      return {...state, currentUser: {id: action.payload.id, email: action.payload.email, properties: action.payload.properties}}
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
}
