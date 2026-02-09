import { useContext } from "react";
import { MotivationContext } from "../context/MotivationContext";


export function useMotivation() {
    const context = useContext(MotivationContext);

    if (!context) {
        throw new Error("useMotivation must be used within a MotivationProvider");
    }
    return context
}
