import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {updateIncome, updateOutcome} from "../services/apiFinance.js";

export function useEditOutcome() {
    const queryClient = useQueryClient();

    const { mutate: editOutcome, isLoading: isEditing } = useMutation({
        mutationFn: ({ newOutcome, uuid }) => updateOutcome(newOutcome, uuid),
        onSuccess: () => {
            toast.success("Outcome successfully edited");
            queryClient.invalidateQueries({ queryKey: ["outcomes"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editOutcome };
}