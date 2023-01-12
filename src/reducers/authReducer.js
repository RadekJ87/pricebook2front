const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { user: null, isLogInBeingProcessed: true, error: false};
        case "LOGIN_SUCCESS":
            return { user: action.payload, isLogInBeingProcessed: false, error: false};
        case "LOGIN_FAILURE":
           return { user: null, isLogInBeingProcessed: false, error: true};
        case "LOGOUT":
            return { user: null, isLogInBeingProcessed: false, error: false};
        default:
            return state;
    }
}

export default authReducer;
