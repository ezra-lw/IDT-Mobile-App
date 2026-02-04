import { createContext, useState } from "react"


export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    async function login(studentid, password) {
    }

    async function register(studentid, password) {
    }


    async function logout() {
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );

}

