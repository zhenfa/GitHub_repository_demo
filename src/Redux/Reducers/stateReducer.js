import { SET_SEARCH_CONTENT } from "../stateType";

const init = {
    searchContent : ''
}

export default function stateReducer(preState = init, action){
    const {type, data} = action
    switch (type) {
        
        case SET_SEARCH_CONTENT:
            return Object.assign(preState, data);

        default:
            return preState;
    }
}