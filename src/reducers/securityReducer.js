import { LOGOUT, SET_CURRENT_USER } from "../actions/types";

const initialState = {
    user: {},
    validToken: false
};

const booleanActionPayload = payload => {
    if(payload) {
        return true;
    } else {
        return false;
    }
};

export default function securityReducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(payload),
                user: payload
            };
        case LOGOUT:
            return {
                ...state,
                validToken: false,
                user: {}
            }
        default:
            return state;
    }
}