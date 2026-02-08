import { createContext, useState } from 'react'
import { databases } from '../lib/appwrite'

const DATABASE_ID = "69809ca3000d5cd3cc78"
const COLLECTION_ID = "updates555"

export const UpdatesContext = createContext()

export function UpdatesProvider({ children }) {
    const [updates, setUpdates] = useState([])

    async function fetchUpdates() {
        try {

        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchUpdateById(id) {
        try {

        } catch (error) {
            console.error(error.message)
        }
    }
}

async function createUpdate(data) {
    try {

    } catch (error) {
        console.error(error.message)
    }


    async function deleteUpdate(id) {
        try {

        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <UpdatesContext.Provider
            value={{ updates, fetchUpdates, fetchUpdateById, createUpdate, deleteUpdate }}
        >
            {children}
        </UpdatesContext.Provider>
    )
}


