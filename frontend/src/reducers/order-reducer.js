export function orderReducer(state=[], action) 
{
    switch (action.type) {
        case ("getOrder"):
            return action.payload
        default:
            return state
    }   
}