export function  setLocalStorage(token) {
    localStorage.setItem("token",token)
}

export function getLocalStorage() {
   return localStorage.getItem('token')
}

export function clearLocalStorage() {
    return localStorage.clear()
}