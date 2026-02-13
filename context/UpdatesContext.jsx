import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Query } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "69809ca3000d5cd3cc78";
const COLLECTION_ID = "updates555";

export const UpdatesContext = createContext();

export function UpdatesProvider({ children }) {
  const [updates, setUpdates] = useState([]);
  const { user } = useUser();

  async function fetchUpdates() {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );
    setUpdates(response.documents);
  }

  async function fetchUpdateById(id) {
    return await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id
    );
  }

  async function createUpdate(data) {
    if (!user) throw new Error("Not authenticated");
    if (user.team !== "Staff") throw new Error("Only staff members can create updates");

    const newUpdate = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        Title: data.Title,
        Author: data.Author,
        Content: data.Content,
        Date: data.Date,
        UserId: user.$id,
      }
    );

    // Real-time subscription will handle adding to state
    return newUpdate;
  }

  async function deleteUpdate(id) {
    if (!user) throw new Error("Not authenticated");
    if (user.team !== "Staff") throw new Error("Only staff members can delete updates");

    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id
    );

    // Real-time subscription will handle removing from state
  }

  useEffect(() => {
    if (!user) {
      setUpdates([]);
      return;
    }

    fetchUpdates();

    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    const unsubscribe = client.subscribe(channel, (response) => {
      const { payload, events } = response;

      if (events.some((e) => e.includes(".create"))) {
        setUpdates((prev) =>
          prev.some((u) => u.$id === payload.$id)
            ? prev
            : [payload, ...prev]
        );
      }

      if (events.some((e) => e.includes(".delete"))) {
        setUpdates((prev) =>
          prev.filter((u) => u.$id !== payload.$id)
        );
      }

      if (events.some((e) => e.includes(".update"))) {
        setUpdates((prev) =>
          prev.map((u) => (u.$id === payload.$id ? payload : u))
        );
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <UpdatesContext.Provider
      value={{
        updates,
        fetchUpdates,
        fetchUpdateById,
        createUpdate,
        deleteUpdate,
        isStaff: user?.team === "Staff",
      }}
    >
      {children}
    </UpdatesContext.Provider>
  );
}