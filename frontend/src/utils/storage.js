export function  setLocalStorage(token) {
    localStorage.setItem("token",token)
}

export function getLocalStorage() {
   return localStorage.getItem('token')
}