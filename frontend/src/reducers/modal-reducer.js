export function modalReducer (state=false,action) {
    switch(action.type){
        case("setTrue"):
            return true
        case("setFalse"):
            return false
        default:
            return state
    }
}