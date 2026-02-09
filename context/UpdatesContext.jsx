import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "69809ca3000d5cd3cc78";
const COLLECTION_ID = "updates555";

export const UpdatesContext = createContext();

export function UpdatesProvider({ children }) {
    const [updates, setUpdates] = useState([]);
    const { user } = useUser();

    async function fetchUpdates() {
        try {
            // TODO: implement listDocuments when ready
            return [];
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    async function fetchUpdateById(id) {
        try {
            // TODO: implement getDocument when ready
            return null;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    async function createUpdate(data) {
        try {
            if (!user) {
                throw new Error("User must be logged in to create updates.");
            }

            const newUpdate = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                data,
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            );

            setUpdates((prev) => [newUpdate, ...prev]);
            return newUpdate;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async function deleteUpdate(id) {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
            setUpdates((prev) => prev.filter((item) => item.$id !== id));
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    return (
        <UpdatesContext.Provider
            value={{ updates, fetchUpdates, fetchUpdateById, createUpdate, deleteUpdate }}
        >
            {children}
        </UpdatesContext.Provider>
    );
}


