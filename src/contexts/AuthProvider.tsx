import React, { useState } from "react";

const ACCESS_TOKEN_STORAGE = "accessToken"
type Token = string | undefined
const AuthContext = React.createContext<[Token, (token: Token) => void]>([undefined, () => { }]);

const AuthProvider = (props: any) => {
    const storageToken = localStorage.getItem(ACCESS_TOKEN_STORAGE)
    const [token, setToken] = useState<Token>(storageToken === null ? undefined : storageToken)

    const storeAndSetToken = (token: Token) => {
        if (token === undefined) {
            localStorage.removeItem(ACCESS_TOKEN_STORAGE)
        } else {
            localStorage.setItem(ACCESS_TOKEN_STORAGE, token)
        }
        setToken(token)
    }

    return (
        <AuthContext.Provider value={[token, storeAndSetToken]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)
export const useIsLogged = () => useAuth()[0] !== undefined

export default AuthProvider