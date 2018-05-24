export function listCreator(){
return (dispatch) => {
  fetch('https://property-assistant-2018.herokuapp.com/landlords/')
  .then(data => data.json())
  .then(data=> {
    localStorage.setItem('token', data.jwt)
    dispatch({type: "LOGIN_USER", payload: data})
  })
}
}
