import { useContext } from "react";
import { UpdatesContext } from "../context/UpdatesContext";


export function useUpdates() {
    const context = useContext(UpdatesContext);

    if (!context) {
        throw new Error("useUser must be used within an UpdateProvider");
    }
    return context
}