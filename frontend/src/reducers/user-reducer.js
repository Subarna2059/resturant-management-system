export function userReducer (state=[], action) {
    switch(action.type) {
        case("getUser"):
            return action.payload
        default:
            return state
    }
}