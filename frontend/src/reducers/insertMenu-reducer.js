export function insertMenuReducer (state={title:"", description:"", category:"", price:"", file:null},action) {
    switch(action.type){
        case("insertMenu"):
        if(action.payload.name === "file") {
            return {
                ...state,
                "file":action.payload.files[0]
            }
        } else {
            return {
                ...state,
                [action.payload.name]:action.payload.value
            }
        }
        default:
            return state
    }
}