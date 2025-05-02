export function getTableReducer (state=[], action) {
    switch(action.type) {
        case("getTable"):
            return action.payload
        default:
            return state
    }
}