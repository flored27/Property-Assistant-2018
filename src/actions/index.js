import { adapter } from '../services';

// export const fetchUser = () => dispatch => {
//   dispatch({ type: 'ASYNC_START' });
//   adapter.auth.getCurrentUser().then(user => {
//     dispatch({ type: 'SET_CURRENT_USER', user });
//   });
// };
export function fetchPropertiesSuccess(properties) {
  console.log("fetch properties hit")
    return {
        type: 'PROPERTIES_FETCH_DATA_SUCCESS',
        properties
    };
}

export function fetchProperties(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => response.json())
            .then((items) => dispatch(fetchPropertiesSuccess(items)))
    };
}

export function fetchUser() {
  return (dispatch) => {
    fetch('http://localhost:3000/current_user', {
      method: 'GET',
      headers: {
          'Authorization': localStorage.getItem('token')
        }
    })
    .then(data => data.json())
    .then(data=> {
      dispatch({type: "SET_CURRENT_USER", payload: data})
    })
  }
}

// export const loginUser = (username, password, history) => dispatch => {
//   dispatch({ type: 'ASYNC_START' });

//
//   adapter.auth.login({ username, password }).then(user => {
//     localStorage.setItem('token', user.jwt);
//     dispatch({ type: 'SET_CURRENT_USER', user });
//     history.push('/profile');
//   });
// };

  export function loginUser(email, password) {
    console.log(email, password)
  return (dispatch) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({email: email, password: password})
    })
    .then(data => data.json())
    .then(data=> {
      localStorage.setItem('token', data.jwt)
      dispatch({type: "LOGIN_USER", payload: data})
    })
  }
}

export function setUser(email, password) {
  console.log(email, password)
return (dispatch) => {
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({email: email, password: password})
  })
  .then(data => data.json())
  .then(data=> {
    localStorage.setItem('token', data.jwt)
    dispatch({type: "SET_CURRENT_USER", payload: data})
  })
}
}

export function newProperty(state) {
  console.log(state)
  return (dispatch) => {
    return fetch('http://localhost:3000/properties', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        property: state.property,
        apartments: state.apartments,
        tenants: state.tenants
      })
    })
    .then(data => data.json())
    .then(data=> {
      dispatch({type: "ADD_PROPERTY", payload: data})
      console.log(data)
      return data.Property.id
    })
  }
}

export function editProperty(state) {
  console.log(state)
  return (dispatch) => {
    return fetch(`http://localhost:3000/properties/${state.property.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        property: state.property,
        tenant: state.tenants,
        apartment: state.apartments
      })
    })
    .then(data => data.json())
    .then(data=> {
      dispatch({type: "EDIT_PROPERTY", payload: data})
      console.log(data.Property.id)
      return data.Property.id

    })
  }
}

export function sendEmail(state, tenant_email) {
  console.log(state)
  return (dispatch) => {
    return fetch(`http://localhost:3000/landlords/${state.landlord_id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        message: state.message,
        message_email:tenant_email
      })
    })
    .then(data => data.json())
    .then(data=> console.log(data))
  }
}

export function deleteProperty(id) {
  console.log("ID ",id)
  return (dispatch) => {
     fetch(`http://localhost:3000/properties/${id}`, {
      method: 'DELETE',
      })
      .then(data => data.json())
      .then(data=> {
      console.log("DATA ", data)
      dispatch({type: "DELETE_PROPERTY", payload: data})
    })
  }
}

export function deleteApartment(id) {
  return (dispatch) => {
     fetch(`http://localhost:3000/apartments/${id}`, {
      method: 'DELETE',
      })
  }

}

export function deleteTenant(id) {
  console.log("ID ",id)
  return (dispatch) => {
     fetch(`http://localhost:3000/tenants/${id}`, {
      method: 'DELETE',
    })
  }
}



export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
