import { adapter } from '../services';
import history from '../history';

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
    fetch('https://property-assistant-backend.herokuapp.com/current_user', {
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

export function findUser(state) {
  return (dispatch) => {
    return fetch('https://property-assistant-backend.herokuapp.com/find', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: state.email})
    })
    .then(data => data.json())
    .then(data => {
      if (data.message === "All good! Landlord email is not in database.") {
          console.log("All good! Landlord email is not in database.")
          dispatch(registerUser(state))
      }
      else {
        alert("Email is already used. Please revise, or log in!")
        console.log("Landlord already exists!")
      }
    })
  }
}

export function checkUser(email) {
  return (dispatch) => {
    return fetch('https://property-assistant-backend.herokuapp.com/find', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email})
    })
    .then(data => data.json())
    .then(data => {
      if (data.message === "All good! Landlord email is not in database.") {
        console.log("All good! Landlord email is not in database.")
      }
      else {
        alert("Email is already used. Please revise, or log in!")
        console.log("Landlord already exists!")
      }
    })
  }
}

export function registerUser(state) {
  return (dispatch) => {
    const fullName = state.first_name + " " + state.last_name

      fetch('https://property-assistant-backend.herokuapp.com/landlords/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          landlord: {name: fullName,
          email: state.email,
          phone: state.phone,
          password: state.password}
        })
      })
      .then(()=>dispatch(setUser(state.email, state.password)))
      .then(()=>history.push('/profile'));
  }
}

  export function loginUser(email, password) {
    console.log(email, password)
  return (dispatch) => {
    return fetch('https://property-assistant-backend.herokuapp.com/login', {
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
  console.log("in Set User")
return (dispatch) => {
  fetch('https://property-assistant-backend.herokuapp.com/login', {
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

    // This makes sure that the apartment has a number associated with it
    // before POSTing it to backend
    function apartmentArray(array) {
      var newArr = new Array();
      for (var i = 0; i < array.length; i++) {
        if (array[i].number) {
          newArr.push(array[i]);
        }
      }
      return newArr;
    }

    // This makes sure that the tenant has an apartment number AND a name associated with it
    // before POSTing it to backend
    function tenantArray(array) {
      var newArr = new Array();
      for (var i = 0; i < array.length; i++) {
        if (array[i].name && array[i].apartment_number) {
          newArr.push(array[i]);
        }
      }
      return newArr;
    }

  return (dispatch) => {
    return fetch('https://property-assistant-backend.herokuapp.com/properties', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        property: state.property,
        apartments: apartmentArray(state.apartments),
        tenants: tenantArray(state.tenants)
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

  // This makes sure that the apartment has a number associated with it
  // before POSTing it to backend
  function apartmentArray(array) {
    var newArr = new Array();
    for (var i = 0; i < array.length; i++) {
      if (array[i].number) {
        newArr.push(array[i]);
      }
    }
    return newArr;
  }

  // This makes sure that the tenant has an apartment number AND a name associated with it
  // before POSTing it to backend
  function tenantArray(array) {
    var newArr = new Array();
    for (var i = 0; i < array.length; i++) {
      if (array[i].name && array[i].apartment_number) {
        newArr.push(array[i]);
      }
    }
    return newArr;
  }

  return (dispatch) => {
    return fetch(`https://property-assistant-backend.herokuapp.com/properties/${state.property.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        property: state.property,
        tenant: tenantArray(state.tenants),
        apartment: apartmentArray(state.apartments)
      })
    })
    .then(data => data.json())
    .then(data=> {
      dispatch({type: "EDIT_PROPERTY", payload: data})
      console.log(data)
      return data.Property.id

    })
  }
}

export function sendEmail(state, tenant_email) {
  console.log("state", state)
  console.log("tenant email", tenant_email)
  return (dispatch) => {
    return fetch(`https://property-assistant-backend.herokuapp.com/message`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        message: state.message,
        message_email:tenant_email,
        id: state.landlord_id
      })
    })
  }
}

export function deleteProperty(id) {
  console.log("ID ",id)
  return (dispatch) => {
     fetch(`https://property-assistant-backend.herokuapp.com/properties/${id}`, {
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
     fetch(`https://property-assistant-backend.herokuapp.com/apartments/${id}`, {
      method: 'DELETE',
      })
  }

}

export function deleteTenant(id) {
  console.log("ID ",id)
  return (dispatch) => {
     fetch(`https://property-assistant-backend.herokuapp.com/tenants/${id}`, {
      method: 'DELETE',
    })
  }
}



export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
