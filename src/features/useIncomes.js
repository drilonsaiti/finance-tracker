import { useQuery } from "@tanstack/react-query";
import {getAllIncome} from "../services/apiFinance.js";

export function useIncomes() {
    const {
        isLoading,
        data: incomes,
        error,
    } = useQuery({
        queryKey: ["incomes"],
        queryFn: getAllIncome,
    });

    return { isLoading, error, incomes };
}
