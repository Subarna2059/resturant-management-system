export function addModalReducer (state=false,action) {
    switch(action.type){
        case("setAddModalTrue"):
            return true
        case("setAddModalFalse"):
            return false
        default:
            return state
    }
}