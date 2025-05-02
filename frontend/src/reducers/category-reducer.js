export function categoryReducer (state=[],action) 
{
    switch(action.type) {
        case("getCategory"):
            return action.payload
        default:
            return state
    }
}