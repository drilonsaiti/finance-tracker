import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {addIncome, addOutcome} from "../services/apiFinance.js";


export function useCreateOutcome() {
    const queryClient = useQueryClient();

    const {mutate: createOutcome, isPending: isCreating} = useMutation({
        mutationFn: addOutcome,
        onSuccess: () => {
            toast.success("New outcome successfully created");
            queryClient.invalidateQueries({
                queryKey: ['outcome'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createOutcome}
}
