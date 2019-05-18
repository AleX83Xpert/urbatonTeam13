import {ACTION_LOGIN, ACTION_LOGOUT, ACTION_SET_USER_ID, ACTION_SET_USER_ROLE} from "../actions";

const mainReducer = (state = 0, action) => {
    switch (action.type) {
        case ACTION_LOGIN:
            return {
                ...state,
                isLoggedIn: true
            };
        case ACTION_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        case ACTION_SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            };
        case ACTION_SET_USER_ROLE:
            return {
                ...state,
                userRole: action.payload
            };
        default:
            return state;
    }
};

export default mainReducer;