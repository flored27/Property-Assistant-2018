import { adapter } from '../services';

// export const fetchUser = () => dispatch => {
//   dispatch({ type: 'ASYNC_START' });
//   adapter.auth.getCurrentUser().then(user => {
//     dispatch({ type: 'SET_CURRENT_USER', user });
//   });
// };

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
      dispatch({type: "LOGIN_USER", payload: data})
    })

  }
}


export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};
