import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {},
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const setToken = (token) => {
        _setToken(token);
        if (token) localStorage.setItem("ACCESS_TOKEN", token);
        else localStorage.removeItem("ACCESS_TOKEN");
    };
    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuthContext, AuthContext };
