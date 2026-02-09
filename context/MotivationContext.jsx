import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "69809ca3000d5cd3cc78";
const COLLECTION_ID = "motivation555";

export const MotivationContext = createContext();

export function MotivationProvider({ children }) {
    const [motivations, setMotivations] = useState([]);
    const { user } = useUser();

    async function fetchMotivations() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID
            )

            setMotivations(response.documents);
            console.log(response.documents)
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchMotivationById(id) {
        try {
            const response = await databases.getDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                id
            );

            return response;

        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    async function createMotivation(data) {
        try {
            if (!user) {
                throw new Error("User must be logged in to create motivation entries.");
            }

            const newMotivation = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                data,
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            );

            await fetchMotivations();
            return newMotivation;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async function deleteMotivation(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                id
            );
            setMotivations((prev) => prev.filter((item) => item.$id !== id));
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    useEffect(() => {
        let unsubscribe;
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`

        if (user) {
            fetchMotivations();
            unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response;

                if (events[0].includes("create")) {
                    setMotivations((prevMotivations) => [...prevMotivations, payload]);
                }
            })
        } else {
            setMotivations([]);
        }

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [user]);

    return (
        <MotivationContext.Provider
            value={{ motivations, fetchMotivations, fetchMotivationById, createMotivation, deleteMotivation }}
        >
            {children}
        </MotivationContext.Provider>
    );
}