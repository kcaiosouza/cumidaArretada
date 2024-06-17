import Router from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { api } from "@/services/api";

type User = {
    id: string;
    name: string;
    cnpj: string;
    password: string;
    created_at: any;
}

type AuthProviderType = {
    children: ReactNode;
}

type SignInData = {
    cnpj: string;
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
            api.get(`/restaurant/${authToken}`)
            .then(({ data : recoveredUser }) => {
                // console.log(recoveredUser)
                setUser(recoveredUser?.restaurant)
            })
        }
    }, [])

    async function signIn({cnpj, password} : SignInData) {
        const { data : userInfo } = await api.post("/restaurant/login", {
            cnpj,
            password,
        })

        setCookie(undefined, "CumidaArretada.AuthToken", userInfo.token, {
            maxAge: 60 * 60 * 24 * 30, // 30 dias
        })

        api.defaults.headers['Authorization'] = `Bearer ${userInfo.token}`

        setUser(userInfo)

        Router.push("/dashboard")
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
  }