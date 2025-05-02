export function menuReducer(state=[], action) 
{
    switch(action.type) {
        case("getMenu"):
            return action.payload
        default:
            return state
    }
}