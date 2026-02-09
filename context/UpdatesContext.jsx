import { createContext, useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "69809ca3000d5cd3cc78";
const COLLECTION_ID = "updates555";

export const UpdatesContext = createContext();

export function UpdatesProvider({ children }) {
    const [updates, setUpdates] = useState([]);
    const { user } = useUser();

    async function fetchUpdates() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal("UserId", user.$id)
                ]


            )

            setUpdates(response.documents);
            console.log(response.documents)
        } catch (error) {
            console.error(error.message);

        }
    }

    async function fetchUpdateById(id) {
        try {
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
                { ...data, UserId: user.$id },
                [
                    Permission.read(Role.any()),
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

    useEffect(() => {

        if (user) {
            fetchUpdates();
        } else {
            setUpdates([]);
        }
    }, [user]);

    return (
        <UpdatesContext.Provider
            value={{ updates, fetchUpdates, fetchUpdateById, createUpdate, deleteUpdate }}
        >
            {children}
        </UpdatesContext.Provider>
    );
}


