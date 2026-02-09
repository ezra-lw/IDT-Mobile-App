import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "69809ca3000d5cd3cc78";
const COLLECTION_ID = "feedback555";

export const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const { user } = useUser();

    async function fetchFeedbacks() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID
            )

            setFeedbacks(response.documents);
            console.log(response.documents)
        } catch (error) {
            console.error(error.message);
        }
    }

    async function fetchFeedbackById(id) {
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

    async function createFeedback(data) {
        try {
            if (!user) {
                throw new Error("User must be logged in to create feedback entries.");
            }

            console.log('Creating feedback document:', data)
            const newFeedback = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                data
            );
            console.log('Feedback document created successfully:', newFeedback.$id)

            await fetchFeedbacks();
            return newFeedback;
        } catch (error) {
            console.error('Error in createFeedback:', error);
            throw error;
        }
    }

    async function deleteFeedback(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID, 
                COLLECTION_ID, 
                id
            );
            setFeedbacks((prev) => prev.filter((item) => item.$id !== id));
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    useEffect(() => {
        // Feedback doesn't need to fetch on mount - only used for submission
        // No automatic fetching to avoid authorization errors
    }, [user]);

    return (
        <FeedbackContext.Provider
            value={{ feedbacks, fetchFeedbacks, fetchFeedbackById, createFeedback, deleteFeedback }}
        >
            {children}
        </FeedbackContext.Provider>
    );
}