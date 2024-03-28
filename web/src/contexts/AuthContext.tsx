import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { api } from "@/services/api";

type User = {
    id: string;
    name: string;
    email: string;
    cpf: string;
}

type AuthProviderType = {
    children: ReactNode;
}

type SignInData = {
    cpf: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data : SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : AuthProviderType) {
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const { "CumidaArretada.AuthToken" : authToken } = parseCookies();

        if(authToken) {
            // api.post("path/recovery/user", { token: authToken })
            // .then(({ data : recoveredUser }) => {
            //     setUser(recoveredUser)
            // })
        }
    }, [])

    async function signIn({cpf, password} : SignInData) {
        // const { data : userInfo } = await api.post("path/url", {
        //     cpf,
        //     password,
        // })

        // setCookie(undefined, "CumidaArretada.AuthToken", userInfo.token, {
        //     maxAge: 60 * 60 * 24 * 30, // 30 dias
        // })

        // api.defaults.headers['Authorization'] = `Bearer ${authToken}`

        // setUser(userInfo)

        Router.push("/dashboard")
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}