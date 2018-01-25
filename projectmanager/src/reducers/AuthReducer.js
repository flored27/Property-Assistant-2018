
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
    // debugger
      let newProperties = state.currentUser.properties.slice()
      let found = newProperties.find(property => {
        return property.id === action.payload.Property.id
      })
      let index = newProperties.indexOf(found)
      newProperties[index] = action.payload.Property

      // let newApartments = state.currentUser.apartments.slice()
      // let f_a = newProperties.find(property => {
      //   return property.id === action.payload.Property.id
      // })
      // let index = newProperties.indexOf(found)
      // newProperties[index] = action.payload.Property
      //
      // let newTenants = state.currentUser.tenants.slice()
      // let f_t = newTenants.find(tenant => {
      //   return tenant.id === action.payload.Property.id
      // })
      // let index = newProperties.indexOf(found)
      // newProperties[index] = action.payload.Property

      return {...state, currentUser: {...state.currentUser, properties: newProperties}}
    case 'DELETE_PROPERTY':
        return {...state, currentUser: {...state.currentUser, properties: action.payload}};
    default:
      return state;
  }
}

// export function properties(state = [], action) {
//     switch (action.type) {
//         case 'PROPERTIES_FETCH_DATA_SUCCESS':
//           return action.properties;
//         case 'ADD_PROPERTY':
//           return [...state, action.payload]
//         default:
//             return state;
//     }
// }
