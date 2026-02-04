import { createContext } from "react";


export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();

    async function login(studentid, password) {
    }

    async function register(studentid, password) {
    }

    async function login(staffid, staffpassword) {
    }

    async function logout() {
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );

}

