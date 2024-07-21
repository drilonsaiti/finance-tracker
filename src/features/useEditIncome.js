import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {updateIncome} from "../services/apiFinance.js";

export function useEditIncome() {
    const queryClient = useQueryClient();

    const { mutate: editIncome, isLoading: isEditing } = useMutation({
        mutationFn: ({ newIncome, uuid }) => updateIncome(newIncome, uuid),
        onSuccess: () => {
            toast.success("Income successfully edited");
            queryClient.invalidateQueries({ queryKey: ["incomes"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editIncome };
}