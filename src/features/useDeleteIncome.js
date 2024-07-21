import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {deleteIncome} from "../services/apiFinance.js";

export function useDeleteIncome() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteIncomes } = useMutation({
        mutationFn: deleteIncome,
        onSuccess: () => {
            toast.success("Income successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["incomes"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteIncomes };
}
