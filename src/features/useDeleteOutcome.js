import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {deleteIncome, deleteOutcome} from "../services/apiFinance.js";

export function useDeleteOutcome() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteOutcomes } = useMutation({
        mutationFn: deleteOutcome,
        onSuccess: () => {
            toast.success("Outcome successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["outcomes"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteOutcomes };
}
