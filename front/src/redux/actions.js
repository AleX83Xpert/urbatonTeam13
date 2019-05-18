export const ACTION_LOGIN = 'ACTION_LOGIN';
export const ACTION_LOGOUT = 'ACTION_LOGOUT';
export const ACTION_SET_USER_ID = 'ACTION_SET_USER_ID';
export const ACTION_SET_USER_ROLE = 'ACTION_SET_USER_ROLE';

export const userLogin = () => ({
    type: ACTION_LOGIN,
});

export const userLogout = () => ({
    type: ACTION_LOGOUT,
});

export const setUserId = id => ({
    type: ACTION_SET_USER_ID,
    payload: id
});

export const setUserRole = role => ({
    type: ACTION_SET_USER_ID,
    payload: role
});