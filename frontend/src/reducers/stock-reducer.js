export function stockReducer (state=[],action) 
{
    switch(action.type) {
        case("getStock"):
            return action.payload
        default:
            return state
    }
}