export function insertOrderReducer(state={category:"", menu:"", table:"", quantity:""},action) {
    switch(action.type){
        case("insertOrder"):
           return{
                ...state, 
                [action.payload.name]:action.payload.value
            }
        default:
            return state
    }
}