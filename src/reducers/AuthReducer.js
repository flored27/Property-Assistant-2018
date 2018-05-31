
export const authReducer = (state = {currentUser: {id:null, email: null, phone: null, name: null, tenants: [], apartments: [], properties: []}}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: {id: action.payload.id, email: action.payload.email, phone: action.payload.phone, name: action.payload.name, tenants: action.payload.tenants, apartments: action.payload.apartments, properties: action.payload.properties}};
    case 'LOGIN_USER':
      return {...state, currentUser: {id: action.payload.id, email: action.payload.email, phone: action.payload.phone, name: action.payload.name, tenants: action.payload.tenants, apartments: action.payload.apartments, properties: action.payload.properties}}
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    case 'PROPERTIES_FETCH_DATA_SUCCESS':
      return {...state, currentUser: {...state.currentUser, properties: [...state.currentUser.properties, action.properties]}};
    case 'ADD_PROPERTY':
      return {...state, currentUser: {...state.currentUser, properties: [...state.currentUser.properties, action.payload.Property], tenants: [...state.currentUser.tenants.concat(action.payload.Tenants)], apartments: [...state.currentUser.apartments.concat(action.payload.Apartments)]}};
    case 'EDIT_PROPERTY':
    let newApartments = action.payload.Apartments
    let newTenants = action.payload.Tenants
    // the apartments and tenants arrays takes in the updated information from the new apartments and tenants arrays
    // that comes from the patch request to /properties, to then the payload with the updated information.
    // The new apartment/tenant arrays include ALL the tenants/apartments for the landlord.
      return {...state, currentUser: {...state.currentUser, apartments: newApartments, tenants: newTenants}}
    case 'DELETE_PROPERTY':
        return {...state, currentUser: {...state.currentUser, properties: action.payload.Property, apartments: action.payload.Apartments, tenants: action.payload.Tenants}};
    default:
      return state;
  }
}
