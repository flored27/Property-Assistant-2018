export function listCreator(){
return (dispatch) => {
  fetch('http://localhost:3000/landlords')
  .then(data => data.json())
  .then(data=> {
    localStorage.setItem('token', data.jwt)
    dispatch({type: "LOGIN_USER", payload: data})
  })
}
}
