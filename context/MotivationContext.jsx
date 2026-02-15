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

    function calculateDailySummary() {
        if (!motivations || motivations.length === 0) {
            return {
                totalEntries: 0,
                averageScore: 0,
                dailySummaries: []
            };
        }

        // Group by date and calculate averages
        const dateGroups = {};
        
        motivations.forEach(entry => {
            const date = entry.Date;
            if (!dateGroups[date]) {
                dateGroups[date] = {
                    date,
                    scores: [],
                    count: 0
                };
            }
            dateGroups[date].scores.push(entry.Motivation);
            dateGroups[date].count++;
        });

        // Calculate averages for each date
        const dailySummaries = Object.values(dateGroups).map(group => ({
            date: group.date,
            averageScore: (group.scores.reduce((a, b) => a + b, 0) / group.count).toFixed(2),
            count: group.count
        })).sort((a, b) => {
            // Sort by date (most recent first)
            const [dayA, monthA, yearA] = a.date.split('/');
            const [dayB, monthB, yearB] = b.date.split('/');
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);
            return dateB - dateA;
        });

        // Calculate overall average
        const allScores = motivations.map(m => m.Motivation);
        const averageScore = (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2);

        return {
            totalEntries: motivations.length,
            averageScore,
            dailySummaries
        };
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
            value={{ motivations, fetchMotivations, fetchMotivationById, createMotivation, deleteMotivation, calculateDailySummary, isStaff: user?.team === "Staff" }}
        >
            {children}
        </MotivationContext.Provider>
    );
}