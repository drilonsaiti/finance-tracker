import { useQuery } from "@tanstack/react-query";
import {getAllIncome, getAllOutcome} from "../services/apiFinance.js";

export function useOutcomes() {
    const {
        isLoading,
        data: outcomes,
        error,
    } = useQuery({
        queryKey: ["outcomes"],
        queryFn: getAllOutcome,
    });

    return { isLoading, error, outcomes };
}
