export function selectedItemsReducer (state=[],action) {
    switch (action.type) {
        case("selectedItemMenu"):
            return action.payload
        default:
            return state
    }
}