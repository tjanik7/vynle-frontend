// Setup config with token (helper function) when using redux (global state)
export const reduxTokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
};

export function tokenConfig(token) {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
}
